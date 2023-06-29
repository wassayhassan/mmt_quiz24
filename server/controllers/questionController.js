const db = require("../db/db");

const createQuestion = async(data) => {
    try{

    }catch(err){
        throw err;
    }
}

const getQuestionById = async(id) => {
    try{
       
    }catch(err){
        throw err;
    }
}
const getQuestions  = async(subject, topics, difficulty, limit) => {
    try{
        const regexPattern = topics.map(topic => `(${topic})`).join('|');
        let questions = await db.promise().query(`select * from questions WHERE tags REGEXP ? limit ?`, [regexPattern,Number(limit)]);
        return questions[0];
    }catch(err){
        throw err;
    }
}
const deleteQuestionById = async(id) => {
    try{

    }catch(err){
        throw err;
    }
}
const updateQuestionById = async(id, data) => {
    try{

    }catch(err){
        throw err;
    }
}
module.exports = {createQuestion, getQuestions, getQuestionById, deleteQuestionById, updateQuestionById}