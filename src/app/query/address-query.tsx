import { gql } from '@apollo/client';

export const VALIDATE_ADDRESS_QUERY = gql`
  query ValidateAddress($postcode: String!, $suburb: String!, $state: String!) {
    validateAddress(postcode: $postcode, suburb: $suburb, state: $state) {
      success
      data
    }
  }
`;