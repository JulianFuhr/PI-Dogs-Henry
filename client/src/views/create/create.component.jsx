import { useState, useEffect, React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTemperaments } from "../../redux/actions";
import "./create.styles.css";
import axios from "axios";

const Create = () => {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(false);
  const [apiResponse, setApiResponse] = useState("");
  const [isApiError, setIsApiError] = useState(false);
  const [loading, setLoading] = useState(false);
  const regexURL = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
  const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚú\s]+$/;

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  const [form, setForm] = useState({
    name: "",
    image: "",
    height_min: 0,
    height_max: 0,
    weight_min: 0,
    weight_max: 0,
    life_span: 0,
    temperaments: [],
  });
  console.log(form);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const err = onValidate(form);
    if (err === null) {
      setLoading(true);
      const formulario = {
        ...form,
        temperaments: form.temperaments.map((temp) => temp.id),
      };
      console.log(formulario);
      axios
        .post("http://localhost:3001/dogs", formulario)
        .then((res) => {
          setIsApiError(false);
          setApiResponse(res.data.message);
          setLoading(false);
          setModal(!modal);
          setErrors({});
          setForm({
            name: "",
            image: "",
            height_min: 0,
            height_max: 0,
            weight_min: 0,
            weight_max: 0,
            life_span: 0,
            temperaments: [],
          });
        })
        .catch((error) => {
          setIsApiError(true);
          setApiResponse(error.response.data.error);
          setLoading(false);
          setModal(!modal);
          setErrors({});
        });
    } else {
      setErrors(err);
    }
  };

  function selectHandler(event) {
    const temperament = JSON.parse(event.target.value);
    console.log(temperament);
    setForm({
      ...form,
      temperaments: [...form.temperaments, temperament],
    });
  }

  function deleteHandler(el) {
    setForm({
      ...form,
      temperaments: form.temperaments.filter((temp) => temp !== el),
    });
  }

  const onValidate = (form) => {
    let isError = false;
    let error = {};
    if (form.name.length <= 3) {
      error.name = "The name cannot be less than 3 letters";
      isError = true;
    } else if (!regexName.test(form.name)) {
      error.name = "The name can only contain letters and spaces";
      isError = true;
    }
    if (!regexURL.test(form.image)) {
      error.image = "The URL entered is not correct";
      isError = true;
    }
    if (
      form.height_min <= 0 ||
      parseInt(form.height_min) >= parseInt(form.height_max)
    ) {
      error.height_min =
        "The minimum height cannot be less than 0 or greater than the maximum height";
      isError = true;
    } else if (form.height_min > 100) {
      error.height_min = "The height cannot exceed 100 centimeters";
      isError = true;
    }
    if (
      form.height_max <= 0 ||
      parseInt(form.height_min) >= parseInt(form.height_max)
    ) {
      error.height_max =
        "The maximum height cannot be less than 0 or less than the minimum height";
      isError = true;
    } else if (form.height_max > 100) {
      error.height_min = "The height cannot exceed 100 centimeters";
      isError = true;
    }
    if (
      form.weight_min <= 0 ||
      parseInt(form.weight_min) >= parseInt(form.weight_max)
    ) {
      error.weight_min =
        "The minimum weight cannot be less than 0 or greater than the maximum weight";
      isError = true;
    } else if (form.weight_min > 100) {
      error.height_min = "The weight cannot exceed 100 kilograms";
      isError = true;
    }
    if (
      form.weight_max <= 0 ||
      parseInt(form.weight_min) >= parseInt(form.weight_max)
    ) {
      error.weight_max =
        "The maximum weight cannot be less than 0 or less than the minimum weight";
      isError = true;
    } else if (form.weight_min > 100) {
      error.height_min = "The weight cannot exceed 100 kilograms";
      isError = true;
    }
    if (form.life_span <= 0) {
      error.life_span = "The minimum life span cannot be less than 0";
      isError = true;
    } else if (form.life_span > 20) {
      error.life_span = "The life span cannot exceed 20 years";
      isError = true;
    }

    if (form.temperaments.length <= 0) {
      error.temperaments = "You must assign at least one temperament";
      isError = true;
    }
    return isError ? error : null;
  };

  return (
    <div className="container-create-form">
    <form onSubmit={submitHandler} className="form">
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modalContent">
            {!loading ? (
              <>
                {isApiError ? (
                  <>
                    <img
                      className="imgNotCreate"
                      src="assets\cheque.png"
                      alt="create img"
                    ></img>
                    <h2>There is an error with the information.</h2>
                  </>
                ) : (
                  <>
                    <img
                      className="imgCreate"
                      src="assets\cheque.png"
                      alt="create img"
                    ></img>
                    <h2>You have created a breed of dog!</h2>
                  </>
                )}
                <p>{apiResponse}</p>
              </>
            ) : (
              <>
                <img
                  className="imgNotCreate"
                  src="client\assets\cheque.png"
                  alt="loading img"
                ></img>
              </>
            )}
            <button className="closeModal" onClick={toggleModal}>
              X
            </button>
          </div>
        </div>
      )}
      <div className="titlecreate">
        <h2> CREATE A DOG! </h2>
      </div>
      <label>Name: </label>
      <input
        type="text"
        value={form.name}
        name="name"
        onChange={changeHandler}
      />
        {errors.name && (
          <>            
            <span className="spanCreate">{errors.name}</span>
          </>
        )}
      <br />
      <label>Image URL: </label>
      <input
        type="url"
        value={form.image}
        name="image"
        onChange={changeHandler}
      />
        {errors.image && (
          <>
            <span className="spanCreate">{errors.image}</span>
          </>
        )}
      <br />
      <label>Min. Height: </label>
      <input
        type="number"
        value={form.height_min}
        name="height_min"
        onChange={changeHandler}
      />
        {errors.height_min && (
          <>
            <span className="spanCreate">{errors.height_min}</span>
          </>
        )}
      <br />
      <label>Max. Height: </label>
      <input
        type="number"
        value={form.height_max}
        name="height_max"
        onChange={changeHandler}
      />
        {errors.height_max && (
          <>
            <span className="spanCreate">{errors.height_max}</span>
          </>
        )}
      <br />
      <label>Min Weight: </label>
      <input
        type="number"
        value={form.weight_min}
        name="weight_min"
        onChange={changeHandler}
      />
        {errors.weight_min && (
          <>
            <span className="spanCreate">{errors.weight_min}</span>
          </>
        )}
      <br />
      <label>Max Weight: </label>
      <input
        type="number"
        value={form.weight_max}
        name="weight_max"
        onChange={changeHandler}
      />
        {errors.weight_max && (
          <>
            <span className="spanCreate">{errors.weight_max}</span>
          </>
        )}
      <br />
      <label> Life Span: </label>
      <input
        type="number"
        value={form.life_span}
        name="life_span"
        onChange={changeHandler}
      />
        {errors.life_span && (
          <>         
            <span className="spanCreate">{errors.life_span}</span>
          </>
        )}
      <br />
      <label>Temperaments: </label>
      <select onChange={selectHandler}>
        <option disabled value="">
          {" "}
          Select one or more temperaments
        </option>
        {allTemperaments.map((temp) => {
          return (
            <option value={JSON.stringify(temp)} key={temp.id} name={temp}>
              {temp.name}
            </option>
          );
        })}
      </select>
        {errors.temperaments && (
          <>     
            <span className="spanCreate">{errors.temperaments}</span>
          </>
        )}
      <br />
      <h4>Selected temperaments: </h4>
      <div>
        {form.temperaments.map((el) => (
          <>
            <span key={el.id}>{el.name} </span>
            <button onClick={() => deleteHandler(el)} className="xButton">
              x
            </button>
          </>
        ))}
      </div>
      <br />
      <button type="submit" className="submitButton">
        Create!
      </button>
    </form>
    </div>
  );
};

export default Create;
