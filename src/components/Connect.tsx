import { ConnectButton } from "@rainbow-me/rainbowkit"
import Box from "@mui/material/Box"
import { Button, Link } from "@mui/material"

interface Props {
  isMobile: boolean
}

const Connect = ({ isMobile = false }: Props) => {
  return (
    <Box>
      <ConnectButton.Custom>
        {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <Button onClick={openConnectModal} type="button" sx={{color: "blue"}}>
                      Connect Wallet
                    </Button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <Button onClick={openChainModal} type="button" sx={{color: "blue"}}>
                      Wrong network
                    </Button>
                  );
                }

                return (
                  <Box sx={{ display: "flex", gap: {mobile: "10px", tablet: "20px"}, flexDirection: {mobile: "column", tablet: "row"}, justifyContent: {mobile: "left", tablet: "right"} }}>
                    <Button onClick={openAccountModal} type="button" sx={{color: "blue", justifyContent: {mobile: "left", tablet: "center"}}}>
                      {account.displayName}
                      {account.displayBalance && !isMobile
                        ? ` (${account.displayBalance})`
                        : ''}
                    </Button>
                    <Link href={`/user/${account.address}`} underline="hover" sx={{color: "blue"}}>
                      My NFTs
                    </Link>
                  </Box>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </Box>
  )
}

export default Connect
