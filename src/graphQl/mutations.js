import { gql } from "@apollo/client";
const SIGN_IN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const SIGN_UP = gql`
  mutation Signup(
    $firstName: String!
    $lastName: String!
    $address: String
    $email: String!
    $phone: String
    $password: String!
  ) {
    signup(
      firstName: $firstName
      lastName: $lastName
      address: $address
      email: $email
      phone: $phone
      password: $password
    ) {
      token
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $title: String!
    $categories: [ProductCategory!]!
    $description: String!
    $buyPrice: Float!
    $rentPrice: Float!
    $rentOption: RentOption!
  ) {
    createProduct(
      title: $title
      categories: $categories
      description: $description
      buyPrice: $buyPrice
      rentPrice: $rentPrice
      rentOption: $rentOption
    ) {
      id
      title
      categories
      description
      buyPrice
      rentPrice
      rentOption
      createdAt
    }
  }
`;

const UPDATE_PRODUCT = gql`
  mutation UpdateProduct(
    $id: ID!
    $title: String
    $categories: [ProductCategory!]
    $description: String
    $buyPrice: Float
    $rentPrice: Float
    $rentOption: RentOption
  ) {
    updateProduct(
      id: $id
      title: $title
      categories: $categories
      description: $description
      buyPrice: $buyPrice
      rentPrice: $rentPrice
      rentOption: $rentOption
    ) {
      id
      title
      description
      buyPrice
      rentPrice
      rentOption
    }
  }
`;

export { SIGN_IN, SIGN_UP, CREATE_PRODUCT, UPDATE_PRODUCT };
