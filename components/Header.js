import { ConnectButton, Typography, Button } from "web3uikit"
import { daiAbi, daiContractAddress, betContractAbi, astonVillaVsEvertonContractAddress } from "../constants"
import { Moralis } from "moralis"
import { useState, useEffect } from "react"





export default function Header() {

    const [wasAdded, setWasAdded] = useState(false)

    return (
        <div>

            <nav >
                <div style={{
                    alignItems: 'center',
                    color: 'black',
                    display: 'flex',
                    height: '75px',
                    justifyContent: 'center',
                    width: '100%'
                }}>

                    <Typography
                        color="#313880"
                        onCopy={function noRefCheck() { }}
                        variant="h1"
                    >
                        The Crypto Betting Site v0.0.1
                    </Typography>

                    <ConnectButton /></div>
            </nav>
            <nav style={{
                alignItems: 'center',
                color: 'black',
                display: 'flex',
                height: '75px',
                justifyContent: 'center',
                width: '100%'
            }}>

                <Button
                    onClick={async function faucet() {
                        const sendOptions = {
                            contractAddress: daiContractAddress,
                            functionName: "faucet",
                            abi: daiAbi,
                            params: {
                                amount: 100000000000000000000n
                            }
                        }
                        await Moralis.executeFunction(sendOptions);
                    }}
                    text="Get 100 fake DAI"
                    theme="secondary"
                />

                {/* <Button
                    onClick={async function addKovan() {

                        const chainId = 52;
                        const chainName = "Kovan";
                        const currencyName = "ETH";
                        const currencySymbol = "ETH";
                        const rpcUrl = "http://kovan.poa.network:8545";
                        const blockExplorerUrl = "https://kovan.etherscan.io/";
                        await Moralis.addNetwork(
                            chainId,
                            chainName,
                            currencyName,
                            currencySymbol,
                            rpcUrl,
                            blockExplorerUrl
                        );
                    }}
                    text="Switch to Kovan Network"
                    theme="secondary"
                /> */}

            <Button
                    onClick={async function addTokenToWallet() {
                        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
                            if(wasAdded == false) { 
                            setWasAdded(await ethereum.request({
                                method: 'wallet_watchAsset',
                                params: {
                                    type: 'ERC20', // Initially only supports ERC20, but eventually more!
                                    options: {
                                        address: "0x29282139fD1A88ccAED6d3bb7f547192144C0f95", // The address that the token is at.
                                        symbol: "DAI", // A ticker symbol or shorthand, up to 5 chars.
                                        decimals: 18, // The number of decimals in the token
                                    },
                            }}));
                    
                        }}}
                    text="Add token"
                    theme="secondary"
                />
                            </nav>


        </div>
    )
}


