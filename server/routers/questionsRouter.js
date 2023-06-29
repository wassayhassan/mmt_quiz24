const express = require("express");
const router = express.Router();
const {createQuestion, getQuestions, getQuestionById, deleteQuestionById, updateQuestionById} = require("../controllers/questionController")

router.get("/", async(req, res)=> {
    try{
        const {subject, topics, difficulty, limit} = req.query;
        console.log(topics);
        let questions = await getQuestions(subject, topics, difficulty, limit);
        res.status(200).json(questions);
    }catch(err){
        res.status(500).json(err.message);
    }
})
router.post("/", async(req, res)=> {
    try{
        let question = await createQuestion(req.body);
        res.status(200).json(question); 
    }catch(err){
        res.status(500).json(err.message);
    }
})
router.get("/:id", async(req, res)=> {
    try{
        let question = await getQuestionById(req.params.id);
        res.status(200).json(question);
    }catch(err){
        res.status(500).json(err.message);
    }
})
router.put("/:id", async(req, res)=> {
    try{
        let question = updateQuestionById(req.params.id, req.body);
        res.status(200).json(question);
    }catch(err){
        res.status(500).json(err.message);
    }
})
router.delete("/:id", async(req, res)=> {
    try{
        let question = await deleteQuestionById(req.params.id);
        res.status(200).json({message: "Successfully Deleted"});
    }catch(err){
        res.status(500).json(err.message);
    }
})

module.exports = router;