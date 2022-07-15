import React from "react";
import './Playlist.css';
import {TrackList} from "../TrackList/TrackList.js"

export function Playlist() {
    return (
      <div className="Playlist">
        <input defaultValue="New Playlist" />
        <TrackList />
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
}