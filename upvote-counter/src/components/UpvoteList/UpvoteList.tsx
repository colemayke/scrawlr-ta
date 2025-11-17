import React from "react";
import "./UpvoteList.css";
import Upvote from "../Upvote/Upvote";
import plusIcon from "../../assets/plus.svg";

export interface UpvoteListProps {
  id: string;
  label: string;
  count: number;
  selected: boolean;
  onUpvote: () => void;
  onAdd: () => void;
}

// renders a list of upvotes with an add button
// all upvotes in here share the same selected state
const UpvoteList: React.FC<UpvoteListProps> = ({
  id,
  label,
  count,
  selected,
  onUpvote,
  onAdd,
}) => {
  return (
    <div className="upvote-list" data-list-id={id}>
      <div className="upvote-list-header">
        <span className="upvote-list-title">{label}</span>
      </div>

      <div className="upvote-list-items">
        {/* render upvotes based on count */}
        {Array.from({ length: count }).map((_, index) => (
          <Upvote key={index} selected={selected} onUpvote={onUpvote} />
        ))}

        {/* add button to append new upvote to this list */}
        <button
          type="button"
          className="upvote-list-add"
          onClick={onAdd}
          aria-label={`Add upvote to ${label}`}
        >
          <img src={plusIcon} alt="Add" className="upvote-list-add-icon" />
        </button>
      </div>
    </div>
  );
};

export default UpvoteList;
