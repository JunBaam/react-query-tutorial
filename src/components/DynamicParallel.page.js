import { useQueries } from "react-query";
import axios from "axios";

const fetchMeals = (mealId) => {
  return axios.get(`http://localhost:4000/meals/${mealId}`);
};

export const DynamicParallelPage = ({ mealIds }) => {
  console.log("받아옴", mealIds);
  const queryResults = useQueries(
    mealIds.map((id) => {
      return {
        queryKey: ["meals", id],
        queryFn: () => fetchMeals(id),
      };
    })
  );

  console.log({ queryResults });
  return <div>Dynamic Parallel Queries</div>;
};
