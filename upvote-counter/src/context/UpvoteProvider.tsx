import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  import { UpvoteList } from "../types/upvote";
  import { loadLists, saveLists } from "../utils/storage";
  
  export interface UpvoteContextValue {
    lists: UpvoteList[];
    toggleList: (id: string) => void;
    addUpvote: (id: string) => void;
  }
  
  export const UpvoteContext = createContext<UpvoteContextValue | undefined>(
    undefined
  );
  
  interface UpvoteProviderProps {
    children: ReactNode;
  }
  
  // default lists if nothing is in localStorage yet
  const DEFAULT_LISTS: UpvoteList[] = [
    { id: "list-1", label: "List 1", count: 3, selected: false },
    { id: "list-2", label: "List 2", count: 4, selected: true },
    { id: "list-3", label: "List 3", count: 2, selected: false },
  ];
  
  // manages all the upvote lists state
  // saves to localStorage automatically
  export const UpvoteProvider: React.FC<UpvoteProviderProps> = ({ children }) => {
    // try to load from localStorage, otherwise use defaults
    const [lists, setLists] = useState<UpvoteList[]>(() => {
      const stored = loadLists();
      return stored ?? DEFAULT_LISTS;
    });
  
    // auto-save whenever lists change
    useEffect(() => {
      saveLists(lists);
    }, [lists]);
  
    // toggles the selected state for a list
    // clicking any upvote in a list toggles all of them
    const toggleList = (id: string) => {
      setLists((prev) =>
        prev.map((list) =>
          list.id === id ? {...list, selected: !list.selected,} : list));
    };
  
    // adds another upvote to a list
    const addUpvote = (id: string) => {
      setLists((prev) =>
        prev.map((list) =>
          list.id === id
            ? {...list, count: list.count + 1,} : list));
    };
  
    const value = {lists, toggleList, addUpvote,
};
  
    return (
      <UpvoteContext.Provider value={value}>{children}</UpvoteContext.Provider>
    );
  };