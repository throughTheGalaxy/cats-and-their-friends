import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router";
import styles from "./CreateItemScreen.module.scss"; 
import { IItem } from "../../types";

const CreateItemScreen = () => {
  const [state, setState] = useState<Omit<IItem, "id">>({
    name: "",
    rating: 0,
    types: [],
    sizes: [],
    imageUrl: "",
    category: "",
    price: 0,
  }); // post data
  const [status, setStatus] = useState<
    "initial" | "loading" | "success" | "error"
  >("initial"); // status
  const navigate = useNavigate(); // to go to another page

  const token = JSON.parse(localStorage.getItem("token") as string)?.token;

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault(); // cancel the reload

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

  useEffect(() => {
    let ignore: boolean = false;

    const work = async () => {
      const fetchRole = async (token: string) => {
        const response = await fetch(`http://localhost:3002/role/${token}`);

        const data = await response.json();

        return data.isAdmin as boolean;
      };

      if (!token || !(token && (await fetchRole(token)))) navigate("/");
    };

    !ignore && work();

    return () => {
      ignore = false;
    };
  }, []);

  const setDataInput = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;

    const text =
      target.name === "sizes" || target.name === "types"
        ? target.value.split(",")
        : target.value;
    setState({
      ...state,
      [target?.name]: text,
    });

  };

  return (
    <div className={styles.CreateItemScreen}>
      <form className={styles.CreateItemScreen__form} onSubmit={onSubmit}>
        <h1 className={styles.CreateItemScreen__title}>Create product</h1>
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
