import React from "react";
import { UpvoteProvider } from "./context/UpvoteProvider";
import PageLayout from "./components/Layout/PageLayout";

// root component, wraps everything in the provider
const App: React.FC = () => {
  return (
    <UpvoteProvider>
      <PageLayout />
    </UpvoteProvider>
  );
};

export default App;
