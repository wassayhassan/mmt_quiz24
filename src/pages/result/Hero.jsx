import { useEffect, useState, useContext } from "react";
import { BASELINE } from "../../util";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const Hero = ({testData}) => {
  const {user} = useContext(UserContext);
  const [percentage, setPercentage] = useState(0);
  const [date , setDate] = useState();
  const [missingTopics, setMissingTopics] = useState([]);
  useEffect(()=> {
    let per = Math.round((testData?.result?.obtained_marks/testData?.result?.total_marks) * 100);
     setPercentage(per);
     let dat = new Date(testData?.createdAt).toDateString()
    // console.log(dat);
    // console.log(testData?.createdAt);
     setDate(dat);
     getSimilarTopics();
  }, [testData])
  
  async function getSimilarTopics(){
    try{
      let questionIds = testData.questions.map((question)=> {
        return question.item_id;
      })
      let res = await axios.get(BASELINE+"topics", {params: {similar: true, itemIds: questionIds}});
    //  console.log(res.data);
      setMissingTopics(res.data);
    }catch(err){
    //  console.log(err);
    }

  }

  return (
    <div className="flex mt-4 justify-center items-center flex-col w-full h-full pt-[120px]">
      <div className="w-[90%]  max-w-[1000px] 2xl:max-w-[1300px] flex justify-start items-start flex-col gap-5  px-5 bg-[#EBEBEB] rounded-2xl py-4">
        <h3 className="text-black font-normal text-sm">Math Topic Test</h3>
        <h2 className="text-black text-[30px] sm:text-[48px] font-normal w-full border-b-[3px] mt-3 lg:pl-7 leading-[1.2] pb-5 border-solid border-[#C0C0C0]">
          Total Score <br /> {date}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:px-7 w-full gap-5 mt-3">
          <p className="text-black text-[60px] font-normal">
            {percentage}%{" "}
            <span className="text-lg font-normal text-[#9e9e9e]">
              | {testData?.result?.obtained_marks} out of {testData?.result?.total_marks}
            </span>
            <br />
            <span className="text-[30px]">Duration: </span>
            <br />
            <span className="text-[35px]">{testData.timeframe}</span>
          </p>
          
          <div className="flex gap-1 justify-start items-start flex-col lg:justify-self-end">

            <h3 className="text-black mb-2 text-[30px] sm:text-[48px] font-normal">
              Topic Missing
            </h3>
            <div className="flex justify-start items-start flex-col gap-1 max-h-[200px] w-full overflow-y-auto">

           {missingTopics.map((topic)=> {
                return (
                  <button className="text-[#909090] text-[22px] hover:text-black outline-none focus:text-black font-normal transition-all">
                     {topic.name}
                </button>
                )
            })} 
            
            </div>
          </div>
        </div>
        <h3 className="text-black font-normal text-sm mt-8">{user.first_name + " " + user.last_name}</h3>
      </div>
    </div>
  );
};

export default Hero;
