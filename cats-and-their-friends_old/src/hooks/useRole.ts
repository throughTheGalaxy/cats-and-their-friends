import { useEffect, useState } from "react";

export const useRole = () => {
  const [isAdmin, setRole] = useState<boolean>(false); // if admin status

  const fetchRole = async (token: string) => {
    const response = await fetch(`http://localhost:3002/role/${token}`);

    const data = await response.json();

    return data.isAdmin as boolean;
  }; // запрос

  useEffect(() => {
    let ignore: boolean = false;

    const fetching = async () => {
      const token = JSON.parse(localStorage.getItem("token") as string)?.token; // receiving of the token

      token && setRole(await fetchRole(token)); // determinate the role
    };

    !ignore && fetching();

    return () => {
      ignore = true;
    };
  }, []);

  return { isAdmin };
};
