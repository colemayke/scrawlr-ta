import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Upvote from "../components/Upvote/Upvote";

describe("Upvote component", () => {
  it("toggles selection state when clicked", () => {
    // wrap upvote in a small stateful test component
    const Wrapper = () => {
      const [selected, setSelected] = React.useState(false);
      return (
        <Upvote
          selected={selected}
          onUpvote={() => setSelected((prev) => !prev)}
        />
      );
    };

    render(<Wrapper />);

    const button = screen.getByRole("button");

    // initial state should be false
    expect(button).toHaveAttribute("aria-pressed", "false");

    // click should toggle to true
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "true");

    // click again should toggle back to false
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-pressed", "false");
  });
});
