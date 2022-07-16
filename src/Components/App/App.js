import React,{ useState,useEffect } from "react";
import './App.css';

import { SearchBar } from "../SearchBar/SeachBar.js";
import { SearchResults } from "../SearchResults/SearchResults.js"
import { Playlist } from "../Playlist/Playlist.js";

import Spotify from "../../util/Spotify.js";

function App() {

  const [searchResults, setSearchResults] = useState([
    // { name: "name1", artist: "artist1", album: "album1", id: 1 },
    // { name: "name2", artist: "artist2", album: "album2", id: 2 },
    // { name: "name3", artist: "artist3", album: "album3", id: 3 }
  ]);

  const [playlistName,setPlaylistName] = useState('');
  const [playlistTracks,setPlaylistTracks] = useState([
    // { name: 'KenPlaylistName1', artist: 'KenPlaylistArtist1', album: 'KenPlaylistAlbum1', id: 11 },
    // { name: 'KenPlaylistName2', artist: 'KenPlaylistArtist2', album: 'KenPlaylistAlbum2', id: 12 }
  ]);

  const addTrack = (track) => {
    let tracks = playlistTracks;
    // Comparing received track Id with each saved track id using find in arr method
    if(tracks.find(savedTrack => savedTrack.id === track.id)) {
      return; // Do nothing...
    }
    setPlaylistTracks( prev => [...prev,track]);
    // console.log(playlistTracks);
  }

  const removeTrack = (track) => {
    let tracks = playlistTracks;
    // Comparing received track Id with each saved playlist track id using filter in arr method
    setPlaylistTracks( prev => tracks.filter(savedPlaylistTrack=> savedPlaylistTrack.id!==track.id) )
  }

  const updatePlaylistName = (name) => {
    setPlaylistName( prev => name );
    // setPlaylistName( name );
    // alert(playlistName);
  } 

  const savePlaylist = () => {
    // alert('This method has linked to the button correctly.')
    const trackURIs = playlistTracks.map( track => track.uri );
    // console.log(trackURIs);
    try 
    {
      Spotify.savePlaylist(playlistName, trackURIs)
      .then(() => {
        setPlaylistName( "New Playlist");
        setPlaylistTracks([]);
        // alert(playlistName);
      });
    } catch (err) {
      alert(err);
    }
  
  }

  const search = (term) => {
    // alert(term);
    // alert(searchResults);
    Spotify.search(term)
    // .then( (response) => alert(response[0].name))
    .then(termSearchResults => {
      // setSearchResults( prev => [...prev,termSearchResults]);  // no need to keep previous state.
      setSearchResults( termSearchResults );
    })
    // alert(searchResults);
  }

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search}/>
        <div className="App-playlist">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
