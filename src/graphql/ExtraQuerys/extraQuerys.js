import { gql } from "apollo-server-core";
import { countryList } from "../../helpers/allCountries.js";
import { playerPositions } from "../../helpers/playerPositions.js";

export const extraQuerysSchema = gql`
  type Query {
    getCountryList: [String!]!
    getPlayerPositions: [String!]!
  }
`;

export const extraQuerysResolvers = {
  Query: {
    getCountryList: () => countryList,
    getPlayerPositions: () => playerPositions,
  },
};
