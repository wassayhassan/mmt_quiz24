import { Link } from "react-router-dom";
import Select from 'react-select'
import { useEffect, useState, useContext } from "react";
import { BASELINE } from "../../util";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const colourOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const Topic = () => {
  const {user} = useContext(UserContext);
//  console.log(user);
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [error, setError] = useState("");

  async function handleStartQuiz() {
    if (!user) {
      toast.error("Please login before starting the test");
      navigate("/login"); // Redirect user to the /login page
      return;
    }
  
    if (user.u_id) {
      if (selectedSubject.length < 1) {
        toast.error("Subject Not Selected");
        return;
      }
      if (selectedTopics.length < 1) {
        toast.error("Topic Not Selected");
        return;
      }
      
      if (numberOfQuestions < 2) {
        toast.error("Please choose more than 2 questions");
        return;
      }
      
      navigate("/mathquiz", {
        state: {
          subject: selectedSubject,
          topics: selectedTopics,
          difficulty,
          questionLimit: numberOfQuestions,
        },
      });
    } else {
      toast.error("User not logged-in");
    }
  }
  

  async function getSubjects(){
    try{
      let res = await axios.get(BASELINE+"subjects");
      setSubjects(res.data);
    }catch(err){
      setError(err.message)
    }
  }
  useEffect(()=> {
  //  console.log(selectedTopics)
  }, [selectedTopics])
  async function getTopics(subjectId){
    try{
      setSelectedTopics([]);
      let res = await axios.get(BASELINE+"topics", {params: {subjectId}});
    //  console.log(res);
      let mappedValues = res.data.map((topic)=> {
          return {
            value: topic.topic_id,
            label: topic.name
          }
      })
      setTopics(mappedValues);
    }catch(err){
      setError(err.message)
    }
  }

  useEffect(()=> {
    getSubjects();
  }, [])
  useEffect(()=> {
    if(selectedSubject.length> 0){
      getTopics(selectedSubject);
    }
  }, [selectedSubject])


  return (
    <section className ="wrapper mt-[120px]">
      <div className="w-[90%] max-w-[1000px] 2xl:max-w-[1300px] flex justify-start items-center flex-col gap-5 pt-8 px-5 bg-white rounded-2xl">
        <h2 className="text-black text-[28px] sm:text-[40px] md:text-[48px] font-bold">
          Choose Your Assessment
        </h2>
        <div className="flex flex-row flex-wrap justify-center gap-2">
               <div className="flex flex-col gap-1 p-2 lg:min-w-[300px] lg:max-w-[300px]">
                  <h4 className="font-semibold">Select Subject</h4>
                  <select className="outline-none border-[1px] border-gray-300 p-1 rounded-md focus-within:border-blue-500 focus-within:border-[2px]" onChange={((e)=> {
                    setSelectedSubject(e.target.value)
                    })}>
                    <option>Select a subject</option>
                    {subjects.map((subject, idx)=> {
                     return <option key={'subject-'+idx} value={subject.subject_id}>{subject.name}</option>
                    })}
                  </select>
               </div>
               <div className="flex flex-col p-2">
                  <h4 className="font-semibold">Select Topics</h4>
                  <div>
                  <Select
                      value={selectedTopics}
                      onChange={(values)=> setSelectedTopics(values)}
                      isMulti
                      name="topics"
                      options={topics}
                      className="basic-multi-select lg:min-w-[300px] lg:max-w-[300px]"
                      classNamePrefix="select"
                      
                    />
                  </div>
               </div>
               <div className="hidden flex flex-col gap-1 p-2 lg:min-w-[300px] lg:max-w-[300px]">
                 <h4 className="font-semibold">Select Difficulty</h4>
                  <select onChange={(e)=> setDifficulty(e.target.value)} className="outline-none border-[1px] border-gray-300 p-1 rounded-md focus-within:border-blue-500 focus-within:border-[2px]" aria-label="Select Difficulty">
                     <option value="easy">Easy</option>
                     <option value="medium">Medium</option>
                     <option value="hard">Hard</option>
                  </select>

               </div>
               <div className="flex flex-col gap-1 p-2 lg:min-w-[300px] lg:max-w-[300px]">
                  <h4 className="font-semibold">Select Number Of Questions</h4>
                  <div>
                    <input className="border-[1px] border-gray-300 outline-none p-1 rounded-md focus-within:border-blue-500 focus-within:border-[2px]" type="number" value={numberOfQuestions} onChange={(e)=> setNumberOfQuestions(e.target.value)}   min={2}/>
                  </div>
  
               </div>
        </div>
        <div className="w-full flex flex-row justify-center py-4">
             <motion.button whileTap={{scale:0.97}} onClick={()=> handleStartQuiz()} className="bg-gray-500 px-4 py-2 outline-none rounded-md text-white hover:bg-gray-600">Start Quiz</motion.button>
        </div>
      </div>
    </section>
  );
};

export default Topic;
