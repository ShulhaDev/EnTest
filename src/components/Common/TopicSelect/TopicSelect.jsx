import React, {useEffect} from 'react'
import ScrollableDataList from "../ScrollableDataList";
import Cleaner from "../Cleaner/Cleaner";

const TopicSelect = ({topicValue,topicList,isSelector,wordDataChanged,fetchTopics}) => {
    useEffect(()=>{
        if(!(topicList && topicList.length>0))
            fetchTopics('');

    },[topicList,fetchTopics]);

    useEffect(()=>{
        if(isSelector) {
            wordDataChanged({key: 'topic', value: ''});
            return () => wordDataChanged({key: 'topic', value: ''});
        }
    },[wordDataChanged,isSelector]);

    const topicChange = (e) => {
        wordDataChanged({key: "topic", value: e.target.value});
    }

    let topics = topicList? topicList.map(
        item => <option key={item.id} value={item.topic}>
                    {`(${item.name})`}
                </option>):'';

    return (
        <>
            <legend style={{marginTop: "15px"}}>topic:</legend>
            <Cleaner cleanerFn={() => {wordDataChanged({key: "topic", value: ''});}}>
                <input id="topic" list="topicList" className={"wordData"} type="text"
                       value={topicValue}
                       placeholder='all(default)'
                       onChange={topicChange}/>
                <ScrollableDataList id="topicList">
                    {topics}
                </ScrollableDataList>
            </Cleaner>
        </>

    );
}

export default React.memo(TopicSelect)