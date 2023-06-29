import { useEffect, useState, useContext } from "react";
import Study from "../home/Study";
import Hero from "./Hero";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASELINE } from "../../util";
import { UserContext } from "../../context/UserContext";

const Result = () => {
  const {user} = useContext(UserContext);
  const [testData, setTestData] = useState({});
  const [error, setError] = useState("");

  const params = useParams();
//  console.log(params.id);
  useEffect(()=> {
      getTestData(params.id);
  }, [params.id])
  async function getTestData(id){
    try{
      let res = await axios.get(BASELINE+"tests/"+id);
 //     console.log(res);
      setTestData(res.data);
    }catch(err){
       setError(err.message)
    }
  }
  return (
    <>
      <Hero testData={testData} />
      <Study />
    </>
  );
};

export default Result;
