import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const fetchMeals = () => {
  return axios.get("http://localhost:4000/meals");
};

const addMeal = (meal) => {
  return axios.post("http://localhost:4000/meals", meal);
};

export const useMealsData = (onSuccess, onError) => {
  return useQuery("meals", fetchMeals, {
    // cacheTime: 5000,  //NOTE: defulat 5분
    //NOTE: 이시간동안은 새로운 데이터를 페칭하지 않는다. 데이터의 신선도 싱싱함의 시간을 작성
    // staleTime: 0,
    //NOTE: mount될때 api 재요청 유무
    // refetchOnMount: true,
    //NOTE: 디폴트는 true
    // refetchOnWindowFocus: "always",
    //NOTE: 디폴트는 false 자동적으로 리패칭
    // refetchInterval: 2000,
    //NOTE: 브라우저가 포커싱안되도 백그라운드에서 데이터를 패칭
    // refetchIntervalInBackground: true,
    //NOTE: 비활성화
    // enabled: false,
    //NOTE: 성공 / 에러 시 해당하는 함수들을 실행(callback)
    onSuccess: onSuccess,
    onError: onError,
    // NOTE: 가져올 데이터를 선택 & 데이터를 변형해서 가져올수도있음s
    // select: (data) => {
    //   const superMealsNames = data.data.map((value) => value.name);
    //   return superMealsNames;
    // },
  });
};

export const useAddMealData = () => {
  const queryClient = useQueryClient();
  return useMutation(addMeal, {
    /** Handling Mutation Response */
    // onSuccess: (data) => {
    //   // NOTE: invalidation  stale 쿼리를 폐기
    //   //NOTE: 성공시 ui에 바로반영, 바로 데이터를 새로가져옴(re-fetch)
    //   // queryClient.invalidateQueries("meals");
    //   //NOTE: 기존 오래된 데이터에 새로추가된 데이터를 바로 추가해서 반영 (re-fetch 없이)
    //   queryClient.setQueryData("meals", (oldQueryData) => {
    //     return {
    //       ...oldQueryData,
    //       data: [...oldQueryData.data, data.data],
    //     };
    //   });
    // },
    /**Optimistic Update  */
    // NOTE: 낙관적인 업데이트 : 서버업데이트시 , Ui에서도 어짜피 업데이트 할것이란 가정으로부터 시작한다
    // NOTE: 미리 Ui를 업데이트 시켜주고 서버를 통해 검증을 받고 다시 업데이트 or 롤백 하는방식
    onMutate: async (newMeal) => {
      await queryClient.cancelQueries("meals");
      const previousMealData = queryClient.getQueryData("meals");
      queryClient.setQueryData("meals", (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            { id: oldQueryData?.data?.length + 1, ...newMeal },
          ],
        };
      });
      return { previousMealData };
    },
    //NOTE: 에러시 이전데이터로 복구
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData("meals", context.previousMealData);
    },
    //NOTE: 강제 리프레쉬
    onSettled: () => {
      queryClient.invalidateQueries("meals");
    },
  });
};
