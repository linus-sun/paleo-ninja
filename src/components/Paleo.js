import React, { useState, useEffect } from "react";

const axios = require("axios");
const DINO_API_URL = "https://paleobiodb.org/data1.2/taxa/single.json?id="
const FORTNITE_API_URL = "https://fortnite-api.com/v1/stats/br/v2/?name="

const Paleo = (props) => {
    const [dino, setDino] = useState("none yet");
    const [name, setName] = useState("none yet");
    const [entry, setEntry] = useState("");
    const [nameRep, setNameRep] = useState("none yet");
    var wins = 0

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
        var dinoName = ""
        var dinoStatus = ""
        var playerStatus = 404
        var playerName = ""
        axios.get(name).then((newName) => {
            console.log(newName.data);
            console.log(newName.data.data.stats.all.overall.wins);
            wins = newName.data.data.stats.all.overall.wins;
            playerName = newName.data.data.account.name;
            playerStatus = newName.status
        });
        setTimeout(function () {
            console.log(playerStatus);
            if (playerStatus === 200) {
            axios.get(DINO_API_URL + wins + "&show=class,ecospace,ttaph,etbasis,attr").then((newerDino) => {
                console.log(wins);
                dinoName = newerDino.data.records[0].nam;
                dinoStatus = newerDino.data.records[0].jdt;
                if (dinoStatus === undefined) {
                    setNameRep(playerName + " has won " + wins + " games! They win so much, you could call them a " + dinoName + "! We don't know that dinosaur's eating habits!");
                } else {
                    setNameRep(playerName + " has won " + wins + " games! They win so much, you could call them a " + dinoName + "! A real " + dinoStatus + "!");
                }
            })
        } else {
            setNameRep("That player isn't in our records! They could be an invisible dinosaur!")
        }
        }, 2000);
        event.preventDefault();
    }

    const handleChange = (e) => {
        var newName = e.target.value
        console.log(newName);
        setName(FORTNITE_API_URL + e.target.value);
        setEntry(e.target.value);
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
                <label>
                    Name:
          <input type="text" value={entry} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>


    );
}










export default Paleo;