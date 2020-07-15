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
    const { data, onChange, value } = this.props;
    const position = [this.state.lat, this.state.lng]
    return (
      <Map center={position} zoom={this.state.zoom}>
        <GeoJSON
          key={data.length}
          data={data}
          onEachFeature={(feature, layer) => {
            layer.on({
              click: () => (onChange(feature.properties.id))
            });
            layer.bindTooltip(feature.properties.name);
          }}
          style={feature => (
            value === feature.properties.id ? {
              color: "red"
            } : {
              color: "blue"
            }
          )}
        />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
    )
  }
}
