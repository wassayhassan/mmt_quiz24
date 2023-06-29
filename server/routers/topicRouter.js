const express = require("express");
const router = express.Router();
const {createTopic,getSimilarTopics, getTopics, getTopicById, deleteTopicById, updateTopicById} = require("../controllers/topicController")

router.get("/", async(req, res)=> {
    try{
        const {subjectId, similar, itemIds} = req.query;
        if(similar){
              let topics = await getSimilarTopics(itemIds);
              res.status(200).json(topics); 
        }else{
            let topics  = await getTopics(subjectId)
            res.status(200).json(topics); 
        }
    }catch(err){
        res.status(500).json(err.message);
    }
})
router.post("/", async(req, res)=> {
    try{
        let topic = await createTopic(req.body)
        res.status(200).json(topic);  
    }catch(err){
        res.status(500).json(err.message);
    }
})
router.get("/:id", async(req, res)=> {
    try{
        let topic = await getTopicById(req.params.id)
        res.status(200).json(topic);
    }catch(err){
        res.status(500).json(err.message);
    }
})
router.put("/:id", async(req, res)=> {
    try{
        let topic = await updateTopicById(req.params.id);
        res.status(200).json(topic);
    }catch(err){
        res.status(500).json(err.message);
    }
})
router.delete("/:id", async(req, res)=> {
    try{
        let topic = await deleteTopicById(req.params.id);
        res.status(200).json({message: "Successfully Deleted"});
    }catch(err){
        res.status(500).json(err.message);
    }
})

module.exports = router;