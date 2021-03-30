import React, {useState,useEffect,useCallback,useMemo,useRef} from 'react'
import ColumnDiv from "../Common/ColumnDiv/ColumnDiv";
import styles from './TestPage.module.css'
import PinnedImage from "../Common/PinnedImage";
import Row from "../Common/Row/Row";
import SpongeBtn from "../Common/SpongeBtn/SpongeBtn";
import {useHistory} from "react-router-dom";
import InfoLabel from "../Common/InfoLabel/InfoLabel";
import TestTimer from "../Common/TestTimer/TestTimer";

const AnswerOption = ({step,...props}) => {
    const [optionType,setOptionType] = useState(styles.regular);
    let timer=null;
    useEffect(()=>{
        return ()=> clearTimeout(timer);
    },[timer]);
    const handleClick = () => {
        setOptionType(styles[props.type]);
        timer = setTimeout(()=>{
            setOptionType(styles.regular);
            props.next();
        },500);
    }
    return <label className={styles.answerOption + ' ' + optionType} onClick={handleClick} >{props.children}</label>;
}

const AnimatedPinnedImage = ({src}) => {
    let currentKey = useMemo(() => {
        return src + randomInt((new Date()).getSeconds());
        },[src])
    let className = styles.appear;
    return <div className={className}  key={currentKey} ><PinnedImage src ={src}/></div>
}


const randomInt = max => Math.floor(Math.random() * Math.floor(max));

const useAnswerOptions = (ids,words,st) =>{
    const [opts,setOpts] = useState([]);

    const getOptions = (base,count,ids) => {
        if(!ids || count> ids.length || count === 0)
            return;
        let currentOptions = [];
        for( let i=4; i--; ){
            currentOptions.push(ids.splice(randomInt(base) % ids.length,1)[0]);
        }
        return currentOptions;
    }

    const generateOptions = useCallback(() => {
        let index = randomInt((new Date()).getTime()) % ids.length;
        let idRight = ids[index];
        let idsWrong = words.map(word => word.id_word).filter(id => id !== idRight);
        let currentOptions = getOptions((new Date()).getTime() + st,4,idsWrong);
        if(currentOptions && currentOptions.length>0){
            currentOptions.push(+idRight);
            currentOptions.sort(() => Math.random() - 0.5 );
            currentOptions = currentOptions.map(opt => ({id: opt, right: opt === idRight}))
        }
        return currentOptions;
    },[st,ids,words]);
    useEffect(()=>{
        let options = generateOptions();
        setOpts(options);
    },[generateOptions])
    return opts;
}

const TestPage = ({setFromTestSelect, ...props}) => {
    const [step,setStep] = useState(0);
    const [paused,setPaused] = useState(true);
    const [score,setScore] = useState(0);
    const rightAnswers = useState(0);
    const failures = useState(0);

    const options = useAnswerOptions(props.test_ids,props.words,step);
    let answerOptions;

    const history =useHistory();
    const toggleTimer = useRef();
    const doResetTimer = useRef();
    const timeLeft = useRef();

    useEffect(()=>{
        return () => setFromTestSelect(false);
    },[setFromTestSelect]);

    useEffect(()=>{
        return ()=>{
            toggleTimer.current = null;
            doResetTimer.current = null;
            timeLeft.current = null;
        }
    },[]);


    const storeToggleCb = useCallback((cb) => {
        toggleTimer.current = cb;
    },[]);

    const storeResetCb = useCallback((cb) => {
        doResetTimer.current = cb;
    },[]);

    const increase = ([a,setA]) => {
        setA(a + 1)
    };

    const getTime = useCallback( (cb) => {
        timeLeft.current = cb;
    }, []);

    const registerAnswer = (ok) => {
        if(ok) {
            const time = timeLeft.current();
            setScore(prev => prev + (1 + Math.floor(step / 30.0)) * time);
        }
        increase(ok ? rightAnswers : failures)

        if (toggleTimer.current && doResetTimer.current) {
            doResetTimer.current();
            toggleTimer.current();
        }
        setStep(step + 1);
    }


    const toggleTest = () => {
        if(toggleTimer.current) {
            toggleTimer.current();
            setPaused(prev => !prev);
        }
    }

    answerOptions = options && options.map((opt) => <AnswerOption
                                            key = {opt.id * (Math.random()+1)}
                                            step = {step}
                                            type={opt.right?"right":"wrong"}
                                            next={() => registerAnswer(opt.right)}>
                                                {props.words.find(word => word.id_word === opt.id).word}
                                        </AnswerOption>)
    const optionRight = options && options.find(opt => opt.right);
    const idRight = (optionRight && optionRight.id) || 0;
    const wordRight = props.words.find(word => word.id_word === idRight);
    let width = paused ? "100%" : "1px";
    let height = paused ? "100%" : "1px";
    const wall = paused? <div className={styles.wall}/>: '';
    return (
        <div>
            <Row>
                <TestTimer time={5000} connectTime={getTime} connectToggle={storeToggleCb} connectResetter={storeResetCb} onExpired ={() => {registerAnswer(false);}}/>
                <div>Score: {score}</div>
            </Row>
            <fieldset>
                <legend>Test: {props.testName}</legend>
                <div className={ paused ? styles.blur : ""} style={{position: "relative",display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                    {wall}
                    <ColumnDiv>
                        <AnimatedPinnedImage src={wordRight && wordRight.image}/>
                        <InfoLabel sourceType={"translation"}>{wordRight && wordRight.translation}</InfoLabel>

                    </ColumnDiv>
                    <ColumnDiv style={{textAlign: "left"}}>
                        <div style={{display: "flex", flexFlow: "column nowrap", alignContent: "flex-start"}}>
                            {answerOptions}
                        </div>
                    </ColumnDiv>
                </div>
                <Row>
                    <div />
                    <div style={{paddingBottom: "10px"}}>
                        <label className={styles.results}>{"✓"}</label>{rightAnswers[0]}
                        <label className={styles.results}>{"✗"}</label>{failures[0]}
                    </div>
                </Row>
                <Row>
                    <SpongeBtn onClick={toggleTest}>{paused?"Go" : "Pause"}</SpongeBtn>
                    <SpongeBtn onClick={() => history.push('./testSelectPage')}>Back</SpongeBtn>
                </Row>
            </fieldset>
            <div style={{width: {width}, height: {height}, position: "absolute", top: "1px"}}>
                <svg id="svg-filter" style={{height: '1px'}}>
                    <filter id="svg-blur">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10"/>
                    </filter>
                </svg>
            </div>
        </div>
    );
}

export default TestPage;