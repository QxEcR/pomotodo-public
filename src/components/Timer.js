import React, {useState, useEffect, useRef} from 'react'
import "../styles/Timer.css"


const Timer = () => {

    const [Turn, setTurn] = useState("PomoTodo")
    const [workTime, setWorkTime] = useState(25)
    const [breakTime, setBreakTime] = useState(5)
    const [timer, setTimer] = useState("")
    const [button, setButton] = useState("Start")
    const [intervalId, setIntervalId] = useState(0);
    const [audio] = useState( typeof Audio !== "undefined" && new Audio("../assets/peep.mp3"));

    const Work = useRef()
    const Break = useRef()

    var minutes, seconds, turn

    useEffect(() => {
        setTimer("Timer")

        Work.current.addEventListener("input", (e) => {
            setWorkTime(parseInt(Work.current.value))  
        })

        Break.current.addEventListener("input", (e) => {
            setBreakTime(parseInt(Break.current.value)) 
        })
    }, [])

    const timerCounter = () => {
        minutes = workTime-1
        seconds = 59

        const timerInterval = setInterval(() => {               
            let minutesStr = minutes < 10? "0"+minutes : minutes
            let secondsStr = seconds < 10? "0"+seconds : seconds
            let timeStr = `${minutesStr}:${secondsStr}`

            setTimer(timeStr)

            seconds--
            
            if(seconds < 0) {
                seconds = 59
                minutes--
                if (minutes < 0){
                    if(turn == "Work"){
                        turn = "Break"
                        setTurn("Break")
                        minutes = breakTime-1
                    }else if(turn == "Break"){
                        turn = "Work"
                        setTurn("Work")
                        minutes = workTime-1
                    }
                }
            }
        }, 1000);
        setIntervalId(timerInterval)
    }


    const timerBtnHandler = () => {
        if(Work.current.value < 0 || Work.current.value > 60 ){
            alert("timer should be between 1 and 60")
            return
        }
        if(Break.current.value < 0 || Break.current.value > 60 ){
            alert("timer should be between 1 and 60")
            return
        }
        if (button == "Start") {
            turn = "Work"
            setTurn("Work")
            setButton("Restart")

            Work.current.disabled = true
            Break.current.disabled = true

            Work.current.value = ""
            Break.current.value = ""

            timerCounter()
        }
        if (button == "Restart") {
            setButton("Start")
            Work.current.disabled = false
            Break.current.disabled = false
            clearInterval(intervalId)
        }
    }

    return (
        <div className="timerContainer">
            <div className="timerCard">
                <div className="timerCounterHeader"> {Turn} </div>
                <div className="timerCounter">{timer}</div>
                <button onClick={timerBtnHandler} className="timerButton">{button}</button>
                <div className="inputContainer">
                    <input ref={Work} className="input" placeholder="Work Time" type="number" />
                    <input ref={Break} className="input" placeholder="Break Time" type="number" />
                </div>
            </div>
        </div>
    )
}

export default Timer




// {isTimerOn
//     ? <div>TIMER ON</div>
//     : <div>TIMER OFF</div>
// }