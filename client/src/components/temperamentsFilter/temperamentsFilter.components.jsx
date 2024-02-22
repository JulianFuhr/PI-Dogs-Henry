import React from "react";
import "./temperamentsFilter.styles.css";

const TemperamentsFilter = ({ form, allTemperaments, temperamentsHandler }) => {
  return (
    <div className="container">
      <h1>Filter by temperament</h1>
      <select value="" onChange={temperamentsHandler}>
        <option value="" disabled>
          {" "}
          Select temperament to filter
        </option>
        {allTemperaments.map((temp) => {
          return (
            <option key={temp.id} value={temp.name} name={temp.name}>
              {temp.name}
            </option>
          );
        })}
      </select>
      <div>
        {form.temperaments.map((el) => (
          <>
            <span key={el}>{el} </span>
          </>
        ))}
      </div>
    </div>
  );
};

export default TemperamentsFilter;
