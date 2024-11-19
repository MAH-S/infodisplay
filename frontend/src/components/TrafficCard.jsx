import React, { useEffect, useRef } from "react";
import { Card, Typography } from "antd";

const { Title } = Typography;

function TrafficCard() {
  const mapRef = useRef(null);

  useEffect(() => {
    // Google Maps API key (directly in the code, replace with your key)
    const googleMapsApiKey = "AIzaSyBnqL4Nnnjzr7hoKxXg12zRdqsGz2zGC-o";

    // Load Google Maps Script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      console.error("Error loading Google Maps script. Check your API key or billing setup.");
    };
    script.onload = () => {
      if (window.google && mapRef.current) {
        // Initialize the map with dark theme
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 24.7136, lng: 46.6753 }, // Riyadh coordinates
          zoom: 10,
          disableDefaultUI: true, // Disables the default map UI controls
          zoomControl: false, // Removes zoom control
          fullscreenControl: false, // Removes fullscreen control
          styles: [
            {
              elementType: "geometry",
              stylers: [{ color: "#212121" }],
            },
            {
              elementType: "labels.icon",
              stylers: [{ visibility: "off" }],
            },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#757575" }],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#212121" }],
            },
            {
              featureType: "administrative",
              elementType: "geometry",
              stylers: [{ color: "#757575" }],
            },
            {
              featureType: "administrative.country",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9e9e9e" }],
            },
            {
              featureType: "administrative.locality",
              elementType: "labels.text.fill",
              stylers: [{ color: "#bdbdbd" }],
            },
            {
              featureType: "poi",
              elementType: "labels.text.fill",
              stylers: [{ color: "#757575" }],
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#181818" }],
            },
            {
              featureType: "poi.park",
              elementType: "labels.text.fill",
              stylers: [{ color: "#616161" }],
            },
            {
              featureType: "road",
              elementType: "geometry.fill",
              stylers: [{ color: "#2c2c2c" }],
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#8a8a8a" }],
            },
            {
              featureType: "road.arterial",
              elementType: "geometry",
              stylers: [{ color: "#373737" }],
            },
            {
              featureType: "road.highway",
              elementType: "geometry",
              stylers: [{ color: "#3c3c3c" }],
            },
            {
              featureType: "road.highway.controlled_access",
              elementType: "geometry",
              stylers: [{ color: "#4e4e4e" }],
            },
            {
              featureType: "road.local",
              elementType: "labels.text.fill",
              stylers: [{ color: "#616161" }],
            },
            {
              featureType: "transit",
              elementType: "labels.text.fill",
              stylers: [{ color: "#757575" }],
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#000000" }],
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#3d3d3d" }],
            },
          ],
        });

        // Add Traffic Layer
        const trafficLayer = new window.google.maps.TrafficLayer();
        trafficLayer.setMap(map);
      } else {
        console.error("Google Maps API could not be loaded. Please check your API key and console for errors.");
      }
    };

    // Append the script to the document head
    document.head.appendChild(script);

    // Cleanup script if component is unmounted
    return () => {
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <Card bordered={true} style={{ backgroundColor: "#1f1f1f", padding: "0px" }}>
      <Title level={3} style={{ color: "#ffffff", fontSize: "24px", padding: "10px" }}>
        Traffic Status
      </Title>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "300px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      ></div>
    </Card>
  );
}

export default TrafficCard;
