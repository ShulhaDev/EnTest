export const getTopics = state => state.vocabularyState.topicList
export const getTopicValue = (state,isSelector= false) => isSelector
                                                                  ? state.vocabularyState.topicValue
                                                                  : state.vocabularyState.wordData.topic
export const getWordData = state => state.vocabularyState.wordData
export const getSearchLineValue = state => state.vocabularyState.wordData.word
export const getFoundList = state => state.vocabularyState.foundList
export const getFilteredList = state => state.vocabularyState.filteredList
export const getSelectedForTest = state => state.vocabularyState.selectedForTest
export const getConfirmedForTest = state => state.vocabularyState.confirmedForTest
export const getWordImageUrl = state => state.vocabularyState.wordData.image
