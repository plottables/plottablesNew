import { ConnectButton } from "@rainbow-me/rainbowkit"
import Box from "@mui/material/Box"
import { Button, Link } from "@mui/material"

const Connect = () => {
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
                  <div style={{ display: 'flex', gap: 20 }}>
                    <Button onClick={openAccountModal} type="button" sx={{color: "blue"}}>
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}
                    </Button>
                    <Link href={`/user/${account.address}`} underline="hover" sx={{color: "blue"}}>
                      My NFTs
                    </Link>
                  </div>
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
