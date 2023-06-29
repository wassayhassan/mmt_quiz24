const Review = ({questions, setCurrentQuestion}) => {
    return (
        <div>
            <h2 className="font-semibold my-4 text-2xl">Review</h2>
            <div className="min-h-[150px] max-h-[150px] min-w-[200px] max-w-[600px] flex flex-row flex-wrap rounded-md gap-6">
                {questions.map((ques, idx)=> {
                  return (
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-row justify-center">
                           <button onClick={()=> setCurrentQuestion(questions[idx])} className={`${ques.bookMarked && 'bg-red-500 text-white border-none'} m-1 rounded-xl border-[1px] border-black w-[40px] h-[40px] flex flex-row justify-center items-center cursor-pointer}`}>{idx+1}</button>
                        </div>
                        <div>
                            <p className="font-semibold text-sm">Selected Option:</p>
                            <div className="flex flex-row justify-center">
                               <p>{ques.selectedOption || "none"}</p>
                            </div>
                        </div>
                    </div>
                  )
                  
                })} 
            </div>
        </div>
    )
}
export default Review