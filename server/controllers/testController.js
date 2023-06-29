const db = require("../db/db");
const crypto = require("crypto");





const createTest = async(data) => {
    try{
        let testId = crypto.randomUUID();
        console.log(testId);
        let testInsert =  await db.promise().query("insert into tests(test_id, user_id, timeframe) values(?, ?, ?)", [testId, data.userId, data.timeframe]);
        console.log(testInsert);
        let testResultId = crypto.randomUUID();
        let testResultInsert = await db.promise().query("insert into tests_results(tr_id, test_id, total_marks, obtained_marks) values(?, ?, ?, ?)", [testResultId, testId, data.totalMarks, data.obtainedMarks]);
        console.log(testResultInsert);
        data.questions.forEach(async(question)=> {
            console.log(question)
            let testQuestionId = crypto.randomUUID();
            let testQuestionInsert = await db.promise().query("insert into test_questions(tq_id, item_id, test_id, answered, is_correct) values(?, ?, ?, ?, ?)", [testQuestionId, question.item_id, testId, question.answered, question.correct]);
            console.log(testQuestionInsert);
        })
       return testId;
    }catch(err){
        console.log(err);
        throw err;
    }
}

const getTestById = async(id) => {
    try{
       let [rows] = await db.promise().query("select * from tests where test_id  = ?", [id]);
       let td = rows[0];
       let testQuestions = await db.promise().query("select * from test_questions where test_id  = ?", [id]);
       [rows]= await db.promise().query("select * from tests_results where test_id  = ?", [id]);
       return {...td, questions: testQuestions[0], result: rows[0]};
    }catch(err){
        console.log(err);
        throw err;
    }
}
const getTestsByUserId  = (userId) => {
    try{
    
    }catch(err){
        throw err;
    }
}
const deleteTestById = (id) => {
    try{

    }catch(err){
        throw err;
    }
}
const updateTestById = (id, data) => {
    try{

    }catch(err){
        throw err;
    }
}
module.exports = {createTest, getTestById, getTestsByUserId, deleteTestById, updateTestById}