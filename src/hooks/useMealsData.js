import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";

const fetchMeals = () => {
  return axios.get("http://localhost:4000/meals");
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
