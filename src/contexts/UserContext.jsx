import { useEffect, createContext, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const storedWatchList = localStorage.getItem("watchList");
  const initialWatchList = storedWatchList ? JSON.parse(storedWatchList) : [];
  const [watchList, setWatchList] = useState(initialWatchList);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  function addToWatchList(movie) {
    const isAddedToList = watchList.map((i) => i.id).includes(movie.id);
    if (!isAddedToList) {
      setWatchList((movies) => [...movies, movie]);
    }
  }

  function removeFromWatchList(movie) {
    setWatchList((movies) => movies.filter((i) => i.id !== movie.id));
  }
  return (
    <UserContext.Provider
      value={{ watchList, addToWatchList, removeFromWatchList }}
    >
      {children}
    </UserContext.Provider>
  );
}
