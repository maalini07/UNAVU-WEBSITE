import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapView({ lat, lng }) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={14}
      style={{ height: "300px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>Pickup Location</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapView;
