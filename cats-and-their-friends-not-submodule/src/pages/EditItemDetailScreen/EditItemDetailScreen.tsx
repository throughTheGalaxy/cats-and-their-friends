import { useParams, useNavigate } from "react-router";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import styles from "./EditItemDetailScreen.module.scss"; 
import { IItem } from "../../types";

const EditItemDetailScreen = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const [state, setState] = useState({
    imageUrl: "",
    name: "",
    price: 0,
  }); 
  const [info, setInfo] = useState<Pick<IItem, "name" | "imageUrl" | "price">>({
    name: "",
    imageUrl: "",
    price: 0,
  }); 
  const [isEdit, setIsEdit] = useState<boolean>(false); 

  const token = JSON.parse(localStorage.getItem("token") as string)?.token;

  useEffect(() => {
    const fetching = async () => {
      const response = await fetch(`http://localhost:3002/items/${id}`); 

      const data = (await response.json()) as IItem; 

      setState(await data); 
      setInfo(await data); 
    };

    fetching();
  }, []);


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

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault(); 

    await fetch(`http://localhost:3002/items/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json;chraset=utf-8",
      },
      body: JSON.stringify(state),
    });

    setInfo(state); 

    toggleIsEdit(); 
  };

  const setDataInput = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    setState({
      ...state,
      [target?.name]: target?.value,
    }); 
  };

  const toggleIsEdit = () => setIsEdit(!isEdit); 

  const cancelChangeData = () => {
    toggleIsEdit(); 

    setState(info); 
  };

  return (
    <div className={styles.EditItemDetailScreen}>
      {/* {JSON.stringify(info)} */}
      {!isEdit && (
        <button
          className={styles.EditItemDetailScreen__editbutton}
          onClick={toggleIsEdit}
        >
          Edit
        </button>
      )}
      {isEdit && (
        <form className={styles.EditItemDetailScreen__form} onSubmit={onSubmit}>
          <input
            type="text"
            name="imageUrl"
            value={state.imageUrl}
            onChange={(event) => setDataInput(event)}
            placeholder="imageurl"
            className={styles.EditItemDetailScreen__input}
          />
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={(event) => setDataInput(event)}
            placeholder="name"
            className={styles.EditItemDetailScreen__input}
          />
          <input
            type="text"
            name="price"
            value={state.price}
            onChange={(event) => setDataInput(event)}
            placeholder="price"
            className={styles.EditItemDetailScreen__input}
          />
          <button
            className={styles.EditItemDetailScreen__cancelbutton}
            onClick={cancelChangeData}
          >
            Cancel und return to ItemDetailScreen without changes
          </button>
          <button
            className={styles.EditItemDetailScreen__savebutton}
            type="submit"
          >
            Refresh data
          </button>
        </form>
      )}
    </div>
  );
};

export default EditItemDetailScreen;
