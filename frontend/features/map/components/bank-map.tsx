"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { BANK_BRANCHES } from "../data/branches";
import { TextSC } from "./bank-map.styled";

const MapContainer = dynamic(
  async () => (await import("react-leaflet")).MapContainer,
  { ssr: false },
) as unknown as typeof import("react-leaflet").MapContainer;

const TileLayer = dynamic(
  async () => (await import("react-leaflet")).TileLayer,
  { ssr: false },
) as unknown as typeof import("react-leaflet").TileLayer;

const Marker = dynamic(async () => (await import("react-leaflet")).Marker, {
  ssr: false,
}) as unknown as typeof import("react-leaflet").Marker;

const Popup = dynamic(async () => (await import("react-leaflet")).Popup, {
  ssr: false,
}) as unknown as typeof import("react-leaflet").Popup;

const DEFAULT_CENTER: [number, number] = [53.9045, 27.5615];

export const BankMap = () => {
  useEffect(() => {
    import("leaflet").then((leaflet) => {
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    });
  }, []);

  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={12}
      scrollWheelZoom
      style={{ height: "100%", width: "100%" }}
      data-testid="bank-map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {BANK_BRANCHES.map((branch) => (
        <Marker key={branch.id} position={branch.position}>
          <Popup>
            <Box>
              <Text fontWeight="bold" mb={1}>
                {branch.name}
              </Text>
              <VStack align="start">
                <TextSC fontSize="sm">{branch.address}</TextSC>
                <TextSC fontSize="sm" color="fg.muted">
                  {branch.hours}
                </TextSC>
              </VStack>
            </Box>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
