import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import styles from "./EditItemDetailScreen.module.scss";

const EditItemDetailScreen = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const [state, setState] = useState({}); 
  const [info, setInfo] = useState({}); 
  const [isEdit, setIsEdit] = useState(false); 

  useEffect(() => {
    const fetching = async () => {
      const response = await fetch(`http://localhost:3002/items/${id}`); 

      const data = await response.json(); 

      setState(await data); 
      setInfo(await data); 
    };

    fetching();
  }, []);

  const onSubmit = async (event) => {
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

  const setDataInput = (event) => {
    console.log(event.target.value);
    setState({
      ...state,
      [event?.target?.name]: event?.target?.value,
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
            Cancel and return to the "ItemDetailScreen" without changing the item
          </button>
          <button
            className={styles.EditItemDetailScreen__savebutton}
            type="submit"
          >
            Update product data
          </button>
        </form>
      )}
    </div>
  );
};

export default EditItemDetailScreen;
