import React, { useState, useEffect } from "react";

const axios = require("axios");
const API_URL = "https://paleobiodb.org/data1.2/taxa/single.json?name="

const Paleo = (props) => {
    const [dino, setDino] = useState("none yet");

    const handleClick = () => {
        setDino("dinosaur");
    }

    const getDino = () => {
        axios.get(API_URL + "Ornithischia&show=attr").then((newDino) => {
            console.log(newDino);
            console.log(newDino.data.records[0].nam);
            setDino(newDino.data.records[0].nam);
        });
    }

    useEffect(() => {
        console.log("mounted paleo");
    });

    return (
        <div>
                <h2>MY CMPOTNEPOSTNPOESTNIPOUjofai</h2>
                <p>{dino}</p>
                <button onClick={getDino}>dionsauwr</button>
                </div>
    );
}








export default Paleo;