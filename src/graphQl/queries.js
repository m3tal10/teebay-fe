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

const GET_MY_PRODUCTS = gql`
  query Query {
    myProducts {
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

const GET_PRODUCT = gql`
  query Product($productId: ID!) {
    product(id: $productId) {
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

export { GET_ALL_PRODUCTS, GET_MY_PRODUCTS, GET_PRODUCT };
