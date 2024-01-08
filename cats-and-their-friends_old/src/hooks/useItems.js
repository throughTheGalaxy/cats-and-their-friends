import { useEffect, useState } from "react";

export const useItems = () => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("initial"); // "initial" | "loading" | "success" | "error"
  const [error, setError] = useState(null); // null | error
  const [reload, setReload] = useState(false); // true | false

  const fetchingData = async () => {
    const response = await fetch("http://localhost:3002/items");

    const data = await response.json();

    return data;
  };

  const refresh = async () => {
    setReload(!reload);
  };

  useEffect(() => {
    let ignore = false;

    const fetching = async () => {
      try {
        setStatus("loading");
        setItems(await fetchingData());
        setStatus("success");
      } catch (err) {
        setError(err);
        setStatus("error");
      }
    };

    !ignore && fetching();

    return () => {
      ignore = true;
    };
  }, [reload]);

  return [items, refresh, status, error];
};
