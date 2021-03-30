import React,{useCallback} from 'react'
import {useHistory} from "react-router";
import {confirm,info} from "../Common/EventSponge/EventSponge";
import SearchLineContainer from "../SearchLine/SearchLineContainer";
import TopicSelectContainer from "../Common/TopicSelect/TopicSelectContainer";
import ImageLoaderContainer from "../Common/ImageLoader/ImageLoaderContainer";
import SpongeBtn from "../Common/SpongeBtn/SpongeBtn";
import ColumnDiv from "../Common/ColumnDiv/ColumnDiv";
import Row from "../Common/Row/Row";
import WordDataField from "../Common/WordDataField";
import styles from "./VocabularyPage.module.css"

const  VocabularyPage =  ({wordDataChanged,postData,removeWord,foundList,wordData,loggedIn}) => {
    let data = wordData;
    let history = useHistory();

    const handleChange = useCallback((e) =>{
        wordDataChanged({key: e.target.id, value: e.target.value});
    },[wordDataChanged]);

    const handlePost = () => {
        let activity = (foundList && foundList.length > 0 && foundList.find(item => item.word === data.word)) ? 'update' : 'add';
        if (data.word) {
            confirm('Are you sure you want to ' + activity + ' data?', () => {
                postData(Object.assign({}, data), loggedIn, activity);
            });
        } else
            info("Enter the word");
    }

    const handleRemove = () => {
        if(data.id_word)
            confirm("Are you sure you want to delete the word from vocabulary?", () => {removeWord(data.id_word);});
        else
            info('Word not found');
    }

    let exist = foundList && foundList.find(item => item.word === data.word);
    let wordDataSection = (
        <div className={styles.section + ' ' + (!exist ? styles.unknown : '')}
             title={!exist ? 'Not found' : ''}>
            <SearchLineContainer/>
            <WordDataField  id="translation" value={data.translation} onChange = {handleChange}/>
            <WordDataField id="transcription" value={data.transcription} onChange={handleChange}/>
            <TopicSelectContainer />
        </div>
    );

    let imageSection = (
        <ColumnDiv>
            <ImageLoaderContainer />
        </ColumnDiv>
    );

    return(<div>
        <fieldset>
            <legend>Word</legend>
            <div className={styles.dataSection}>
                {wordDataSection}
                {imageSection}
            </div>
            <br/>
            <Row>
                <SpongeBtn onClick={handlePost}>{exist ? 'Update' : 'Add'}</SpongeBtn>
                <SpongeBtn onClick={handleRemove}>{'Delete'}</SpongeBtn>
                <SpongeBtn onClick={() => history.push("/menuPage")}>Back</SpongeBtn>
            </Row>

        </fieldset>
    </div>
    );
}
export default React.memo(VocabularyPage);