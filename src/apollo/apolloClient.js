import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Define HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
});

// Create an auth link to attach token
const authLink = setContext((_, { headers }) => {
  // Get token from localStorage
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
