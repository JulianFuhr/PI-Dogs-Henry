import './card.styles.css';

function Card({dog}) {

const { name, id, image, height_min, height_max, weight_min, weight_max, life_span} = dog;

  return (
    <div className="card-container">
      <h2>{name}</h2>
      <p>{id}</p>
      <p>{image}</p>
      <p>{height_min}</p>
      <p>{height_max}</p>
      <p>{weight_min}</p>
      <p>{weight_max}</p>
      <p>{life_span}</p>
    </div>
  );
}

export default Card;