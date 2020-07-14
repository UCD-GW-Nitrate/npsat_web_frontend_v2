import React from 'react'
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "./index.less";

export default class CountyMap extends React.Component {
  state = {
    lat: 38.5816,
    lng: -121.4944,
    zoom: 5,
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
    )
  }
}
