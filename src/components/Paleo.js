import React, { useState, useEffect } from "react";

const axios = require("axios");
const DINO_API_URL = "https://paleobiodb.org/data1.2/taxa/single.json?id="
const FORTNITE_API_URL = "https://fortnite-api.com/v1/stats/br/v2/?name="

const Paleo = (props) => {
    const [dino, setDino] = useState("none yet");
    const [name, setName] = useState("none yet");
    const [nameRep, setNameRep] = useState("none yet");

    const handleClick = () => {
        setDino("dinosaur");
    }

    const getDino = () => {
        var randomDino = Math.floor(100 + Math.random() * (600 - 100))
        axios.get(DINO_API_URL + randomDino + "&show=attr").then((newDino) => {
            console.log(newDino.data.records[0].nam);
            setDino("you discovered the " + newDino.data.records[0].nam);
        });
    }

    const handleSubmit = (event) => {
        var randomDino = Math.floor(100 + Math.random() * (600 - 100)) 
        var dinoName = ""
        axios.get(DINO_API_URL + randomDino + "&show=attr").then((newDino) => {
            dinoName = newDino.data.records[0].nam;
        });
        axios.get(name).then((newName) => {
            console.log(newName.data);
            setNameRep(newName.data.data.account.name + " has outlived more than " + newName.data.data.stats.all.overall.playersOutlived + " " + dinoName + "s!");
        })
        event.preventDefault();
    }

    const handleChange = (e) => {
        var newName = e.target.value
        console.log(newName);
        setName(FORTNITE_API_URL + e.target.value);
    }

    useEffect(() => {
        console.log("mounted paleo");
    });

    return (
        <div>
            <h2>dinosaur finder</h2>
            <p>{dino}</p>
            <button onClick={getDino}>dionsauwr</button>
            <p>{nameRep}</p>
            <form onSubmit={handleSubmit}>
                <label for="cars">Choose a car:</label>
                <select name="cars" id="cars" onChange = {handleChange}> 
                    <option value="Tfue">Tfue</option>
                    <option value="Pzuhs">Pzuhs</option>
                    <option value="Ninja">Ninja</option>
                    <option value="unsolstice">unsolstice</option>
                </select>
                <input type="submit" value="Submit" />
            </form>
        </div>


    );
}










export default Paleo;