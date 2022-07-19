import { gql } from "apollo-server-core";
import { countryList } from "../../helpers/allCountries.js";

export const extraQuerysSchema = gql`
  type Query {
    getCountryList: [String]!
  }
`;

export const extraQuerysResolvers = {
  Query: {
    getCountryList: () => countryList,
  },
};
