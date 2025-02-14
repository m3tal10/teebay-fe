import { gql } from "@apollo/client";

const GET_ALL_PRODUCTS = gql`
  query Query {
    products {
      id
      title
      categories
      description
      buyPrice
      rentPrice
      status
      rentOption
      viewCount
      createdAt
      updatedAt
    }
  }
`;

export { GET_ALL_PRODUCTS };
