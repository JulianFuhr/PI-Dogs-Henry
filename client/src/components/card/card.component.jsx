import "./card.styles.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="Card">
      <img className="imgcard" src={props.image} alt={props.name} />
      <h2 className="name">Name: {props.name}</h2>
      <p className="temperament">Temperaments: {props.temperaments}</p>
      <p className="weight">
        Weight: {props.minWeight} - {props.maxWeight} kg
      </p>
      {props.id === "no-info" ? (
        <>
          <p>No details</p>
        </>
      ) : (
        <Link to={`/home/${props.id}`}>
          <p className="btnenlace">Details</p>
        </Link>
      )}
    </div>
  );
};

export default Card;
