import React from "react";
import { Link } from "react-router-dom";
import { useRole } from "../hooks/useRole";
import type { IItem } from "../types";

function PictureBlock({
  name,
  price,
  imageUrl,
  sizes,
  types,
  id,
}: Partial<IItem>) {
  const [pictureCount, setPictureCount] = React.useState<number>(0);
  const typeNames: string[] = ["placard", "picture"];

  const token = JSON.parse(localStorage.getItem("token") as string)?.token; // получение токена

  const { isAdmin } = useRole(); // статус юзера

  const [activeType, setActiveType] = React.useState<number | string>(0);
  const [activeSize, setActiveSize] = React.useState<number>(0);

  const onClickLike = () => {
    setPictureCount(pictureCount + 1);
  };

  return (
    <Link
      className="picture-block"
      to={isAdmin || token ? `editproduct/${id}` : `product/${id}`}
    >
      <img className="picture-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="picture-block__title">{name}</h4>
      <div className="picture-block__selector">
        <ul>
          {types?.map((typeId) => (
            <li
              onClick={() => setActiveType(typeId)}
              className={activeType === typeId ? "active" : ""}
            >
              {typeNames[+typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes?.map((size, i) => (
            <li
              onClick={() => setActiveSize(i)}
              className={activeSize === i ? "active" : ""}
            >
              {size} cm{" "}
            </li>
          ))}
        </ul>
      </div>
      <div className="picture-block__bottom">
        <div className="picture-block__price"> ab {price} €</div>
        <button
          onClick={onClickLike}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Add</span>
          <i>{pictureCount}</i>
        </button>
      </div>{" "}
    </Link>
  );
}

export default PictureBlock;
