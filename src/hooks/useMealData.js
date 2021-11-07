import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const fetchMealData = ({ queryKey }) => {
  const mealId = queryKey[1];
  return axios.get(`http://localhost:4000/meals/${mealId}`);
};

export const useMealData = (mealId) => {
  const queryClient = useQueryClient();
  // return useQuery(["meal", mealId], fetchMealData);

  //NOTE: 사용자 경험을 위해 백그라운드에서 데이터 페칭을 한다 (초기에 가져올데이터를 설정 initial Data)
  return useQuery(["meal", mealId], fetchMealData, {
    initialData: () => {
      const meal = queryClient
        .getQueryData("meals")
        ?.data?.find((meal) => meal.id === parseInt(mealId));
      if (meal) {
        return { data: meal };
      } else {
        return undefined;
      }
    },
  });
};
