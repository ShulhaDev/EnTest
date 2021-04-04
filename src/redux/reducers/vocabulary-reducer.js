import vocabularyApi from "../../api/vocabularyApi";
import {info} from "../../components/Common/EventSponge/EventSponge";
import testsAPI from "../../api/testsAPI";
import {simpleRequestHandler} from "../../utils/responseHandlers";

const POST_WORD_COMPLETE = "POST_WORD_COMPLETE";
const WORD_REMOVED = "WORD_REMOVED";
const SEARCH_LINE_VALUE_CHANGED = "SEARCH_LINE_VALUE_CHANGED";
const WORDS_LOADED = "WORDS_LOADED";
const SET_IMAGE_FILE = "SET_IMAGE_FILE"
const WORD_DATA_CHANGED = "WORD_DATA_CHANGED";
const TOPIC_LIST_LOADED = "TOPIC_LIST_LOADED";
const SELECT_ALL_FOUND = "SELECT_ALL_FOUND";
const THROW_ALL_FOUND = "THROW_ALL_FOUND";
const THROW_FROM_TEST_TEMPLATE = "THROW_FROM_TEST_TEMPLATE";
const CONFIRM_TEST_SET = "CONFIRM_TEST_SET";
const MARK_FOR_THROWING_FROM_TEST = "MARK_FOR_THROWING_FROM_TEST";
const SET_FROM_TEST_SELECT = "SET_FROM_TEST_SELECT";
const TEST_NAME_CHANGED = "TEST_NAME_CHANGED";
const TESTS_LOADED = "TESTS_LOADED";
const CLEAR_TESTS = "CLEAR_TESTS";
const TEST_SAVED = "TEST_SAVED";
const TEST_REMOVED = "TEST_REMOVED";
const LOAD_ACTUAL_TEST_SET ="LOAD_ACTUAL_TEST_SET";

const initialState = {
    foundList: undefined,
    filteredList: [],
    topicList: [],
    topicValue:'',
    imageFile: undefined,
    wordData: {
        id_word: 0,
        word: '',
        translation: '',
        transcription: '',
        topic: '',
        image:'',
        audio:''
    },
//test section
    selectedForTest: [],
    confirmedForTest: [],
    tests: undefined,
    testName: '',
    fromTestSelect: undefined,
    testData: {
        id: '',
        name: '',
        words_ids: [],
        author_id: undefined
    }
    //---------------
};

