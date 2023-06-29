import React from "react";

const Timer = ({seconds,minutes}) => {
    return(
        <div>
            <p className="font-semibold text-lg">{minutes} : {seconds}</p>
        </div>
    )
}
export default Timer;