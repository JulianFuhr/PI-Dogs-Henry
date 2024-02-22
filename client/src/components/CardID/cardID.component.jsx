import axios from "axios";
import { useSelector } from "react-redux";
import { useState, React } from "react";
import { Link } from "react-router-dom";
import "./cardID.styles.css";

const CardID = ({ loading }) => {
  const dog = useSelector((state) => state.dog);
  const [modal, setModal] = useState(false);
  const [apiResponse, setApiResponse] = useState("");
  const [isApiError, setIsApiError] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const clicHandler = () => {
    toggleModal();
  };

  const clicSubmit = () => {
    setModalDelete(true);
    axios
      .delete(`http://localhost:3001/dogs/${dog.id}`)
      .then((res) => {
        setApiResponse(res.data.message);
      })
      .catch((error) => {
        setIsApiError(true);
        setApiResponse(error.response.data.error);
      });
  };

  return (
    <div className="card">
      {modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modalContent">
            <img
              className="imgNotCreate"
              src="/bones.png"
              alt="confirm delete"
            ></img>
            <h2>Are you sure you want to remove the dog {dog.name}?</h2>
            <button className="buttonConfirm" onClick={() => clicSubmit()}>
              CONFIRM!
            </button>
            <button className="buttonCancel" onClick={toggleModal}>
              CANCEL!
            </button>
          </div>
        </div>
      )}
      {modalDelete ? (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modalContent">
            {!isApiError ? (
              <>
                <img className="imgNotCreate" src="/cry.png" alt="delete"></img>
                <h2>Removed dog {dog.name}</h2>
                <h2>{apiResponse}</h2>
              </>
            ) : (
              <>
                <img
                  className="imgNotCreate"
                  src="/notCreate-icon.png"
                  alt="delete"
                ></img>
                <h2>{apiResponse}</h2>
              </>
            )}
            <Link to="/home">
              <button className="closeModal">X</button>
            </Link>
          </div>
        </div>
      ) : null}
      {loading ? (
        <>
          {dog.length === 0 ? (
            <>
              <img
                className="img"
                src="https: //stormgain.com/sites/default/files/news/DOGE%20breed.jpg"
                alt="does not exist"
              />
              <div className="container">
                <h1 className="name">The sought breed does not exist</h1>
                <p>From: does not exist </p>
                <h4 className="weight">Weight</h4>
                <span> There is no information</span>
                <h4 className="height">Height</h4>
                <span>There is no information</span>
                <h4 className="lifeSpan">Life Span</h4>
                <span>There is no information</span>
                <h4 className="temperaments">Temperament:</h4>
                <span>There is no information</span>
              </div>
            </>
          ) : (
            <>
              {" "}
              <img className="img" src={dog.image} alt={dog.name} />
              <div className="container">
                <h1 className="name">{dog.name}</h1>
                <p>From: {dog.from}</p>
                <h4 className="weight">Weight</h4>
                <span>
                  {dog.minWeight} - {dog.maxWeight} kgs
                </span>
                <h4 className="height">Height</h4>
                <span>
                  {dog.minHeight} - {dog.maxHeight} cms
                </span>
                <h4 className="lifeSpan">Life Span</h4>
                <span>
                  {dog.minLifeSpan} - {dog.maxLifeSpan} years
                </span>
                <span>{dog.life_span}</span>
                <h4 className="temperaments">Temperament:</h4>
                <span>{dog.temperaments}</span>
                <br />
                {dog.from === "DataBase" ? (
                  <div className="modDel">
                    <Link to={`/home/modify/${dog.id}`}>
                      <button className="buttonModify" name="Modify">
                        Modify
                      </button>
                    </Link>
                    <button
                      onClick={() => clicHandler()}
                      className="buttonDelete"
                      name="Delete"
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <img className="img" src="/loading.gif" alt="Loading..." />
          <div className="container">
            <h1 className="name">Loading...</h1>
          </div>
        </>
      )}
    </div>
  );
};

export default CardID;
