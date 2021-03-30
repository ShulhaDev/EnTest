import React from "react"
import styles from "./TestSelect.module.css";
import ScrollableDataList from "../ScrollableDataList";
import Cleaner from "../Cleaner/Cleaner";
import {leavesEqual} from "../../../utils/comparators";

const TestSelect = ({testData,tests,testNameChanged}) => {
    const options = (tests)? tests.filter(test => test.id !==0).map((test)=> <option key={test.id} value={test.name}/>):'';
    const handleChange = (e) => {
        testNameChanged(e.target.value);
    }

    return (
        <React.Fragment>
            <legend>Test name</legend>
            <Cleaner cleanerFn={() => {testNameChanged('')}}>
                <input id="testSelect"
                       list="testList"
                       className={"wordData " + (testData && testData.id < 0 ? styles.constant : '')}
                       type="text"
                       title={testData && testData.id < 0 ? 'Generated test, cannot be modified' : ''}
                       value={testData && testData.name}
                       placeholder={'type here'}
                       onChange={handleChange}/>
                <ScrollableDataList id="testList">
                    {options}
                </ScrollableDataList>
            </Cleaner>

        </React.Fragment>
    );
}
export default React.memo(TestSelect,leavesEqual);