const vocabularyReducer = (state=initialState,action) => {
    let foundList;
    let confirmed;
    let tests;
    let testData;
    let wordData;

    switch (action.type) {

        case POST_WORD_COMPLETE:
            foundList = [...state.foundList];
            tests = [...state.tests.map(test => {
                if(test.name === action.actual.topic.topicName){
                    if(test.words_ids && (test.words_ids + '').split(',').find(id => id === action.actual.id_word)){
                        console.log("ids: ",test.words_ids.split(','));
                        return test;
                    }
                    else {
                        let ids = (test.words_ids && (test.words_ids+'').split(',')) || [];
                        ids.push(action.actual.id_word);
                        ids.sort((a, b) => a > b ? 1 : -1);
                        return Object.assign({}, test, {words_ids: ids.join(',')});
                    }
                }
                else
                    return test;
            })];

            let topicList = [...state.topicList];
            if(!topicList.find(item => item.topic === action.actual.topic.topicName)){
                topicList.push({id: action.actual.topic.topic_id,topic: action.actual.topic.topicName, name: action.userName});
            }
            let ind = foundList.findIndex(item => item.word === state.wordData.word);
            if(ind<0) {
                wordData = Object.assign({},state.wordData,{topic: action.actual.topic.topicName, id_word: action.actual.id_word});
                foundList.push(Object.assign({},wordData));
                foundList.sort((a,b) => a.word > b.word ? 1 : -1);
            }
            else{
                wordData = state.wordData;
                foundList[ind] = Object.assign({},wordData);
            }

            return Object.assign({}, state,{wordData,foundList,tests,topicList});

        case WORD_REMOVED:
            tests = [...state.tests.map(a => Object.assign({},a,{words_ids: a.words_ids.split(',').filter(id => id!== action.id_word)}))];
            return Object.assign({},state,{
                foundList: state.foundList.filter(word => word.id_word !== action.id_word),
                filteredList: state.filteredList.filter(word => word.id_word !== action.id_word),
                wordData: initialState.wordData,
                testData: state.testData.words_ids.filter(id => id !== action.id_word),
                tests
            });

        case SEARCH_LINE_VALUE_CHANGED:
            let word = undefined;

            let selectedForTest = [...state.selectedForTest];
            if(state.foundList){
                word = state.foundList.find( item => item.word === action.value);
                if (word) {
                    if (action.multiselect) {
                        selectedForTest = [...state.selectedForTest];
                        if (selectedForTest.find(item => item.word === word.word)) {
                            selectedForTest = selectedForTest.filter(item => item.word !== word.word)
                        } else
                            selectedForTest.push(word);
                    }
                }
            }
            if(!word)
                word = Object.assign({},initialState.wordData, {word: action.value});
            return Object.assign({},state,{wordData: word, selectedForTest});

        case SELECT_ALL_FOUND:
            return Object.assign({},state, {selectedForTest: [...state.filteredList]});

        case THROW_ALL_FOUND:
            return Object.assign({},state,{selectedForTest:[]});

        case THROW_FROM_TEST_TEMPLATE:
            if(action.all)
                confirmed = []
            else
                confirmed = state.confirmedForTest? [...state.confirmedForTest.filter(word => !word.selectedForThrowing)]:[];

            testData = Object.assign({},
                state.testData,
                {
                    words_ids: confirmed.map(word => word.id_word)
                });
            return Object.assign({},state,{confirmedForTest: confirmed,testData});

        case MARK_FOR_THROWING_FROM_TEST:
            confirmed = state.confirmedForTest ? state.confirmedForTest.map(word => {
                return (word.word === action.word)
                    ? Object.assign({},word,{selectedForThrowing:  !(!!word.selectedForThrowing)})
                    : word;
            }):[];
            return Object.assign({},state,{confirmedForTest: confirmed})

        case CONFIRM_TEST_SET:
            confirmed = state.confirmedForTest? [...state.confirmedForTest]:[];
            let selected = state.selectedForTest? [...state.selectedForTest]:[];
            if(!confirmed) {
                confirmed = selected;
            }
            else {
                state.selectedForTest.forEach(word => {
                    if(!confirmed.find(item => item.word === word.word))
                        confirmed.push(word);
                });
                confirmed.sort((a,b) => { return a.word > b.word?1:-1; })
            }
            selected = [];
            testData = Object.assign({},state.testData,{words_ids: confirmed.map(word => word.id_word)});
            return Object.assign({},state,{confirmedForTest: confirmed,selectedForTest: selected,testData});

        case LOAD_ACTUAL_TEST_SET:
            confirmed = state.confirmedForTest;
            if(state.testData.id  && state.foundList) {
                let ids = (state.tests.find(test => test.id === state.testData.id).words_ids+'').split(',').map(item => +item);
                confirmed = state.foundList.filter(word => ids && ids.find(id => id === word.id_word));
            }
            else {
                confirmed = [];
                console.log('empty');
            }
            return Object.assign({},state,
                {
                    confirmedForTest: confirmed,
                    testData: Object.assign({},state.testData,{words_ids: confirmed.map(word => word.id_word)})
                });
        case SET_FROM_TEST_SELECT:
            return {...state,fromTestSelect: action.value};
        case TEST_NAME_CHANGED:
            let existingTest = state.tests.find(test => test.name === action.value);
            let tData;
            if(!existingTest){
                tData = Object.assign({},initialState.testData, {words_ids: [],name: action.value,author_id: undefined});
            }
            else{
                tData = Object.assign({},existingTest,{
                   words_ids: existingTest.words_ids ? (existingTest.words_ids+'').split(',').map(id => +id): []
               });
            }
            return Object.assign({},state,{testData: tData});

        case TESTS_LOADED:
            tests = action.payload || [];
            return Object.assign({},state,{tests});
        case CLEAR_TESTS:
            return Object.assign({},state,{tests: undefined,testData: initialState.testData});
        case TEST_SAVED:
            tests = [...state.tests];
            console.log(action.actual);
            testData = Object.assign({},
                state.testData,
                {
                    id: action.actual.test_id,
                    author_id: action.actual.author_id,
                    words_ids: state.confirmedForTest.map(word => word.id_word).join(',')
                }
            );
            if(action.actual && action.actual.test_id && !state.testData.id) {
                tests.push(testData);
                tests.sort((a,b) => a.name > b.name?1:-1);
            }
            else{
                tests.find(test => test.id === state.testData.id).words_ids = state.confirmedForTest.map(word => word.id_word).join(',');
            }
            return Object.assign({},state,{tests,testData});
        case TEST_REMOVED:
            return Object.assign({},state,{tests: state.tests.filter(test => test.id !== action.id),testData: initialState.testData});
        case WORDS_LOADED:
            foundList = action.payload;
            if (foundList)
                foundList.sort((a,b) => a.word > b.word ? 1 : -1);

            return Object.assign({},state,{foundList});
        case TOPIC_LIST_LOADED:
            return Object.assign({},state, {topicList: action.payload});

        case WORD_DATA_CHANGED:
            let key = action.pair.key;
            let value = action.pair.value;
            let newWordData = Object.assign({},state.wordData);
            newWordData[key] = value;
            let filteredList = state.foundList;
            if(key === "topic"){
                if(value) {
                    filteredList = state.foundList ? state.foundList.filter(word => word.topic === value) : [];
                }
            }
            return Object.assign({},state,{wordData: newWordData, topicValue: newWordData.topic,filteredList});
        case SET_IMAGE_FILE:
            return {...state, imageFile: action.file}
        default:
            return state;
    }
}


