import React, {useEffect} from 'react'
import styles from "./TestTemplate.module.scss"
import ActionLabel from "../Common/ActionLabel/ActionLabel";
import {confirm,info} from "../Common/EventSponge/EventSponge";
import TestSelectContainer from "../Common/TestSelect/TestSelectContainer";
import Row from "../Common/Row/Row";

const TestTemplate = ({throwSelected,...props}) => {

    useEffect(()=>{
        return () => {
            throwSelected(true);
        }
    },[throwSelected])
    const words = props.words ? props.words.map(word =>
        <li className={word.selectedForThrowing?styles.selectedForThrowing:''}
            key = {word.word}
            onClick={() => props.markForThrowing(word.word)}>
                {word.word}
        </li>):'';


    const reloadTestSet = () => {
        confirm('Are you sure you want to load tests` actual words set? Current set will be lost',() => {props.loadActualTestSet();});
    }

    const saveTest = () => {
        if(props.testData.id < 0){
            info('This is generated test, it cannot be modified. Specify another test name');
        }
        else {
            console.log(props);
            props.saveTest(Object.assign({}, props.testData, {
                author_id: props.user.id,
                words_ids: (props.words && props.words.length > 0) ? props.words.map(word => word.id_word) : undefined
            }));
        }
    }
    const removeTest = () => {
        if(props.testData.id > 0){
            confirm("Are you sure, you want to remove this test?",()=>props.removeTest(props.testData.id));
        }
        else
            info(props.testData.id<0?"You can not remove generated test!":"Unknown test");
    }

    const hasMarkedForThrowing = props.words && props.words.find(word => word.selectedForThrowing);
    const hasAny = props.words && props.words.length > 0;
    const named = props.testData.name;
    return (
        <div>
            <TestSelectContainer />
            <ActionLabel title='Load actual test set'  onClick={reloadTestSet}>↺</ActionLabel>
            <ActionLabel title='Remove this test' onClick={removeTest}>✖</ActionLabel>
            <div className={styles.testSet}>
                <ul>
                    {words}
                </ul>
            </div>
            <Row>
                {named && hasAny && <ActionLabel onClick={saveTest}>save</ActionLabel>}
                {hasMarkedForThrowing && <ActionLabel onClick={() => {throwSelected();}}>throw</ActionLabel>}
                {hasAny && <ActionLabel onClick={() => {throwSelected(true);}}>clear</ActionLabel>}
            </Row>
        </div>
    );
}


export default TestTemplate;