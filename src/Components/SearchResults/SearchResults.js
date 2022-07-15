import React from "react";
import './SearchResults.css';
import {TrackList} from "../TrackList/TrackList.js"

export function SearchResults() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList />
      </div>
    );
}