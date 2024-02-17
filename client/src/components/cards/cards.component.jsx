import Card from "../card/card.component";
import './cards.styles.css';

function Cards({allDogs}) {

const dogsList = allDogs


  return (
    <div className="card-list">
      {dogsList?.map((dog)=>(
        <Card dog={dog} />
      ))}
    </div>
  );
}

export default Cards;