export const postWordComplete = (actual,userName) => ({type: POST_WORD_COMPLETE,actual,userName});
export const wordRemoved = (id_word) => ({type: WORD_REMOVED, id_word});
export const searchLineValueChange = (value='',multiselect) => ({type: SEARCH_LINE_VALUE_CHANGED, value, multiselect});
export const wordsLoaded = (payload) => ({type: WORDS_LOADED, payload});
export const topicListLoaded = (payload) => ({type: TOPIC_LIST_LOADED, payload});
export const setImageFile = (file) => ({type: SET_IMAGE_FILE, file});
export const wordDataChanged = (pair) => ({type: WORD_DATA_CHANGED, pair});
export const selectAllFound = () => ({type: SELECT_ALL_FOUND});
export const throwAllFound = () => ({type: THROW_ALL_FOUND});
export const throwSelected = (all=false) => ({type: THROW_FROM_TEST_TEMPLATE,all});
export const confirmTestSet = () => ({type: CONFIRM_TEST_SET});
export const markForThrowing = (word) => ({type: MARK_FOR_THROWING_FROM_TEST,word});
export const setFromTestSelect = value => ({type: SET_FROM_TEST_SELECT,value})
export const testNameChanged = (value) => ({type: TEST_NAME_CHANGED,value});
export const testsLoaded = (payload) => ({type: TESTS_LOADED,payload});
export const loadActualTestSet = () => ({type: LOAD_ACTUAL_TEST_SET});
export const testSaved = (actual) => ({type: TEST_SAVED,actual});
export const clearTests = () => ({type: CLEAR_TESTS});
export const testRemoved = (id) => ({type: TEST_REMOVED,id});

export const postData = (wordData, user, activity) => async (dispatch, getState) => {
    if (!wordData && wordData.word) {
        info('Enter the word');
        return;
    }

    let imageFile = getState().vocabularyState.imageFile;
        let url;
        let result = await simpleRequestHandler(
            vocabularyApi.uploadImage(imageFile),
            undefined,data => dispatch(wordDataChanged({image: data.data}))
        );
        if (!result.error) {
            dispatch(setImageFile(undefined));
            url = result.data;
        }
        await simpleRequestHandler(
            vocabularyApi.postData({...wordData, image: url || wordData.image}, user.userId, activity),
            dispatch,postWordComplete,"Data stored successfully");
}

export const setImage = file => dispatch => {
    let url = file ? URL.createObjectURL(file) : '';
    dispatch(setImageFile(file));
    dispatch(wordDataChanged({key: "image", value: url}))
}

export const removeWord = id_word => async (dispatch) => {
    if (!id_word)  return;
    await simpleRequestHandler(
        vocabularyApi.removeWord(id_word),
        dispatch, wordRemoved, 'Word has been removed successfully');
}

export const getFilteredWords = (pair) => async (dispatch) => {
    let params = {  key: (pair && pair.key) || "topic", value: (pair && pair.value)  || "" };
    await simpleRequestHandler(vocabularyApi.getFilteredWords(params),dispatch, wordsLoaded);
}

export const getWords =  () =>  dispatch => {
    dispatch(getFilteredWords(undefined));
}

export const fetchTopics = () => async (dispatch) => {
  await simpleRequestHandler(vocabularyApi.fetchTopics(''), dispatch, topicListLoaded);
}

export const loadTests = user =>  async (dispatch) => {
    await simpleRequestHandler(testsAPI.loadTests(user), dispatch, testsLoaded);
}

export const saveTest = testData => async (dispatch) => {
    let issue = !testData
        ? 'Missing test data'
        : !testData.name
            ? 'Specify test name'
            : !testData.words_ids
                ? 'Empty words list. Add some words'
                : '';
    if (issue)
        info(issue);
    else
        await simpleRequestHandler(testsAPI.saveTest(testData),dispatch,testSaved,'Test has been saved successfully');
}

export const removeTest = id => async (dispatch) => {
    await simpleRequestHandler(testsAPI.removeTest(id),dispatch,testRemoved,'Test has been removed successfully');
}

export default vocabularyReducer;