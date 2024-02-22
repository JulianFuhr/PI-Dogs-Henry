import React from "react";
import { sortFilterLH } from "../../redux/actions";
import { useDispatch } from "react-redux";
import "./sortWeight.styles.css";

const SortWeight = ({ dogs }) => {
  const dispatch = useDispatch();

  const sortHandlerLH = (event) => {
    const value = event.target.value;
    dispatch(sortFilterLH(dogs, value));
  };

  return (
    <div className="container">
      <h1> Sort by weight</h1>
      <select value="" onChange={sortHandlerLH}>
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
