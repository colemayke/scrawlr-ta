import React from "react";
import "./Upvote.css";

import arrowup from "../../assets/arrowup.svg";

export interface UpvoteProps {
    selected: boolean;
    onUpvote: () => void;
}

// basic upvote button, renders the arrow
// selected prop controls the color state
const Upvote: React.FC<UpvoteProps> = ({ selected, onUpvote }) => {
    return (
        <button
            type="button"
            className={`upvote-button ${selected ? "upvote-button-selected" : ""}`}
            onClick={onUpvote}
            aria-pressed={selected}
        >
            <img 
                src={arrowup} 
                alt="upvote arrow" 
                className={`upvote-icon ${selected ? "upvote-icon-selected" : ""}`}
            />
        </button>
    );
};

export default Upvote;