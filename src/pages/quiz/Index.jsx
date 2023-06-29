import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import QuestionModal from "./QuestionModal";
import { useStopwatch } from "react-timer-hook";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { CiCalculator1 } from "react-icons/ci";
import { VscReferences } from "react-icons/vsc";
import { BsThreeDotsVertical } from "react-icons/bs";
import Question from "./MathQuestion";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import Timer from "./Timer";
import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { UserContext } from "../../context/UserContext";
import { useLocation } from "react-router-dom";
import { BASELINE } from "../../util";
import Review from "./Review";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import DirectionModal from './DirectionModal';
import ReferenceSheet from './ReferenceSheet';


const Quiz = () => {
  const {
    seconds,
    minutes,
    start
  } = useStopwatch();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const location = useLocation();
  const data = location.state;
  const [showCalculator, setShowCalculator] = useState(false);
  const [questionOverViewOpen, setQuestionOverviewOpen] = useState(false);
  const [showReference, setShowReference] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [bookmarkedQuestions, setBookMarkedQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [error, setError] = useState('');
  const [showDirectionModal, setShowDirectionModal] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [showDirectionModalRef, setShowDirectionRefModal] = useState(false);


  async function handleSubmit() {
    try {
      let totalMarks = questions.length;
      let obtainedMarks = 0;
      let newDat = questions.map((question) => {
        if (question?.style === "SPR") {
          if (question.selectedOption === question.rationale) {
            question.correct = true;
            obtainedMarks++;
          } else {
            question.correct = false;
          }
        } else {
          if (question.selectedOption === question.correct_choice) {
            obtainedMarks++;
;
            question.correct = true;
          } else {
            question.correct = false;
          }
        }
        return { correct: question.correct, selectedOption: question.selectedOption, answered: question.answered, item_id: question.item_id }
      });
      let data = {
        questions: newDat,
        timeframe: minutes + " minutes " + seconds + " seconds",
        totalMarks,
        obtainedMarks,
        userId: user.u_id
      }
      let saveResult = await axios.post(BASELINE + "tests", data);
      navigate(`/results/${saveResult.data.testId}`);
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    }


  }

  useEffect(() => {
    var elt = document.getElementById('calculator');
    var calculator = window.Desmos?.GraphingCalculator(elt,{
      graphpaper: false,
      keypad: true
    });
    return () => {
      calculator?.destroy();
    }
  }, [showCalculator])
  const handleBookMark = (itemId) => {
    setQuestions((pre => {
      return pre.map((question) => {
        if (question?.item_id == itemId) {
          if (question.bookMarked) {
            return { ...question, bookMarked: false };
          } else {
            return { ...question, bookMarked: true };
          }
        } else {
          return question;
        }
      })
    }))
  }
  useEffect(() => {
    getQuestions()
  }, [])
  useEffect(() => {
    if (questions.length > 0 && currentQuestion) {
      let q = questions.find((ques => ques?.item_id === currentQuestion?.item_id));
      setCurrentQuestion(q);

    }
  }, [questions])

  async function handleSelectOption(itemId, option) {
    setQuestions((pre => {
      return pre.map((question) => {
        if (question?.item_id == itemId) {
          return { ...question, selectedOption: option };
        } else {
          return question;
        }
      })
    }))
  }
  async function handleCrossOutOptions(itemId, option) {
    setQuestions((pre => {
      return pre.map((question) => {
        if (question?.item_id == itemId) {
          let crossedOutOptions = question.crossedOutOptions;
          if (crossedOutOptions.includes(option)) {
            crossedOutOptions = crossedOutOptions.filter((el) => el !== option);
          } else {
            crossedOutOptions.push(option);
          }
          return { ...question, crossedOutOptions: crossedOutOptions };
        } else {
          return question;
        }
      })
    }))
  }
  async function handleAnswerValueChange(itemId, value) {
    setQuestions((pre => {
      return pre.map((question) => {
        if (question?.item_id == itemId) {
          return { ...question, selectedOption: value };
        } else {
          return question;
        }
      })
    }))
  }

  async function getQuestions() {
    try {
      let mappedVals = location.state.topics.map(topic => {
        return topic.value;
      })
      setLoadingQuestions(true);
      let res = await axios.get(BASELINE + "questions", { params: { subject: location.state.subject, difficulty: location.state.difficulty, topics: mappedVals, limit: location.state.questionLimit } });
      
      if (res.data.length < 1) {
        toast.error("Questions With these topics not found. Try other topics for now by going back")
      } else {
        start();
      }
      let mappedQuestions = res.data.map((question, idx) => {
        return { ...question, index: idx, answered: false, bookMarked: false, crossedOutOptions: [], selectedOption: null };
      })
      setQuestions(mappedQuestions);
      setCurrentQuestion(mappedQuestions[0]);
      setLoadingQuestions(false);


    } catch (err) {
      setLoadingQuestions(false);
      toast.error(err.message);
      setError(err.message)
    }
  }

  async function handleNext() {
    if (currentQuestion.index < questions[questions.length - 1].index) {
      setCurrentQuestion((pre) => questions[pre.index + 1])
    } else {
      setCurrentQuestion(null);
      setQuestionOverviewOpen(false);
    }
  }
  async function handleBack() {
    if (!currentQuestion) {
      setCurrentQuestion(questions[questions.length - 1]);
      return;
    }
    if (currentQuestion.index > 0) {
      setCurrentQuestion((pre) => questions[pre.index - 1])
    } else {

    }
  }
  const closeRefModal = () => {
    setShowDirectionRefModal(false);
  };

  const closeModal = () => {
    setShowDirectionModal(false);
  };

  return (
    <div className="flex flex-col bg-white p-1 relative pt-[120px]">
      {loadingQuestions? 
      <div className="flex flex-row justify-center items-center py-48">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-52 w-52"></div>
      </div>
     :
    <>
      <div className="flex flex-row justify-between">
        <div>
          <div>
            <h4>
              Section 2, Module 1: Math
            </h4>
          </div>
          <motion.div whileTap={{scale:0.97}} className="flex flex-row gap-1 hover:text-blue-900">
            <div>
              <button onClick={() => setShowDirectionModal((pre)=> !pre)}>Tips</button>
            </div>
            <div onClick={() => setShowDirectionModal(true)} className="flex flex-row items-center  cursor-pointer">
              <BsChevronDown />
            </div>
          </motion.div>
          {showDirectionModal && <DirectionModal onClose={closeModal} />}
        </div>
        <div>
          <Timer minutes={minutes} seconds={seconds} />
        </div>
        <div className="flex flex-row gap-2">
        <motion.button whileTap={{scale:0.97}} onClick={() => setShowCalculator(pre => !pre)} className={`flex flex-col items-center cursor-pointer hover:text-blue-900 ${showCalculator? "text-blue-900": "text-black"}`}>
                <div  className={`flex flex-row justify-center`}>
                    <CiCalculator1 size="1.5em" />
                </div>
                <div>
                     <p className="text-sm">Calculator</p>
                </div>
              </motion.button>
          <motion.button whileTap={{scale:0.97}} className={`flex flex-col items-center cursor-pointer hover:text-blue-900 ${showReference === true? 'text-blue-900': "text-black"} `} onClick={() => setShowDirectionRefModal(true)}>
                    <div className="flex flex-row justify-center">
                        <VscReferences size="1.5em" />
                    </div>
                    <div>
                        <p className="text-sm">Reference</p>
                    </div>
              </motion.button>
          {showDirectionModalRef && <ReferenceSheet onClose={closeRefModal} />}


          <div className="hidden flex flex-col cursor-pointer hover:text-blue-900">
            <div className="flex flex-row justify-center">
              <BsThreeDotsVertical size="1.5em" />
            </div>
            <div>
              <p className="text-sm">More</p>
            </div>
          </div>

        </div>
      </div>
           
      <div className="py-4">
        <motion.div drag style={{
          width: '600px',
          height: '400px',
          position: 'absolute',
          zIndex: 100,
          display: showCalculator ? "inline" : "none",
        }}
          dragConstraints={{
            top: -125,
            right: 500,
            bottom: 300,
            left: -125,
          }}
        >
          <div id="calculator" className="w-full h-full">

          </div>

        </motion.div>
        {/* question */}
        <div className="flex flex-col">
          <div className="flex flex-row justify-center items-center min-h-[38rem]">
            {currentQuestion ? <Question handleAnswerValueChange={handleAnswerValueChange} handleCrossOutOptions={handleCrossOutOptions} handleSelectOption={handleSelectOption} currentQuestion={currentQuestion} idx={1} bookmarkedQuestions={bookmarkedQuestions} setBookMarkedQuestions={setBookMarkedQuestions} handleBookMark={handleBookMark} /> : <Review currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} questions={questions} setQuestions={setQuestions} />}
          </div>
        </div>

      </div>
      <div className="flex flex-row justify-around  border-t-2 border-black pt-4 relative">
      {questionOverViewOpen && 
          <motion.div
          initial={{opacity:0, scale:0.5}}
          animate={{opacity:1, scale:1}}
           transition={{
            type: "spring",
          }} className="absolute z-[3000] rounded-md  flex flex-row justify-center p-1 bg-white -top-40 border-[1px] border-gray-300">
            <div className="min-h-[140px] max-h-[140px] min-w-[200px] max-w-[400px] flex flex-row flex-wrap rounded-md">
                {questions.map((ques, idx)=> {
                  return <div  key={'questions-'+idx} onClick={()=> setCurrentQuestion(questions[idx])} className={`${ques.bookMarked && 'bg-red-500 border-none text-white'} m-1 rounded-full border-[1px] border-black w-[25px] h-[25px] flex flex-row justify-center items-center cursor-pointer ${currentQuestion?.item_id === ques?.item_id && "bg-black text-white"}`}>{idx+1}</div>
                })}
            </div>  
          </motion.div>
          }
        <div className="flex flex-row items-center">
          <p className="font-semibold text-lg">{(user?.first_name + " " + user?.last_name) || "John Doe"}</p>
        </div>
        {currentQuestion &&
            <motion.button whileTap={{scale:0.97}} onClick={()=> setQuestionOverviewOpen(pre=> !pre)} className="flex flex-row items-center gap-1 bg-black hover:bg-gray-800 text-white rounded-md p-2 cursor-pointer">
            <div className="flex flex-row items-center">
               <p>Question {currentQuestion?.index+1} of {questions?.length}</p>
            </div>
            <div className="flex flex-row items-center">
              {questionOverViewOpen? <BsChevronDown/>:
                <BsChevronUp />
              }
            </div>
          </motion.button>
        }
            <div className="flex flex-row items-center gap-2">
              <motion.button  whileTap={{scale:0.97}} className="py-2 px-5 bg-blue-700 rounded-3xl text-white hover:bg-blue-800" onClick={()=> handleBack()}>
                Back
              </motion.button>
              {currentQuestion? 
              <motion.button  whileTap={{scale:0.97}} className="py-2 px-5 bg-blue-700 rounded-3xl text-white hover:bg-blue-800" onClick={()=> handleNext()}>
                Next
              </motion.button>
              :
                <motion.button whileTap={{scale:0.97}} className="py-2 px-5 bg-blue-700 rounded-3xl text-white hover:bg-blue-800" onClick={()=> handleSubmit()}>
                Submit
               </motion.button>
               }

            </div>
      </div>
      </>
      }
    </div>
  );
};
export default Quiz;