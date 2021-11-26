import React from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Footer from "../../Footer";
import ReactPlayer from "react-player/youtube";
import "./style.css";
import Nav from "../../Nav";
const Honorable = () => {
  let name = useParams().name;
  const [character, setCharacter] = useState([]);

  const getCharacter = async () => {
    const item = await axios.get(
      `http://localhost:5000/character/name/${name}`
    );
    setCharacter(item.data);
    console.log(character);
  };
  useEffect(() => {
    getCharacter();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="baackChar2">
      <Nav />
      {character.map((item, i) => {
        return (
          <div key={i} className="container">
            <h1 className="nameCharacterInfo">{item.name}</h1>

            <img src={item.gif} alt="gif dante" className="gif" />
            <img src={item.img} alt="character face" className="photo" />
            <h1 className="name">{item.name}</h1>
            <ReactPlayer url={item.video} className="video" />
          </div>
        );
      })}
      <Footer />
    </div>
  );
};

export default Honorable;
