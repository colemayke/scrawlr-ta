import React from "react";
import "./PageLayout.css";
import { useUpvoteLists } from "../../hooks/useUpvoteLists";
import UpvoteList from "../UpvoteList/UpvoteList";

// main page, renders all the lists
const PageLayout: React.FC = () => {
  const { lists, toggleList, addUpvote } = useUpvoteLists();

  return (
    <main className="page-layout">
      <h1 className="page-title">Upvote Lists</h1>

      <div className="page-lists-grid">
        {lists.map((list) => (
          <UpvoteList
            key={list.id}
            id={list.id}
            label={list.label}
            count={list.count}
            selected={list.selected}
            onUpvote={() => toggleList(list.id)}
            onAdd={() => addUpvote(list.id)}
          />
        ))}
      </div>
    </main>
  );
};

export default PageLayout;
