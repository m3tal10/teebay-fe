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

const GET_BOUGHT_PRODUCTS = gql`
  query Query {
    boughtProducts {
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

const GET_SOLD_PRODUCTS = gql`
  query Query {
    soldProducts {
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

const GET_BORROWED_PRODUCTS = gql`
  query GetBorrowedProducts {
    borrowedProducts {
      id
      product {
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
      startTime
      endTime
    }
  }
`;

const GET_LENT_PRODUCTS = gql`
  query GetLentProducts {
    lentProducts {
      id
      product {
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
      startTime
      endTime
    }
  }
`;

export {
  GET_LENT_PRODUCTS,
  GET_BORROWED_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_MY_PRODUCTS,
  GET_PRODUCT,
  GET_BOUGHT_PRODUCTS,
  GET_SOLD_PRODUCTS,
};
