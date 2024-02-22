import "./card.styles.css";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="Card">
      <img className="img" src={props.image} alt={props.name} />
      <h2 className="name">{props.name}</h2>
      <p className="temperament">{props.temperaments}</p>
      <p className="weight">
        {props.minWeight} - {props.maxWeight} kg
      </p>
      {props.id === "no-info" ? (
        <>
          <p>No details</p>
        </>
      ) : (
        <Link to={`/home/${props.id}`}>
          <p className=".enlace">Details</p>
        </Link>
      )}
    </div>
  );
};

export default Card;
// function Card({ dog }) {
//   const { name, image, temperament, weight_min, weight_max } = dog;

//   return (
//     <div className="card-container">
//       <h2>{name}</h2>
//       <img src={image} alt="" />
//       <h1>{temperament}</h1>
//       <p>{weight_min} kg</p>
//       <p>{weight_max} kg</p>
//       {dog.id === "no info" ? (
//         <>
//           <p>No Details</p>
//         </>
//       ) : (
//         <Link to={`/home/${dog.id}`}>
//           <p>Details</p>
//         </Link>
//       )}
//     </div>
//   );
// }
