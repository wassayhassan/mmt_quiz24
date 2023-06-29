const express = require("express");
const router = express.Router();
const {createSubject, getSubjects, getSubjectById, deleteSubjectById, updateSubjectById} = require("../controllers/subjectController")

router.get("/", async(req, res)=> {
    try{
        console.log("here")
        let subjects = await getSubjects();
        res.status(200).json(subjects);
    }catch(err){
        res.status(500).json(err.message);
    }
})
router.post("/", async(req, res)=> {
    try{
        let subject = createSubject(req.body);
        res.status(200).json(subject); 
    }catch(err){
        res.status(500).json(err.message);
    }
})
router.get("/:id", async(req, res)=> {
    try{
        let subject = await getSubjectById(req.params.id);
        res.status(200).json(subject);
    }catch(err){
        res.status(500).json(err.message);
    }
})
router.put("/:id", async(req, res)=> {
    try{
        let subject = await updateSubjectById(req.params.id);
        res.status(200).json(subject);
    }catch(err){
        res.status(500).json(err.message);
    }
})
router.delete("/:id", async(req, res)=> {
    try{
        let subject = deleteSubjectById(req.params.id)
        res.status(200).json({message: "Successfully Deleted"});
    }catch(err){
        res.status(500).json(err.message);
    }
})

module.exports = router;