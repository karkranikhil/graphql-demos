import React from "react";
import ApolloClient from "apollo-boost";
import Cars from "./Cars";
import CarsTwo from "./CarsTwo";
import {ApolloProvider} from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:5000"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Cars />
      <CarsTwo/>
    </ApolloProvider>
  );
}

export default App;
