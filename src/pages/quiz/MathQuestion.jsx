import React, { useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import {ImSpellCheck} from "react-icons/im";
import { motion } from "framer-motion";

const Question = ({handleAnswerValueChange,handleCrossOutOptions,handleSelectOption, handleBookMark, currentQuestion}) => {
    const [showCrossOutMenu, setShowCrossOutMenu] = useState(false);
    const [crossedOutOptions, setCrossedOutOptions] = useState([]);
    return (
        <div className="min-w-[30rem] max-w-[30rem] z-[10]">
            {/* header starts */}
           <div className="flex flex-row justify-between bg-gray-100">
                <div className="flex flex-row gap-2">
                    <div className=" flex flex-row items-center">
                        <p className="py-2 px-3 bg-black text-white">{currentQuestion.index+1}</p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <motion.div whileTap={{scale:0.97}} onClick={()=> handleBookMark(currentQuestion.item_id)} className="m-1 cursor-pointer">
                            
                           {currentQuestion.bookMarked ? <BsBookmarkFill color="red" size="1.2rem" />:   <BsBookmark size="1.2rem"   /> }
                        </motion.div>
                        <div>
                            <p>Mark For Review</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center">
                    <motion.div whileTap={{scale:0.98}} className={`p-[5px] border-black border-[1px] rounded-md cursor-pointer ${showCrossOutMenu && "bg-blue-700 text-white"}`} onClick={()=> setShowCrossOutMenu(pre=> !pre)}>
                       <ImSpellCheck />
                    </motion.div>
                </div>
           </div>
              {/* header ends */}
              {/* question starts */}
              <div >
                <div dangerouslySetInnerHTML={{ __html: currentQuestion.prompt } }/>
                <div dangerouslySetInnerHTML={{ __html: currentQuestion.body }} className="flex flex-row justify-center"/>
              </div>
               {/* question ends */}
               {/* answer options start */}
              <div className="my-2">
                {currentQuestion.style === "Multiple Choice" ? 
                <>
                <Option handleCrossOutOptions={handleCrossOutOptions} currentQuestion = {currentQuestion} handleSelectOption={handleSelectOption} idx={0} showCrossOutMenu={showCrossOutMenu} crossedOutOptions={crossedOutOptions} data={currentQuestion.a} />
                <Option handleCrossOutOptions={handleCrossOutOptions} currentQuestion = {currentQuestion} handleSelectOption={handleSelectOption} idx={1} showCrossOutMenu={showCrossOutMenu} crossedOutOptions={crossedOutOptions} data={currentQuestion.b} />
                <Option handleCrossOutOptions={handleCrossOutOptions} currentQuestion = {currentQuestion} handleSelectOption={handleSelectOption} idx={2} showCrossOutMenu={showCrossOutMenu} crossedOutOptions={crossedOutOptions} data={currentQuestion.c} />
                <Option handleCrossOutOptions={handleCrossOutOptions} currentQuestion = {currentQuestion}  handleSelectOption={handleSelectOption} idx={3} showCrossOutMenu={showCrossOutMenu} crossedOutOptions={crossedOutOptions} data={currentQuestion.d} />
                </> : <input className="w-[90%] border-[1px] py-1 px-2 border-gray-300 outline-none rounded-md" type="text" value={currentQuestion.selectedOption || ""} onChange={(e)=> handleAnswerValueChange(currentQuestion.item_id, e.target.value)} />
                }

              </div>
                {/* answer options ends */}
        </div>
    )
}
export default Question;


const Option = ({handleCrossOutOptions, currentQuestion, idx, handleSelectOption,showCrossOutMenu, crossedOutOptions, data}) => {
    return (
        <div className="flex flex-row gap-1">
        <motion.div whileTap={{scale:0.98}} className={`flex flex-row w-full ${currentQuestion.selectedOption === getOptionLetter(idx).toLowerCase()? "border-[2px]": "border-[1px]"} rounded-md ${currentQuestion.selectedOption === getOptionLetter(idx).toLowerCase()? "border-blue-700 bg-blue-100": "border-black"} gap-2 p-1 m-3 cursor-pointer relative ${currentQuestion.crossedOutOptions.includes(getOptionLetter(idx).toLowerCase()) && "before:absolute before:bg-black before:w-[103%] before:h-[2px] before:top-[50%] before:-left-[6px]"}`} onClick={()=> handleSelectOption(currentQuestion.item_id, getOptionLetter(idx).toLowerCase())}>
            <div className="flex flex-row items-center">
               <p className="flex flex-row items-center justify-center p-1 w-6 h-6 border-[1px] border-black rounded-full">
                {getOptionLetter(idx)}
                </p>
            </div>
            <div className="flex flex-row items-center p-[2px]" dangerouslySetInnerHTML={{ __html: data }}>
            </div> 
        </motion.div>
        {showCrossOutMenu && 
        <motion.div className="flex flex-row items-center" whileTap={{scale:0.97}}>
           <div className="relative">
           {currentQuestion.crossedOutOptions.includes(getOptionLetter(idx).toLowerCase())?
             (<p className="cursor-pointer underline" onClick={()=> handleCrossOutOptions(currentQuestion.item_id, getOptionLetter(idx).toLowerCase())}>Undo</p> ):
           
             <>
             <p onClick={()=> handleCrossOutOptions(currentQuestion.item_id, getOptionLetter(idx).toLowerCase())} className="flex flex-row items-center justify-center p-1 w-6 h-6 border-[1px] border-black rounded-full cursor-pointer"> 
             {getOptionLetter(idx)}
             </p>
             <div className="absolute w-6 h-[1.5px] bg-black top-3 cursor-pointer" onClick={()=> handleCrossOutOptions(currentQuestion.item_id, getOptionLetter(idx).toLowerCase())}>
             </div>
             </>

           }

            
           </div>

        </motion.div>
        }
        </div>
    )
}

function getOptionLetter(idx){
   switch(idx){
    case 0:
        return 'A'
        break;
        case 1:
        return 'B'
        break;
        case 2:
        return 'C'
        break;
        case 3:
        return 'D'
        break;
        default: 
        return "A"
   }
}