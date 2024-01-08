import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { LastLocationContext } from "../../context/location";
import styles from "./ItemDetailScreen.module.scss"; 
import "../../scss/app.scss"; 

const ItemDetailScreen = () => {
  const lastLocation = useContext(LastLocationContext); 
  const navigate = useNavigate(); 
  const { id } = useParams(); // id vom gegenwärtigen Produkt
  const [state, setState] = useState({}); // Daten
  const typeNames = ["placard", "picture"];

  useEffect(() => {
    const fetching = async () => {
      const response = await fetch(`http://localhost:3002/items/${id}`); // Request

      const data = await response.json(); // server's response

      setState(await data); 
    };

    fetching(); 
  }, []);

  const deleteProduct = async () => {
    await fetch(`http://localhost:3002/items/${id}`, {
      method: "DELETE",
    }); 

    navigate("/"); 
  };

  return (
    <div className={styles.ItemDetailScreen}>
      <Link to="/" className={styles.ItemDetailScreen__all}>
        All pictures
      </Link>

      <button
        className={styles.ItemDetailScreen__button}
        onClick={deleteProduct}
      >
        Delete
      </button>
      {lastLocation === "addnewproduct" && (
        <Link to="/">Cancel and return to the screen of all items</Link>
      )}

      <div className={styles.ItemDetailScreen__wrap}>
        <img
          className={styles.ItemDetailScreen__img}
          src={state?.imageUrl}
          alt=""
        />
        <h4 className={styles.ItemDetailScreen__title}>{state?.name}</h4>
        <ul className={styles.ItemDetailScreen__types}>
          {state?.types?.map((typeId) => (
            <li>{typeNames[typeId]}</li>
          ))}
        </ul>
        <ul className={styles.ItemDetailScreen__sizes}>
          {state?.sizes?.map((size) => (
            <li>{size} sm </li>
          ))}
        </ul>
        <p className={styles.ItemDetailScreen__price}>ab {state?.price} €</p>
      </div>
    </div>
  );
};

export default ItemDetailScreen;
