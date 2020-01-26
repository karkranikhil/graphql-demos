import React from "react";
import ApolloClient from "apollo-boost";
import Cars from "./Cars";
import Provider from "./Provider";

const client = new ApolloClient({
  uri: "http://localhost:5000"
});

function App() {
  return (
    <Provider client={client}>
      <Cars />
    </Provider>
  );
}

export default App;
