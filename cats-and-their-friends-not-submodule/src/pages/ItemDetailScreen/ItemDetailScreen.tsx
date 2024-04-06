import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { LastLocationContext } from "../../context/location";
import styles from "./ItemDetailScreen.module.scss"; 
import "../../scss/app.scss"; 
import { useRole } from "../../hooks/useRole";
import { IItem } from "../../types";

const ItemDetailScreen = () => {
  const lastLocation = useContext(LastLocationContext); 
  const navigate = useNavigate(); 
  const { id } = useParams(); 
  const [state, setState] = useState<IItem>({
    id: "",
    category: "",
    name: "",
    types: [],
    sizes: [],
    imageUrl: "",
    price: 0,
    rating: 0,
  }); 
  const typeNames: string[] = ["placard", "picture"];

  const { isAdmin } = useRole(); 

  useEffect(() => {
    const fetching = async () => {
      const response = await fetch(`http://localhost:3002/items/${id}`); 

      const data = (await response.json()) as IItem; 

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
        All products
      </Link>

      {isAdmin && (
        <button
          className={styles.ItemDetailScreen__button}
          onClick={deleteProduct}
        >
          Delete
        </button>
      )}
      {lastLocation === "addnewproduct" && (
        <Link to="/">Cancel and return</Link>
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
            <li>{typeNames[+typeId]}</li>
          ))}
        </ul>
        <ul className={styles.ItemDetailScreen__sizes}>
          {state?.sizes?.map((size) => (
            <li>{size} cm </li>
          ))}
        </ul>
        <p className={styles.ItemDetailScreen__price}>ab {state?.price} €</p>
      </div>
    </div>
  );
};

export default ItemDetailScreen;
