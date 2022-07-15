import React from "react";
import './TrackList.css';
import {Track} from "../Track/Track.js";

export function TrackList() {
    return (
      <div className="TrackList">
        {/* <!-- You will add a map method that renders a set of Track components  --> */}
        <Track />
        <Track />
        <Track />
      </div>
    );
}