import { getContractConfigByAddress } from "utils/contractInfoHelper"
import {useCallback, useEffect, useState} from "react"
import {Box, Typography} from "@mui/material";
import {wait} from "@apollo/client/testing";
import Loading from "./Loading";

interface Props {
  contractAddress: string
  tokenId: string
  width: number
  height: number
  retryDelay?: number
}

const TokenImage = ({contractAddress, tokenId, width, height, retryDelay = 0}: Props) => {

  const contractConfig = getContractConfigByAddress(contractAddress)
  const [loading, setLoading] = useState(true)

  const fetchRetry = function(url: string, delay: number) {
    fetch(url).then((res: Response) => {
      if (res.status === 200) {
        setLoading(false)
      } else {
        if (delay >= 0) {
          (new Promise((resolve) => setTimeout(resolve, delay))).then(() => fetchRetry(url, delay))
        }
      }
    })
  }
  useEffect(() => { fetchRetry(`${contractConfig?.MEDIA_URL}/${tokenId}.png`, retryDelay) },[])

  if (loading) {
    return (
      <Box sx={{width: width, height: height, display: "flex", alignItems: "center", border: "solid 1px"}}>
        <Loading/>
      </Box>
    )
  }
  return <img
      src={`${contractConfig?.MEDIA_URL}/${tokenId}.png`}
      alt={tokenId}
      width={width}
      height={height}
      style={{boxShadow: "5px 5px 10px grey"}}
    />

}

export default TokenImage
