import React from "react";

import Categories from "../components/Categories";

import Sort from "../components/Sort";

import Header from "../components/Header";

import PictureBlock from "../components/PictureBlock";

import { useItems } from "../hooks/useItems";
import { Link } from "react-router-dom";

import "../scss/app.scss";

function Home() {
  const [items, refresh, status, error] = useItems();

  setInterval(() => refresh(), 60000); 

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
              <Link to="/addnewproduct">Add new product</Link>
              {/* <Link to="/fingerprint">Отпечаток</Link> */}
            </div>
            <h2 className="content__title">All pictures </h2>
            {status === "error" ? (
              <p>Error</p>
            ) : status === "loading" ? (
              <p>Loading...</p>
            ) : (
              status === "success" && (
                <div className="content__items">
                  {items.map((obj) => (
                    <PictureBlock
                      id={obj.id}
                      title={obj.name}
                      price={obj.price}
                      image={obj.imageUrl}
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
