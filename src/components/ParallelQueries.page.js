import { useQuery } from "react-query";
import axios from "axios";

const fetchMeals = () => {
  return axios.get("http://localhost:4000/meals");
};

const fetchLanguages = () => {
  return axios.get("http://localhost:4000/languages");
};

export const ParallelQueriesPage = () => {
  const { data: meals } = useQuery("meals", fetchMeals);
  const { data: languages } = useQuery("languages", fetchLanguages);

  return <div>ParallelQueriesPage</div>;
};
