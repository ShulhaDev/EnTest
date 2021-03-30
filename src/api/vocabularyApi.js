import {instance} from "./axiosInstance";

const vocabularyApi = {
    getFilteredWords: (pair) => {
        return instance.get('word/filter',{params: pair});

    },
    postData: (wordData,userId,activity) => {
        return instance.post( 'words/'+ activity,{ value: wordData,userId });
    },
    removeWord:  id_word => instance.post("word/remove", {id_word}),
    uploadImage: (imgFile) => {
        let formData = new FormData();
        formData.append('image',imgFile);
        return instance.post("upload/image",formData,{
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    },
    fetchTopics: (topic) => instance.get('topics',{ params: {value: topic }})
}

export default vocabularyApi;