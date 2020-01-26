import React from "react";
import ApolloClient from "apollo-boost";
import Cars from "./Cars";
import CarsTwo from "./CarsTwo";
import CarsQuery from "./CarsQuery";
import CarsRefetch from "./CarsRefetch";
import CarsMutation from "./CarsMutation";
import CarsMutationComponent from "./CarsMutationComponent";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:5000"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Cars />
      <CarsTwo />
      <CarsQuery />
      <CarsRefetch />
      <CarsMutation />
      <CarsMutationComponent />
    </ApolloProvider>
  );
}

export default App;
