const db = require("../db/db");

const createTopic = async(data) => {
    try{

    }catch(err){
        throw err;
    }
}
const getSimilarTopics = async(itemIds) => {
    try{
        let preTopics = [];
        for(let i = 0; i < itemIds.length; i++){
            const [rows] = await db.promise().query("select tags from questions where item_id= ?", [itemIds[i]]);
            let tag = rows[0].tags.slice(0,2);
            preTopics.push(tag);
        }
       const subjectId = preTopics[1].slice(0, 1);
       let [rows] = await db.promise().query("select * from topics where subject_id= ?", [subjectId]);
       fTopics = rows;
        fTopics = fTopics.filter(el=> {
            if(preTopics.includes(el.topic_id)){
                return false;
            }else{
                return true;
            }
        });
       return fTopics;
    }catch(err){
        throw err;
    }
}

const getTopicById = async(id) => {
    try{
       
    }catch(err){
        throw err;
    }
}
const getTopics  = async(subjectId) => {
    try{
        let subjects = await db.promise().query("select * from topics where subject_id= ?", [subjectId]);
        return subjects[0];
    }catch(err){
        throw err;
    }
}

const deleteTopicById = async(id) => {
    try{
        let subject = await db.promise().query("delete * from topics where topic_id= ?", [id]);
        throw subject;
    }catch(err){
        return err;
    }
}
const updateTopicById = async(id, data) => {
    try{

    }catch(err){
        throw err;
    }
}
module.exports = {createTopic, getTopics, getTopicById, deleteTopicById, updateTopicById, getSimilarTopics}