import React from 'react'
import SpongeBtn from "../Common/SpongeBtn/SpongeBtn";
import {useHistory} from "react-router";
import TopicSelectContainer from "../Common/TopicSelect/TopicSelectContainer";
import WordsPanelContainer from "../WordsPanel/WordsPanelContainer";
import WordInfoPanel from "../WordInfoPanel/WordInfoPanel";
import ColumnDiv from "../Common/ColumnDiv/ColumnDiv";
import Row from "../Common/Row/Row";
import styles from './LearnPage.module.scss'

const LearnPage = (props) =>{
    const history = useHistory();
    return(
        <div>
            <fieldset>
                <legend className={'highlighted'}>learn page</legend>
                <div  className={styles.learnLayout}>
                    <ColumnDiv>
                        <TopicSelectContainer isSelector={true}/>
                        <WordsPanelContainer />
                    </ColumnDiv>
                    <ColumnDiv>
                        <WordInfoPanel data={props.data}/>
                    </ColumnDiv>
                </div>
                <Row>
                    <div />
                    <SpongeBtn onClick ={()=>history.push('/menuPage')}>Back</SpongeBtn>
                </Row>
            </fieldset>
        </div>
    );
}

export default LearnPage;