import { useWeb3Contract, useMoralis } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useEffect, useState } from "react"
import { useNotification } from "web3uikit"

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const lotteryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    const [entranceFee, setEntranceFee] = useState()
    const [numPlayers, setNumPlayers] = useState()
    const [recentwinner, setRecentwinner] = useState()
    const [lastTimeStamp, setLastTimeStamp] = useState()
    const [lotteryState, setLotteryState] = useState()
    const [time, setTime] = useState()
    const dispatch = useNotification()
    const {
        runContractFunction: enterLottery,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "enterLottery",
        params: {},
        msgValue: entranceFee,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getRecentWinner",
        params: {},
    })
    const { runContractFunction: getLastTimeStamp } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getLastTimeStamp",
        params: {},
    })
    const { runContractFunction: getLotteryState } = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress,
        functionName: "getLotteryState",
        params: {},
    })
    async function updateUI() {
        const entranceFee = await getEntranceFee()
        const numPlayers = await getNumberOfPlayers()
        const recentWinner = await getRecentWinner()
        const lastTimeStamp = await getLastTimeStamp()
        const lotteryState = await getLotteryState()
        setEntranceFee(parseInt(entranceFee))
        setNumPlayers(parseInt(numPlayers))
        setRecentwinner(recentWinner)
        setLastTimeStamp(parseInt(lastTimeStamp))
        setLotteryState(lotteryState)
    }
    useEffect(() => {
        if (isWeb3Enabled) {
            console.log("Hey")
            updateUI()
        }
    }, [isWeb3Enabled])
    useEffect(() => {
        const timerID = setInterval(() => {
            tick()
        }, 1000)

        return function cleanup() {
            clearInterval(timerID)
        }
    },)

    function tick() {
        console.log("Hey")
        setTime(Date.now().toString().slice(0, 10))
        updateUI()
    }
    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete!",
            title: "Tx Notification",
            position: "topR",
            icon: "bell",
        })
    }
    return (
        <div className="p-5">
            Lottery Contract Address <b>{contractAddresses[chainId]}</b>
            <br />
            <br />
            {lotteryAddress ? (
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                    onClick={async () =>
                        await enterLottery({
                            // onComplete:
                            // onError:
                            onSuccess: handleSuccess,
                            onError: (error) => console.log(error),
                        })
                    }
                    disabled={isLoading || isFetching || lotteryState === 1}
                >
                    {isLoading || isFetching ? (
                        <div className="animate-spin h-6 w-6 border-b-2 rounded-full"></div>
                    ) : (
                        "Enter Lottery"
                    )}
                </button>
            ) : (
                <></>
            )}
            <br />
            <br />
            <br />
            Entrance Fee for Entering Lottery is: <b>{(entranceFee)/ 1000000000000000000}ETH</b>
            <br />
            <div>
                Current Number of Participants: <b>{numPlayers}</b>
            </div>
            <div>Balance in Lottery Contract is {numPlayers * 0.01}</div>
            Recent Winner is: <b>{recentwinner}</b>
            <br />
            <div>
                Previous Lottery Ended on: <b>{lastTimeStamp}</b>
            </div>
            <div>
                Lottery is Currently :{" "}
                {lotteryState === 0 ? (
                    <b className="text-green-600">Open</b>
                ) : (
                    <b className="text-red-500">Close</b>
                )}
            </div>
            <b>{time}</b>
        </div>
    )
}
