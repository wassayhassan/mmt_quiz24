const db = require("../db/db");

const createSubject = async(data) => {
    try{
       let subject = await db.promise().query('insert into subjects values ?', [data.s_id, data.name]);
       return subject;
    }catch(err){
        throw err;
    }
}

const getSubjectById = async(id) => {
    try{
       let subject = await db.promise().query("select * from subjects where s_id = ?", [id]);
       return subject;
    }catch(err){
        throw err;
    }
}
const getSubjects  = async() => {
    try{
       let subjects = await db.promise().query("select * from subjects");
       return subjects[0];
    }catch(err){
         console.log(err.message)
        throw err;
    }
}
const deleteSubjectById = async(id) => {
    try{
        let subject = await db.promise().query("delete * from subjects where s_id = ?", [id]);
        return subject;
    }catch(err){
        throw err;
    }
}
const updateSubjectById = async(id, data) => {
    try{
        let subject = await db.promise().query("update subjects set name = ? where s_id = ?", [data.name, id]);
        return subject;
    }catch(err){
        throw err;
    }
}
module.exports = {createSubject, getSubjects, getSubjectById, deleteSubjectById, updateSubjectById}