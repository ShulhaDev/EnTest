import React, {useState,useEffect,useRef} from "react"
import styles from "./TestTimer.module.css"

const useInterval = (callback,running,duration) => {
    const doStep = useRef();

    useEffect(()=>{
        doStep.current =  callback;
    },[callback]);
    useEffect(()=>{
        function step(){
            doStep.current();
        }
        if(running){
            let timerId = setInterval(step,duration);
            return () => clearInterval(timerId);
        }
    },[running,duration]);
}

const TestTimer = ({time, connectTime, connectToggle, connectResetter, onExpired}) => {
    const [timeLeft,setTime] = useState(time);
    const [running,setRunning] = useState(false)

    useInterval(() => {
        setTime(prev => {
            let newTime = Math.max(prev - 10,0);
            if(newTime === 0){
                //setRunning(false);
                setTimeout(onExpired,0);
            }
            return newTime
        });
    }, running,10);

    const toggle = useRef();
    const reset = useRef();
    const postTime = useRef();

    useEffect(() => {
        toggle.current = () => {
            setRunning(prev => !prev);
        }
        reset.current = () => {
            setTime(time);
            setRunning(false);
        }
        postTime.current = () => {
            console.log("timeLeft: ", timeLeft);
            return timeLeft;
        }
    },[time, timeLeft]);

    useEffect(()=>{
        connectToggle(toggle.current);
        connectResetter(reset.current);
        connectTime(() => timeLeft)
    },[timeLeft,connectToggle,connectResetter, connectTime]);

    let stateClock = running ? styles.running : styles.stopped;
    const timeFormatted = (timeLeft/1000.0).toFixed(3);

    return (
        <div className={styles.frame}>
            <label className={styles.clock + " " +  stateClock}>{timeFormatted}</label>
        </div>
    );
}

export default TestTimer;