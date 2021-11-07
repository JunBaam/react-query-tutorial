import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import { HomePage } from "./components/Home.page";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { MealPage } from "./components/Meal.page";
import { RQMealPage } from "./components/RQMeal";
import { RQMealsPage } from "./components/RQMeals.page";
import { ParallelQueriesPage } from "./components/ParallelQueries.page";
import { DynamicParallelPage } from "./components/DynamicParallel.page";
import { DependentQueriesPage } from "./components/DependentQueries.page";
import { PaginatedQueriesPage } from "./components/PaginatedQueries.page";
import { InfiniteQueriesPage } from "./components/InfiniteQueries.page";

const queryClient = new QueryClient();

console.log("QueryClient", queryClient);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/meals"> Origin method </Link>
              </li>
              <li>
                <Link to="/rq-meals">React-query method</Link>
              </li>
              <li>
                <Link to="/rq-dependent">React-query dependent</Link>
              </li>
              <li>
                <Link to="/rq-paginated">React-query paginated</Link>
              </li>
              <li>
                <Link to="/rq-infinite">React-query infitiy</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/rq-infinite">
              <InfiniteQueriesPage />
            </Route>
            <Route path="/rq-paginated">
              <PaginatedQueriesPage />
            </Route>
            <Route path="/rq-dependent">
              <DependentQueriesPage email="lunch@example.com" />
            </Route>
            <Route path="/rq-dynamic-parallel">
              <DynamicParallelPage mealIds={[1, 3]} />
            </Route>
            <Route path="/rq-parallel">
              <ParallelQueriesPage />
            </Route>
            <Route path="/rq-meals/:mealId">
              <RQMealPage />
            </Route>
            <Route path="/rq-meals">
              <RQMealsPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
            <Route path="/meals">
              <MealPage />
            </Route>
          </Switch>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
    </QueryClientProvider>
  );
}

export default App;
