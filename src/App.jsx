import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import MovieDetails from "./pages/MovieDetails";
import SerieDetails from "./pages/SerieDetails";
import MainLayout from "./layouts/MainLayout";
import SearchResults from "./pages/SearchResults";
import UserWatchList from "./pages/UserWatchList";

import Register from "./pages/Register";
import Login from "./pages/Login";
import ActorDetails from "./components/ActorDetails";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "movies", element: <Movies /> },
      { path: "series", element: <Series /> },
      { path: "movies/:id", element: <MovieDetails /> },
      { path: "series/:id", element: <SerieDetails /> },
      { path: "actor/:id", element: <ActorDetails /> },
      { path: "search", element: <SearchResults /> },
      { path: "watchlist", element: <UserWatchList /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={routes} />;
}

export default App;
