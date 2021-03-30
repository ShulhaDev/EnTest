import React, {useEffect} from 'react'
import {useHistory} from "react-router-dom";
import Row from "../Common/Row/Row";
import SpongeBtn from "../Common/SpongeBtn/SpongeBtn";
import ColumnDiv from "../Common/ColumnDiv/ColumnDiv";
import ActionLabel from "../Common/ActionLabel/ActionLabel";
import TestSelectContainer from "../Common/TestSelect/TestSelectContainer";

const TestSelectPage = ({setFromTestSelect}) => {
    let history = useHistory();

    useEffect(() => {
        setFromTestSelect(true);
    },[setFromTestSelect] )

    return (
        <fieldset>
            <legend>Select test</legend>
            <ColumnDiv>
                <TestSelectContainer />
                <ActionLabel onClick={() => history.push('/testPage')}>Start</ActionLabel>
            </ColumnDiv>
            <Row>
                <SpongeBtn onClick={() => history.push('/testGenerator')}>New Test</SpongeBtn>
                <SpongeBtn onClick={() => history.push('/menuPage')}>Back</SpongeBtn>
            </Row>

        </fieldset>
    );
}

export default TestSelectPage;