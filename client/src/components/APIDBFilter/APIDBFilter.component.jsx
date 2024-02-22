import React from "react";
import style from "./APIDBFilter.styles.css";

const APIDBFilter = ({ APIDBHandler, formAPIDB }) => {
  return (
    <div className={style.container}>
      <h1>Filter by from API or DB</h1>
      <select value="" onChange={APIDBHandler}>
        <option disabled value="">
          Select where to filter from
        </option>
        <option value="API" name="API">
          API
        </option>
        <option value="DataBase" name="DataBase">
          DataBase
        </option>
      </select>
      <div>
        {/* {formAPIDB.filterApiDB.map((el) => (
          <>
            <span key={el}>{el} </span>
          </>
        ))} */}
      </div>
    </div>
  );
};

export default APIDBFilter;
