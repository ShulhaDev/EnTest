import React from 'react'
import TopicSelectContainer from "../Common/TopicSelect/TopicSelectContainer";
import SpongeBtn from "../Common/SpongeBtn/SpongeBtn";
import WordsPanelContainer from "../WordsPanel/WordsPanelContainer";
import {useHistory} from "react-router-dom";
import ColumnDiv from "../Common/ColumnDiv/ColumnDiv";
import Row from "../Common/Row/Row";
import TestTemplateContainer from "../TestTemplate/TestTemplateContainer";
import withAuthorization from "../../HOCs/withAuthorization";
import styles from './TestGenerator.module.scss'

const TestGenerator = () => {
    let history = useHistory();
    return (
        <fieldset>
            <legend>Create test</legend>
            <div className={styles.container}>
                <ColumnDiv>
                    <TopicSelectContainer isSelector={true}/>
                    <WordsPanelContainer multiselect={true}/>
                </ColumnDiv>
                <ColumnDiv>
                    <TestTemplateContainer />
                </ColumnDiv>
            </div>
            <Row>
                <div />
                <SpongeBtn onClick={() => history.push('./testSelectPage')}>Back</SpongeBtn>
            </Row>
        </fieldset>
    );
}

export default withAuthorization(TestGenerator);