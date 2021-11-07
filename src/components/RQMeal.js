import React from "react";
import { useParams } from "react-router-dom";
import { useMealData } from "../hooks/useMealData";

export const RQMealPage = () => {
  const { mealId } = useParams();
  const { isLoading, data, isError, error } = useMealData(mealId);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }
  return (
    <div>
      {data.data.name} - {data.data.menu}
    </div>
  );
};
