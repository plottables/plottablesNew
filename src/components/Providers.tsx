import CssBaseline from "@mui/material/CssBaseline"
import "@rainbow-me/rainbowkit/styles.css"
import { ThemeProvider } from "@mui/material/styles"
import theme from "theme"
import {RainbowKitProvider, getDefaultWallets, midnightTheme, connectorsForWallets} from "@rainbow-me/rainbowkit"
import {configureChains, createClient, WagmiConfig} from "wagmi"
import { mainnet, sepolia } from 'wagmi/chains'
import { infuraProvider } from "wagmi/providers/infura"
import { publicProvider } from "wagmi/providers/public"
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { GRAPHQL_URL, INFURA_KEY, EXPECTED_CHAIN_ID, WALLET_CONNECT_PROJECT_ID } from "config"
import { ledgerWallet } from "@rainbow-me/rainbowkit/wallets";

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache()
})

// Defaults to goerli testing network if mainnet is not set
const expectedChains = [EXPECTED_CHAIN_ID === 1 ? mainnet : sepolia]
const initialChain = EXPECTED_CHAIN_ID === 1 ? mainnet : sepolia

const { chains, provider, webSocketProvider } = configureChains(
  expectedChains,
  [
    infuraProvider({apiKey: INFURA_KEY, priority: 0}),
    publicProvider({priority: 1})
  ]
)

const { wallets } = getDefaultWallets({
  appName: "Engine",
  chains,
  projectId: WALLET_CONNECT_PROJECT_ID
})

const connectors = connectorsForWallets([
  ...wallets,
  { groupName: 'Popular', wallets: [ledgerWallet({ projectId: WALLET_CONNECT_PROJECT_ID, chains })] }
])

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider
})

interface Props {
  children: React.ReactNode
}

const AppProvider = ({children}:Props) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
         chains={chains}
         initialChain={initialChain}
         theme={
          midnightTheme({
            borderRadius: "medium"
          })
        }>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </ApolloProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default AppProvider
