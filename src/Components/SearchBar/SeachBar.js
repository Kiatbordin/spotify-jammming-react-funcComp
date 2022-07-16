import React, { useState } from "react";
import './SearchBar.css';

export function SearchBar(props) {

    const [term,setTerm] = useState("");

    const search = () => {
      props.onSearch(term);
    }

    const handleTermChange = ({target}) => {
      setTerm( prev => target.value );
    }

    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange}/>
        <button className="SearchButton" onClick={search}>SEARCH</button>
      </div>
    );
}