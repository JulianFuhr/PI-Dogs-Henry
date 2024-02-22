import React, { useState } from "react";
import { sortFilterAZ } from "../../redux/actions";
import { useDispatch } from "react-redux";

import "./sortAZ.styles.css";

const SortAZ = ({ dogs }) => {
  const dispatch = useDispatch();

  const [sortValue, setSortValue] = useState("");

  //*manejo el evento para clasificar de  la A a la Z
  const sortHandlerAZ = (event) => {
    const selectedValue = event.target.value;
    setSortValue(selectedValue);
    dispatch(sortFilterAZ(dogs, selectedValue));
  };

  return (
    <div className="container">
      <h1> Sort by name </h1>
      <select value={sortValue} onChange={sortHandlerAZ}>
        <option value="" disabled>
          {" "}
          Select order{" "}
        </option>
        <option value="ASC" name="ASC">
          ASC
        </option>
        <option value="DESC" name="DESC">
          DESC
        </option>
      </select>
    </div>
  );
};

export default SortAZ;
