import React from 'react'
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "./index.less";

const CountyMap = props  => {
  const { data } = props;
  return data === {} ? null : (
    <Map center={[38.5816, -121.4944]} zoom={7}>
      <GeoJSON
        key={data.length}
        data={data.geometry}
        onEachFeature={(feature, layer) => {
          layer.bindTooltip(feature.properties.name);
        }}
      />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </Map>
  )
};

export default CountyMap;
