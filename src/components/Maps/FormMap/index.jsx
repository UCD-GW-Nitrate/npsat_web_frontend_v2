import React from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './index.less';

/**
 * a map component that is used for selecting regions with tooltip
 */
export default class FormMap extends React.Component {
  state = {
    lat: 37.58,
    lng: -119.4179,
    zoom: 6,
  };

  render() {
    const { data, onChange, values } = this.props;
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <GeoJSON
          key={data.length + values.length}
          data={data}
          onEachFeature={(feature, layer) => {
            layer.on({
              click: () => onChange(feature.properties.id, values),
            });
            layer.bindTooltip(feature.properties.name);
          }}
          style={(feature) =>
            values && values.indexOf(feature.properties.id) !== -1
              ? {
                  color: 'red',
                }
              : {
                  color: 'blue',
                }
          }
        />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </Map>
    );
  }
}
