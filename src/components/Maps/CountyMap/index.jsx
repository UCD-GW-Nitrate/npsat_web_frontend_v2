import React from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './index.less';

/**
 * a map component that used for regions with tooltips
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const CountyMap = (props) => {
  const { data } = props;
  return (
    <Map center={[38.5816, -121.4944]} zoom={6}>
      <GeoJSON
        key={data.length}
        data={data}
        onEachFeature={(feature, layer) => {
          layer.bindTooltip(feature.properties.name);
        }}
      />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </Map>
  );
};

export default CountyMap;
