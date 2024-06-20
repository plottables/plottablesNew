import { mainnetContractConfig, testnetContractConfig } from "./contractConfig";

export const EXPECTED_CHAIN_ID = Number(process.env.REACT_APP_EXPECTED_CHAIN_ID)
export const GRAPHQL_URL = process.env.REACT_APP_GRAPHQL_URL
export const WALLET_CONNECT_PROJECT_ID = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID || ""
export const INFURA_KEY = process.env.REACT_APP_INFURA_KEY || ""
export const PROJECTS_PER_PAGE = 8
export const TOKENS_PER_PAGE = 8
export const MULTIPLY_GAS_LIMIT = 1.1
export const CONTRACT_INFO = EXPECTED_CHAIN_ID === 1 ? mainnetContractConfig : testnetContractConfig
export const MERKLE_PROOF_API_URL = process.env.REACT_APP_MERKLE_PROOF_API_URL || ""
export const HOLDER_PROOF_API_URL = process.env.REACT_APP_HOLDER_PROOF_API_URL || ""
export const FEATURED_PROJECT_ID = process.env.REACT_APP_FEATURED_PROJECT_ID || ""

export const CALENDAR: {
  [contractAddress: string]: {
    [projectId: number]: string;
  };
} = {
  "0xac521ea7a83a3bc3f9f1e09f8300a6301743fb1f": {
    0: "3/6/2024 10:00:00 AM EST",
    1: "6/25/2024 1:00:00 PM EDT"
  },
  "0xa319c382a702682129fcbf55d514e61a16f97f9c": {
    0: "12/10/2021 2:00:00 PM EST",
    1: "12/10/2021 2:00:00 PM EST",
    2: "1/24/2022 12:00:00 PM EST",
    3: "2/3/2022 1:00:00 PM EST",
    4: "2/9/2022 3:00:00 PM EST",
    5: "2/16/2022 2:00:00 PM EST",
    6: "2/23/2022 12:00:00 PM EST",
    7: "3/9/2022 1:00:00 PM EST",
    8: "3/2/2022 2:00:00 PM EST",
    9: "3/30/2022 3:00:00 PM EDT",
    10: "5/5/2022 5:00:00 PM EDT",
    11: "5/25/2022 2:00:00 PM EDT",
    12: "6/10/2022 4:00:00 PM EDT",
    13: "12/10/2022 2:00:00 PM EST",
    14: "12/7/2022 2:00:00 PM EST",
    15: "1/30/2023 3:00:00 PM EST",
    16: "2/22/2023 12:00:00 PM EST",
    17: "4/3/2023 1:00:00 PM EDT",
    18: "3/16/2023 2:00:00 PM EDT",
    19: "3/23/2023 1:00:00 PM EDT",
    20: "5/5/2023 12:00:00 PM EDT",
    21: "6/2/2023 1:00:00 PM EDT",
    22: "6/27/2023 3:00:00 PM EDT",
    24: "10/13/2023 3:00:00 PM EDT",
    25: "12/10/2023 1:00:00 PM EDT",
    26: "3/28/2024 2:00:00 PM EDT",
  },
  "0x18de6097ce5b5b2724c9cae6ac519917f3f178c0": {
    0: "6/27/2023 3:00:00 PM EDT"
  }
}

export const ARTFORA_CONFIG: {
  collection_base_url: string;
  token_base_url: string;
  projects: {
    [projectId: string]: string;
  };
} = {
  collection_base_url: "https://www.artfora.com/collections",
  token_base_url: "https://www.artfora.com/assets",
  projects: {
    "0xa319c382a702682129fcbf55d514e61a16f97f9c-22": "stroomlijn"
  }
}
