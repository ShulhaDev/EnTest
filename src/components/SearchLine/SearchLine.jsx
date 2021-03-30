import React, {useEffect} from 'react'
import styles from "./SearchLine.module.css"
import ScrollableDataList from "../Common/ScrollableDataList";
import Cleaner from "../Common/Cleaner/Cleaner";

const forbidden = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя';

const SearchLine = ({foundList,searchLineValue,searchLineValueChange}) => {

    const check = (value) => {
        return value.split('').map(letter => !forbidden.includes(letter) ? letter : '' ).join('');
    };
    const change = (e) => {
        searchLineValueChange(check(e.target.value));
    }

    useEffect(()=>{
        return () => {
            searchLineValueChange('');
        }
    },[searchLineValueChange])

    const items = foundList ?
        foundList.map(item => <option key={item.word} value={item.word}>{item.word}</option> )
        :'';
    return (
        // <div style={{display:"flex"}}>
        <Cleaner cleanerFn={() => {searchLineValueChange('')}}>
            <input className={styles.search}
                   type="text"
                   autoComplete="nope"
                   placeholder="Start typing here..."
                   list="wordsList"
                   id="word"
                   name="wordLine"
                   onChange={change} value={searchLineValue}/>
            <ScrollableDataList id="wordsList">
                {items}
            </ScrollableDataList>
        </Cleaner>
    );
}

export default React.memo(SearchLine);