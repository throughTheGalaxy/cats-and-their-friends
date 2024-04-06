import { useEffect, useState } from "react";
import type { IItem } from "../types";

export const useItems = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [status, setStatus] = useState<
    "initial" | "loading" | "success" | "error"
  >("initial"); // "initial" | "loading" | "success" | "error"
  const [error, setError] = useState<any | null>(null); // null | error
  const [reload, setReload] = useState<boolean>(false); // true | false

  const fetchingData = async () => {
    const response = await fetch("http://localhost:3002/items");

    const data = await response.json();

    return data as IItem[];
  };

  const refresh = async () => {
    setReload(!reload);
  };

  useEffect(() => {
    let ignore: boolean = false;

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
