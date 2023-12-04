import React from 'react';

import Categories from './components/Categories';

import Sort from './components/Sort';

import Header from './components/Header';

import PictureBlock from './components/PictureBlock';

import pictures from './assets/pictures.json';

import './scss/app.scss';

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">All pictures</h2>
            <div className="content__items">
              {pictures.map((obj) => (
                <PictureBlock
                  title={obj.name}
                  price={obj.price}
                  image={obj.imageUrl}
                  sizes={obj.sizes}
                  types={obj.types}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
