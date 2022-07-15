import React from "react";
import './App.css';
import { SearchBar } from "../SearchBar/SeachBar.js";
import { SearchResults } from "../SearchResults/SearchResults.js"
import {Playlist} from "../Playlist/Playlist.js";

function App() {
  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults />
          <Playlist />
        </div>
      </div>
    </div>
  );
}

export default App;
