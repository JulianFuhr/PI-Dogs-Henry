import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs } from "../../redux/actions";

import  Navbar  from "../../components/navbar/navbar.component";
import  Cards  from "../../components/cards/cards.component";
import './home.styles.css';


function Home() {

const dispatch = useDispatch();
const allDogs = useSelector((state) => state.allDogs);


const [filtered,setFiltered] = useState(allDogs)
const [searchString,setSearchString] = useState("")

function handleChange(d){
  d.preventDefault()
  setSearchString(d.target.value)
}

function handleSubmit(d){
  d.preventDefault()
  const filtered = allDogs.filter((dog) =>
  dog.name.includes(searchString)
  );
  setFiltered(filtered)
}

useEffect(() => {
  dispatch(getDogs());
}, [dispatch])



  return (
    <div className="home">
      <h2 className="home-title">Home</h2>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit}/>
      <Cards allDogs={filtered} />
    </div>
  );
}

export default Home;
