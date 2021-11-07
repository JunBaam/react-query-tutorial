import { useState, useEffect } from "react";
import axios from "axios";

export const MealPage = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/meals")
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Error</h2>;
  }

  return (
    <>
      <h2>밥목록 </h2>
      {data.map((meals) => {
        return <div>{meals.name}</div>;
      })}
    </>
  );
};
