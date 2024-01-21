import React from "react";

import Categories from "../components/Categories";

import Sort from "../components/Sort";

import Header from "../components/Header";

import PictureBlock from "../components/PictureBlock";

import { useItems } from "../hooks/useItems";
import { Link } from "react-router-dom";
import { useRole } from "../hooks/useRole";
import { useState } from "react";

import "../scss/app.scss";
import { IItem } from "../types";

function Home() {
  const [items, refresh, status, error] = useItems(); 

  const token = JSON.parse(localStorage.getItem("token") as string)?.token;

  const data = useRole(); 

  setInterval(() => refresh(), 60000); 

  const [isLogout, setIsLogout] = useState<boolean>(false);

  const logout = () => {
    setIsLogout(!isLogout); 

    localStorage.removeItem("token");
  };

  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />

              <Link to="/about">About</Link>
              {data.isAdmin && token && (
                <Link to="/addnewproduct">Add new product</Link>
              )}
              {token ? (
                isLogout ? (
                  <Link to="/login">Login</Link>
                ) : (
                  <button className="button-logout" onClick={logout}>
                    Exit
                  </button>
                )
              ) : (
                <Link to="/login">Login</Link>
              )}
            </div>
            <h2 className="content__title">All pictures </h2>
            {status === "error" ? (
              <p>Error</p>
            ) : status === "loading" ? (
              <p>Loading...</p>
            ) : (
              status === "success" && (
                <div className="content__items">
                  {(items as IItem[]).map((obj) => (
                    <PictureBlock
                      id={obj.id}
                      name={obj.name}
                      price={obj.price}
                      imageUrl={obj.imageUrl}
                      sizes={obj.sizes}
                      types={obj.types}
                    />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
