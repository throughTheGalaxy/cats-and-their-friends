import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./CreateItemScreen.module.scss"; 

const CreateItemScreen = () => {
  const [state, setState] = useState({}); 
  const [status, setStatus] = useState("initial"); 
  const navigate = useNavigate(); 

  const onSubmit = async (event) => {
    event.preventDefault(); 

    const response = await fetch("http://localhost:3002/newitem", {
      method: "POST",
      headers: {
        "Content-type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(state),
    }); 

    const data = await response.json(); 

    setStatus(data.status); 

    navigate(`/product/${data.id}`); 
  };

  const setDataInput = (event) => {
    const text =
      event.target.name === "sizes" || event.target.name === "types"
        ? event.target.value.split(",")
        : event.target.value;
    setState({
      ...state,
      [event?.target?.name]: text,
    });
    
  };

  return (
    <div className={styles.CreateItemScreen}>
      <form className={styles.CreateItemScreen__form} onSubmit={onSubmit}>
        <h1 className={styles.CreateItemScreen__title}>Add product</h1>
        <input
          type="text"
          name="name"
          onChange={setDataInput}
          required
          placeholder="name"
          className={styles.CreateItemScreen__input}
        />
        <input
          type="text"
          name="imageUrl"
          onChange={setDataInput}
          required
          placeholder="imageurl"
          className={styles.CreateItemScreen__input}
        />
        <input
          type="text"
          name="price"
          onChange={setDataInput}
          required
          placeholder="price"
          className={styles.CreateItemScreen__input}
        />
        <input
          type="text"
          name="rating"
          onChange={setDataInput}
          required
          placeholder="rating"
          className={styles.CreateItemScreen__input}
        />
        <input
          type="text"
          name="category"
          onChange={setDataInput}
          required
          placeholder="category"
          className={styles.CreateItemScreen__input}
        />
        <input
          type="text"
          name="sizes"
          onChange={setDataInput}
          required
          placeholder="sizes"
          className={styles.CreateItemScreen__input}
        />
        <input
          type="text"
          name="types"
          onChange={setDataInput}
          required
          placeholder="types"
          className={styles.CreateItemScreen__input}
        />
        <button className={styles.CreateItemScreen__button} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateItemScreen;
