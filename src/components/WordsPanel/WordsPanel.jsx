import React, {useEffect} from 'react'
import styles from "./WordsPanel.module.css"
import Row from "../Common/Row/Row";
import ActionLabel from "../Common/ActionLabel/ActionLabel";

const WordsPanel = ({wordData,searchLineValueChange,selectAllFound,throwAllFound,confirmTestSet, foundList, ...props}) => {
    const selectedWord = React.createRef();
    useEffect(()=>{},[]);
    useEffect(()=> {
        if(selectedWord.current)
            selectedWord.current.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
            });
    },[wordData.word,selectedWord]);

    useEffect(() => () => searchLineValueChange('',''), [searchLineValueChange] );

    const SWord = (props) => {
        const click = () => {
            props.onClick();
        }
        return <label key={props.uniqueKey} ref={props.selected ? selectedWord : null}
                      className={styles.selectable
                                + (props.selected ? ` ${styles.selected}` : '')
                                + (props.selectedForTest ? ` ${styles.selectedForTest}`: '')}
                      onClick={click}>{props.children}</label>
    }

    const nextWord = () => {
        let index = foundList.findIndex(item => item.word === wordData.word);

        if(index === -1) {
            if (foundList && foundList.length > 0)
                searchLineValueChange(foundList[0].word);
        }
        else
            if(index < foundList.length - 1)
                searchLineValueChange(foundList[index + 1].word);
    }
    const previousWord = () => {
        let index = foundList.findIndex(item => item.word === wordData.word);
        if(index === -1) {
            if (foundList && foundList.length > 0)
                searchLineValueChange(foundList[0].word);
        }
        else
            if (index > 0)
                searchLineValueChange(foundList[index-1].word);
    }

    const handleKeyDown = (event) =>{
        switch(event.key){
            case "ArrowUp":
                previousWord();
                break;
            case "ArrowDown":
                nextWord();
                break;
            case " ":
                if(wordData && wordData.word)
                    searchLineValueChange(wordData.word,props.multiselect);
                break;
            default: break;
        }
    }

    const options = (foundList && foundList.length>0)
        ? foundList.map(word => <SWord
                                             key={word.word}
                                             uniqueKey = {word.word}
                                             selected  = {wordData.word === word.word}
                                             selectedForTest = {props.multiselect && props.selectedForTest && props.selectedForTest.find(item => item.word === word.word)}
                                                                         onClick={() => {
                                                                             searchLineValueChange(word.word,props.multiselect)
                                                                         }}
                                             >
                                            {word.word}
                                      </SWord>)
        : 'No Words found';
    let selectBar = props.multiselect? (
        <Row>
            <ActionLabel onClick={selectAllFound}>All</ActionLabel>
            <ActionLabel onClick={throwAllFound}>Clear</ActionLabel>
            <div>
                <ActionLabel onClick={confirmTestSet}>Add</ActionLabel>
            </div>
        </Row>
    ):'';
    return (
        <div className={styles.wordList} tabIndex={"1"} onKeyDown={handleKeyDown}>
            <label className={styles.header}>words</label>
            <div className={styles.panel}>
                {options}
            </div>
            {selectBar}
        </div>
    );
}

export default WordsPanel;