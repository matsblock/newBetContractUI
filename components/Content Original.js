import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { daiAbi, daiContractAddress, betContractAbi, SevillaVSValladolidContractAddress } from "../constants"
import { ethers } from "ethers"
import { Button, Typography, Input, Form, Card, Modal, Radios, SendTransaction } from "web3uikit"
import { Moralis } from "moralis"
import Image from 'next/image'
import moment from 'moment'

export default function Content() {
    const { account, isWeb3Enabled } = useMoralis()
    const { runContractFunction } = useWeb3Contract()
    const [daiTotalSupply, setDaiTotalSupply] = useState(0)
    const [userDaiBalance, setUserDaiBalance] = useState(0)
    const [user2DaiBalance, setUser2DaiBalance] = useState(0)
    const [gameCreate, setGameCreate] = useState("")
    const [_account, set_account] = useState(0)
    const [amount, setAmount] = useState(0)
    const [option, setOption] = useState(0)
    const [matchStatus, setMatchStatus] = useState("")
    const [cardDescription, setCardDescription] = useState("")
    const [ifFinishedHideButtons, setIfFinishedHideButtons] = useState(false)
    const [homeOdd, setHomeOdd] = useState("")
    const [awayOdd, setAwayOdd] = useState("")
    const [tiedOdd, setTiedOdd] = useState("")
    const [matchDate, setMatchDate] = useState("")


 // matchList.map( async (match, index) => {
    //     console.log("match address", match)
    //     console.log(index)
    //     const sendOptions = {
    //         contractAddress: match,
    //         functionName: "getGameCreate",
    //         abi: betContractAbi,
    //         params: {
    //             _requestId: index,
    //             _idx: 1
    //         },
    //     };
    //     const _gameCreate = await Moralis.executeFunction(sendOptions)
    //     console.log(_gameCreate.gameId)

    //     return {
    //         // props: { matchs: matchData}
    //     }
    // })

    
    useEffect(() => {
        if (isWeb3Enabled && account) {
            getGameCreate()
            getMatchStatus(matchDate)
            getOdds()
        }
    }, [
        account,
        isWeb3Enabled,
        daiTotalSupply,
        userDaiBalance,
        user2DaiBalance,
        gameCreate,
        cardDescription,
        matchDate
    ]);

    // async function updateUI() {
    //     getGameCreate()
    //     getMatchStatus()
    //     getOdds()
    // }




    async function getOdds() {
        const sendOptions_home = {
            contractAddress: SevillaVSValladolidContractAddress,
            functionName: "homeOdd",
            abi: betContractAbi,
        };
        setHomeOdd(ethers.utils.formatEther(await Moralis.executeFunction(sendOptions_home)))

        const sendOptions_away = {
            contractAddress: SevillaVSValladolidContractAddress,
            functionName: "awayOdd",
            abi: betContractAbi,
        };
        
        setAwayOdd(ethers.utils.formatEther(await Moralis.executeFunction(sendOptions_away)))

        const sendOptions_tied = {
            contractAddress: SevillaVSValladolidContractAddress,
            functionName: "tiedOdd",
            abi: betContractAbi,
        };

        setTiedOdd(ethers.utils.formatEther(await Moralis.executeFunction(sendOptions_tied)));
    }

    function convertUnixTime(unix) {
        let a = new Date(unix * 1000),
            year = a.getFullYear(),
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            month = months[a.getMonth()],
            date = a.getDate(),
            hour = a.getHours(),
            min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes(),
            sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
        return `${month} ${date}, ${year}, ${hour}:${min}:${sec}`;
    }


    async function getGameCreate() {
        const sendOptions = {
            contractAddress: SevillaVSValladolidContractAddress,
            functionName: "getGameCreate",
            abi: betContractAbi,
            params: {
                _requestId: "0x48a6e2a61be93ac9ac688aa2c1a5fede2ecd1d894cfd2b3e5e7ba3c6008f8503",
                _idx: 1
            },
        };

        const _gameCreate = await Moralis.executeFunction(sendOptions)
        setGameCreate(_gameCreate)
        const _date = moment.unix(_gameCreate[1]).format('LLLL')
        setMatchDate(_date)       
    }

    async function getMatchStatus(_matchDate) {
        const sendOptions = {
            contractAddress: SevillaVSValladolidContractAddress,
            functionName: "matchStatus",
            abi: betContractAbi,
        };

        const _matchStatus = await Moralis.executeFunction(sendOptions);
        
        setMatchStatus(_matchStatus);

        // _matchStatus[3] == "finished" ? console.log("listo") : console.log("lala")

        if (_matchStatus[3] == "finished") {
            setCardDescription(_matchStatus[1] + " - " + _matchStatus[2] + " - Finished")
            setIfFinishedHideButtons(true);
        } else {
            setCardDescription("Pending - " + _matchDate)
         }

        // if (matchStatus[3] == "finished") {
        //     setCardDescription(matchStatus[1] + " - " + matchStatus[2] + " - Finished")
        //     setIfFinishedHideButtons(true);
        // } else {
        //     setCardDescription("Pending - " + convertUnixTime(gameCreate[1]))
        // }
    }

    return (
        <div>
            <div className="center"
                style={{
                    width: '270px'
                }}
            >
                <Card
                    description={cardDescription}
                    title={gameCreate[2] + " vs " + gameCreate[3]}
                >
                    <Image
                        alt=""
                        src="https://logodownload.org/wp-content/uploads/2018/11/sevilla-logo-escudo.png"
                        width={110}
                        height={120}
                    />

                    <Image
                        alt=""
                        src="https://logodownload.org/wp-content/uploads/2018/11/real-valladolid-logo-escudo-768x863.png"
                        width={110}
                        height={120}
                    />
                </Card>


                {!ifFinishedHideButtons && <div className="center" style={{
                    width: '200px',
                }}>
                    <Radios
                        id="betOption"
                        items={[
                            'Home' + " (x" + homeOdd + ")",
                            'Away' + " (x" + awayOdd + ")",
                            'Tied' + " (x" + tiedOdd + ")",
                        ]}
                        onBlur={function noRefCheck() { }}
                        onChange={(e) => setOption(e.target.value)}
                        onCreditCardRemoved={function noRefCheck() { }}
                        title="What's your bet?"
                    />

                    <Input
                        label="Amount"
                        name="Amount"
                        onBlur={function noRefCheck() { }}
                        onChange={(e) => setAmount(e.target.value)}
                        value={0}
                    />

                    <div style={{
                        margin: '10px',
                    }}>
                        <Button
                            onClick={async function approveBet() {
                                const sendOptions = {
                                    contractAddress: daiContractAddress,
                                    functionName: "approve",
                                    abi: daiAbi,
                                    params: {
                                        spender: SevillaVSValladolidContractAddress,
                                        amount: amount
                                    }
                                }
                                await Moralis.executeFunction(sendOptions);
                            }}
                            text="Approve"
                            theme="secondary"
                        />
                    </div>


                    <div style={{
                        margin: '10px',
                    }}>
                        <Button
                            onClick={async function setBet() {
                                const sendOptions = {
                                    contractAddress: SevillaVSValladolidContractAddress,
                                    functionName: "setBet",
                                    abi: betContractAbi,
                                    params: {
                                        _choice: option,
                                        _amount: amount
                                    }
                                }
                                await Moralis.executeFunction(sendOptions);
                            }}
                            text="Bet"
                            theme="primary"
                        />
                    </div>
                </div>
                }

                {ifFinishedHideButtons &&

                    <div style={{
                        margin: '10px',
                    }}>

                        <Button
                            onClick={async function approvePayment() {
                                const sendOptions = {
                                    contractAddress: SevillaVSValladolidContractAddress,
                                    functionName: "approvePayment",
                                    abi: betContractAbi,
                                }
                                await Moralis.executeFunction(sendOptions);
                            }}
                            text="Approve Claim"
                            theme="secondary"
                        />
                        <Button
                            onClick={async function claimUserReward() {
                                const sendOptions = {
                                    contractAddress: SevillaVSValladolidContractAddress,
                                    functionName: "claimUserReward",
                                    abi: betContractAbi,
                                }
                                await Moralis.executeFunction(sendOptions);
                            }}
                            text="Claim Rewards"
                            theme="primary"
                        />
                    </div>
                }
            </div>
        </div>
    )
}


