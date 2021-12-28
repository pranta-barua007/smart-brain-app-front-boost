import React from "react";
import "./Spinner.css";

const Spinner = ({ subText = 'Loading ...' }) => {
    return (
        <div className="loader-container">
            <h1>{subText}</h1>
            <div className="loader"></div>
        </div>
    )
}

export default Spinner;