"use client"

import { useEffect } from "react"
import L from "leaflet"
import "leaflet.vectorgrid"
import { CircleMarker, MapContainer, Popup, useMap } from "react-leaflet"

const TILE_URL = "/tiles/kashmir-area/{z}/{x}/{y}.pbf"
const KASHMIR_CENTER = [34.0837, 74.7973]
const KASHMIR_BOUNDS = {
  west: 74.63,
  south: 31.278,
  east: 78.007,
  north: 35.045,
}

function isInsideKashmirTiles(location) {
  if (!location) return false

  return (
    location.lng >= KASHMIR_BOUNDS.west &&
    location.lng <= KASHMIR_BOUNDS.east &&
    location.lat >= KASHMIR_BOUNDS.south &&
    location.lat <= KASHMIR_BOUNDS.north
  )
}

function RecenterMap({ location, isInsideTileArea }) {
  const map = useMap()

  useEffect(() => {
    if (!location || !isInsideTileArea) return

    map.setView([location.lat, location.lng], map.getZoom(), {
      animate: true,
    })
  }, [location, isInsideTileArea, map])

  return null
}

function VectorTileLayer() {
  const map = useMap()

  useEffect(() => {
    const layer = L.vectorGrid.protobuf(TILE_URL, {
      maxNativeZoom: 10,
      rendererFactory: L.canvas.tile,
      vectorTileLayerStyles: {
points: {
  radius: 0,
  fill: false,
  fillOpacity: 0,
  color: "transparent",
  weight: 0,
},
lines: (properties) => ({
  color: properties.waterway ? "#38bdf8" : properties.highway ? "#334155" : "#94a3b8",
  weight: properties.highway ? 3 : 1,
  opacity: 0.95,
}),
        multilinestrings: {
          color: "#64748b",
          weight: 1,
          opacity: 0.8,
        },
        multipolygons: (properties) => ({
          fill: true,
          fillColor: properties.natural === "water" ? "#93c5fd" : "#e2e8f0",
          fillOpacity: properties.natural === "water" ? 0.9 : 0.65,
          color: "#cbd5e1",
          weight: 1,
          opacity: 0.7,
        }),
        other_relations: {
          fill: true,
          fillColor: "#f1f5f9",
          fillOpacity: 0.5,
          color: "#cbd5e1",
          weight: 1,
        },
      },
    })

    layer.addTo(map)

    return () => {
      layer.removeFrom(map)
    }
  }, [map])

  return null
}

export default function OfflineCurrentLocationMap({ location }) {
  const isInsideTileArea = isInsideKashmirTiles(location)
  const center = isInsideTileArea ? [location.lat, location.lng] : KASHMIR_CENTER

  return (
    <div className="rounded-xl border border-white/40 bg-white/35 p-4 shadow-lg shadow-blue-950/10 backdrop-blur-xl">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-bold text-[#0071B6]">
          Offline Current Location
        </h3>
        <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
          GPS ACTIVE
        </div>
      </div>

      <div className="relative h-[320px] overflow-hidden rounded-lg border bg-slate-100">
        <MapContainer
          center={center}
          zoom={12}
          minZoom={4}
          maxZoom={18}
          maxBounds={[
            [KASHMIR_BOUNDS.south, KASHMIR_BOUNDS.west],
            [KASHMIR_BOUNDS.north, KASHMIR_BOUNDS.east],
          ]}
          maxBoundsViscosity={1}
          scrollWheelZoom
          className="h-full w-full"
        >
          <VectorTileLayer />

          {location && isInsideTileArea ? (
            <>
              <RecenterMap location={location} isInsideTileArea={isInsideTileArea} />
              <CircleMarker
                center={[location.lat, location.lng]}
                radius={8}
                pathOptions={{
                  color: "#ffffff",
                  fillColor: "#dc2626",
                  fillOpacity: 1,
                  weight: 3,
                }}
              >
                <Popup>
                  Lat: {location.lat.toFixed(6)}
                  <br />
                  Lng: {location.lng.toFixed(6)}
                </Popup>
              </CircleMarker>
            </>
          ) : null}
        </MapContainer>

        <div className="absolute bottom-3 left-3 right-3 z-[500] rounded-lg border border-white/50 bg-white/75 px-3 py-2 text-sm shadow backdrop-blur-md">
          {location ? (
            <div className="space-y-1">
              <div>
                Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
              </div>
              {!isInsideTileArea ? (
                <div className="text-xs font-medium text-amber-700">
                  Current location is outside the Kashmir offline tile area.
                </div>
              ) : null}
              <div className="text-xs text-gray-600">
                Accuracy: {Number.isFinite(location.accuracy) ? `${Math.round(location.accuracy)} m` : "Unavailable"} | Updated: {location.updatedAt}
              </div>
            </div>
          ) : (
            "Waiting for live device location"
          )}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
        <span>Using local vector tiles from public/tiles/kashmir-area/z/x/y.pbf.</span>
        <span className="flex items-center gap-1.5 font-medium text-green-700">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          Offline tiles loaded
        </span>
      </div>
    </div>
  )
}
