const express = require("express");
const router = express.Router();
const {createTest, getTestsByUserId, getTestById, deleteTestById, updateTestById} = require("../controllers/testController")

router.get("/", async(req, res)=> {
    try{
        let tests = await getTestsByUserId();
        res.status(200).json(tests);
    }catch(err){
        res.status(500).json(err.message);
    }
})
router.post("/", async(req, res)=> {
    try{
        let test = await createTest(req.body);
        res.status(200).json({testId: test});
}catch(err){
        res.status(500).json(err.message);
    }
})
router.get("/:id", async(req, res)=> {
    try{
     let test = await getTestById(req.params.id);
     res.status(200).json(test);
    }catch(err){
        res.status(500).json(err.message);
    }
})
router.put("/:id", async(req, res)=> {
    try{
      let test = updateTestById(req.params.id, req.body);
      res.status(200).json(test);
    }catch(err){
        res.status(500).json(err.message);
    }
})
router.delete("/:id", async(req, res)=> {
    try{
      let test = deleteTestById(req.params.id);
      res.status(200).json({message: "Delete Successfully"});
    }catch(err){
        res.status(500).json(err.message);
    }
})
module.exports = router;