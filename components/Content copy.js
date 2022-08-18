import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { daiAbi, daiContractAddress } from "../constants"
import { ethers } from "ethers"
import { Button, Typography } from "web3uikit"
import {Moralis} from "moralis"



export default function Content() {
    const { account, isWeb3Enabled } = useMoralis()
    const { runContractFunction } = useWeb3Contract()
    const [daiTotalSupply, setDaiTotalSupply] = useState(0)
    const [userDaiBalance, setUserDaiBalance] = useState(0)
    const [user2DaiBalance, setUser2DaiBalance] = useState(0)
    const [_account, set_account] = useState(0)

    useEffect(() => {
        if (isWeb3Enabled && account) {
          updateUI();
        }
      }, [
        account,
        isWeb3Enabled,
        daiTotalSupply,
        userDaiBalance,
        user2DaiBalance
      ]);

    async function updateUI() {
        updateDaiTotalSupply()
        updateUserDaiBalance()
        updateUser2DaiBalance("0x73c94f5735Ea62447ee51cF69eEc02cc19497be3")
      } 

    async function updateDaiTotalSupply() {
        const _totalSupply = (
            await getTotalSupply({ onError: (error) => console.log(error) })
        )
        setDaiTotalSupply(_totalSupply.toString())
    }
    async function updateUserDaiBalance() {
        const _balanceOf = (
            await getUserDaiBalance({ onError: (error) => console.log(error) })
        )
        setUserDaiBalance(ethers.utils.formatEther(_balanceOf))
    }

    async function updateUser2DaiBalance(_account) {

        const sendOptions = {
            contractAddress: daiContractAddress,
            functionName: "balanceOf",
            abi: daiAbi,
            params: {
            account: _account,
             },
          };

          setUser2DaiBalance(ethers.utils.formatEther(await Moralis.executeFunction(sendOptions)));
    }

    const { runContractFunction: getTotalSupply } = useWeb3Contract({
        abi: daiAbi,
        contractAddress: daiContractAddress,
        functionName: "totalSupply",
        params: {},
    })

    const { runContractFunction: getUserDaiBalance } = useWeb3Contract({
        abi: daiAbi,
        contractAddress: daiContractAddress,
        functionName: "balanceOf",
        params: {
            account: account,
        },
    })   

    return (
        <div>
            <Typography variant="h3"> Total Supply: </Typography>
            <h4 variant="h4">${daiTotalSupply}</h4>
            <hr></hr>          
            <Button id="test-button-primary"
                onClick={updateDaiTotalSupply}
                text="Refresh"
                theme="primary"
                type="button"></Button>
            <h5>  DAI Balance User Connected: ${userDaiBalance}</h5>
            <h5>  Other DAI Balance: ${user2DaiBalance}</h5>

        </div>
    )
}