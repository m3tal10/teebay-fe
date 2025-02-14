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

export { SIGN_IN, SIGN_UP };
