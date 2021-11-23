import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router";
import Nav from "../../Nav";
const Honorables = () => {
  const navigate = useNavigate();
  const [honorable, setHonorable] = useState([]);
  const [resSearch, setResSearch] = useState("");
  const [local, setLocal] = useState("");
  // const [loading, setLoading] = useState(true);
  useEffect(() => {
    getHonorable();
    // eslint-disable-next-line
  }, []);

  const getLocalStorage = async () => {
    const item = await JSON.parse(localStorage.getItem("newUser"));
    setLocal(item);
    console.log(local);
  };

  useEffect(() => {
    getLocalStorage();
  }, []);

  // get all data
  const getHonorable = async () => {
    try {
      const items = await axios.get(
        "http://localhost:5000/character/honorbale"
      );
      setHonorable(items.data);
      // setLoading(false);
    } catch (error) {
      console.log("error on get honorable", error);
    }
  };

  // e.preventDefault()

  // get character info
  const characterInfo = (name) => {
    navigate(`/character/name/${name}`);
  };

  const addToFav = (name) => {
    axios.put(`http://localhost:5000/user/fav/${local.email}/${name}`);
  };

  const removeFromFav = (name) => {
    console.log(name);
    axios.put(`http://localhost:5000/user/removeFav/${local.email}/${name}`);

  };
  return (
    <div>
      <Nav />

      <h1>Honorable</h1>

      <input
        type="text"
        name="search"
        onChange={(e) => {
          setResSearch(e.target.value);
        }}
      />
      {honorable
        // eslint-disable-next-line
        .filter((item) => {
          if (resSearch === "") {
            return item;
          } else if (
            item.name.toLowerCase().includes(resSearch.toLowerCase())
          ) {
            return item;
          }
        })
        .map((items, index) => {
          return (
            <div key={index}>
              <ul>
                <li onClick={() => characterInfo(items.name)}>
                  <img
                    className="imageCharacter"
                    src={items.img}
                    alt="character face"
                  />
                  <h1>{items.name}</h1>
                </li>{" "}
                <button onClick={() => addToFav(items.name)}>Favorite</button>
                <button onClick={() => removeFromFav(items.name)}>
                  Remove
                </button>
              </ul>
            </div>
          );
        })}
    </div>
  );
};

export default Honorables;

// search bar
// const search = (e) => {
//   // let res = e.target.value;
//   honorable.filter((item) => {
//     console.log(e.target.value);
//     console.log(item.name);
//     return item.name.includes(e.target.value);
//   });
// };
