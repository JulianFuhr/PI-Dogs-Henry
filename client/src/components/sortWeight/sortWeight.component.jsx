import React, { useState } from "react";
import { sortFilterLH } from "../../redux/actions";
import { useDispatch } from "react-redux";
import "./sortWeight.styles.css";

const SortWeight = ({ dogs }) => {
  //state local p almc el valor del peso.
  const [weightValue, setWeightValue] = useState("");
  const dispatch = useDispatch();

  const sortHandlerLH = (event) => {
    const value = event.target.value;
    console.log("value", value);
    setWeightValue(value);
    dispatch(sortFilterLH(dogs, value));
  };

  return (
    <div className="container-wei">
      <h1> Sort by weight</h1>
      <select value={weightValue} onChange={sortHandlerLH}>
        <option value="" disabled>
          Select order
        </option>
        <option name="low-high" value="low-high">
          Low to high
        </option>
        <option name="high-low" value="high-low">
          High to low
        </option>
      </select>
    </div>
  );
};

export default SortWeight;
