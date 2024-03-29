import React from "react";
import './Playlist.css';
import {TrackList} from "../TrackList/TrackList.js"

export function Playlist(props) {

    const handleNameChange = ({target}) => {
      props.onNameChange(target.value);
    }
    
    return (
      <div className="Playlist">
        {/* <input defaultValue="New Playlist" onChange={handleNameChange}/> */}
        {props.playlistName !== "New Playlist" && <input defaultValue="New Playlist" onChange={handleNameChange}/>}
        {props.playlistName === "New Playlist" && <input value="New Playlist" onChange={handleNameChange}/>}

        <TrackList tracks={props.playlistTracks} onRemove={props.onRemove} isRemoval={true}/>
        <button className="Playlist-save" onClick={props.onSave}>SAVE TO SPOTIFY</button>
      </div>
    );
}