import React, { useState } from "react";
import { apiDbFilter } from "../../redux/actions";
import { useDispatch } from "react-redux";

import "./APIDBFilter.styles.css";

const APIDBFilter = ({ dogs }) => {
  const dispatch = useDispatch();
  const [sortValue, setSortValue] = useState("");

  const APIDBHandler = (event) => {
    const selectedValue = event.target.value;
    setSortValue(selectedValue);
    dispatch(apiDbFilter(dogs, selectedValue));

    // setformAPIDB({
    //   ...formAPIDB,
    //   filterApiDB: [...formAPIDB.filterApiDB, value],
    // });
    // dispatch(apiDbFilter(dogsFromBE, value));
  };

  return (
    <div className="container-APIDBFilter">
      <h1>Filter by from API or DB</h1>
      <select value={sortValue} onChange={APIDBHandler}>
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
