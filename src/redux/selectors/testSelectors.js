import {getFoundList} from "./vocabularySelectors";
import {createSelector} from "reselect";

export const getTests = state => state.vocabularyState.tests
export const getTestData = state => state.vocabularyState.testData
export const getFromTestSelect = state => state.vocabularyState.fromTestSelect

export const getCurrentTest = createSelector([getTests,getTestData],(tests,testData) => {
    return  tests && tests.find(test => test.id === testData.id);
});

export const getCurrentTestSet = createSelector([getCurrentTest,getFoundList],(test,foundList) => {
    return (test && test.words_ids)
        ? (test.words_ids.split(',').map(id => +id))
        : foundList
            ? foundList.map(word => word.id_word)
            : [];
});