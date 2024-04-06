import React from "react";

function Categories() {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const categories: string[] = ["All", "Blue", "Green", "Yellow", "Orange"];

  const onClickCategory = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {categories.map((value, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={activeIndex === index ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
