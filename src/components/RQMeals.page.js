// NOTE: 리액트 쿼리 자체에서 에러를 한번만 체크하는게아니고 일정 텀을두고  계속 재요청한다.
// NOTE: query-cache 를 통해 네비게이션바를 바꿔도 loading이 보이지 않는다. ui가 바뀌지 않는다면..

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAddMealData, useMealsData } from "../hooks/useMealsData";

export const RQMealsPage = () => {
  const [name, setName] = useState("");
  const [menu, setMenu] = useState("");

  const onSuccess = (data) => {
    console.log("데이터 사이드이펙트 성공 ");
    console.log("data", data);
  };

  const onError = (error) => {
    console.log("데이터 사이드이펙트 실패 ");
    console.log("error", error);
  };

  //NOTE: useQueryHooks
  // 1. key값
  // 2. 데이터를 가져오는 함수
  // 3. useQuery 옵션
  const { isLoading, data, isError, error, isFetching, refetch } = useMealsData(
    onSuccess,
    onError
  );

  console.log({
    isLoading,
    isFetching,
  });

  //NOTE: Mutations CUD 에 사용된다.

  const {
    mutate: addMeal,
    isLoading: addMealIsLoading,
    isError: addMealIsError,
    error: addMealError,
  } = useAddMealData();

  const handleAddHeroClick = () => {
    const meal = { name, menu };
    addMeal(meal);
  };

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error}</h2>;
  }

  console.log("isLoadig", isLoading);
  console.log("isEroor", isError);
  console.log("error", error);

  return (
    <>
      <h2>React Query meals Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={menu}
          onChange={(e) => setMenu(e.target.value)}
        />
        <button onClick={handleAddHeroClick}>밥추가</button>
      </div>

      <button onClick={refetch}>fetch meals</button>
      {data?.data.map((value) => {
        return (
          <div key={value.id}>
            <Link to={`rq-meals/${value.id}`}>{value.name}</Link>
          </div>
        );
      })}
      {/* {data.map((value) => {
        return <div key={value}>{value}</div>;
      })} */}
    </>
  );
};
