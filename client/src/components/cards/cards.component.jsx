import Card from "../card/card.component";
import { useSelector } from "react-redux";
import { React } from "react";
import "./cards.styles.css";

const Cards = ({ dogs }) => {
  const loading = useSelector((state) => state.loading);

  return (
    <div className="container-cards">

      {loading ? (
        <>  
          {dogs.length > 0 ? (
            <>
              {dogs.map((dog) => {
                return (
                  <Card
                    key={dog.id}
                    id={dog.id}
                    name={dog.name}
                    image={dog.image}
                    minWeight={dog.weight_min}
                    maxWeight={dog.weight_max}
                    temperaments={dog.temperament}
                  />
                );
              })}
            </>
          ) : (
            <>
              <Card
                key="no-info"
                id="no-info"
                name="The sought breed does not exist"
                image="https://stormgain.com/sites/default/files/news/DOGE%20breed.jpg"
                minWeight="0"
                maxWeight="0"
                temperaments="There is no information"
              />
            </>
          )}
        </>
      ) : (
        <>
          <img src="https://i.gifer.com/ZKZg.gif" alt="Loading..."  width="100" />
        </>
      )}
    </div>
  );
};

export default Cards;
