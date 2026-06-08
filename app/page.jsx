"use client"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Header from "../components/Header"
import LiveStream from "../components/LiveStream"
import CapturePanel from "../components/CapturePanel"
import ResultViewer from "../components/ResultViewer"
import LoadCellModal from "../components/LoadCellModal"
import HeightModal from "../components/HeightModal"

const OfflineCurrentLocationMap = dynamic(
  () => import("../components/OfflineCurrentLocationMap"),
  { ssr: false }
)

export default function Home() {
  const [openLoadCell, setOpenLoadCell] = useState(false)
  const [openHeight, setOpenHeight] = useState(false)
  const [result, setResult] = useState(null)
  const [location, setLocation] = useState(null)

  useEffect(() => {
    if (!navigator.geolocation) return

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation({
          lat: 34.0837,
          lng: 74.7973,
          accuracy: position.coords.accuracy,
          updatedAt: new Date().toLocaleTimeString(),
        })
      },
      (error) => {
        console.log("Location error:", error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])
  return (

    <main className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/background_img.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/10" />
      </div>

      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 lg:p-6">

        {/* Controls Panel */}
        <div className="lg:col-span-2 rounded-xl border border-white/35 bg-white/35 p-5 shadow-xl shadow-blue-950/10 backdrop-blur-2xl">

          <h2 className="text-lg font-bold text-[#FFFFFF] mb-4">
            Controls
          </h2>

          <CapturePanel setResult={setResult} />
<button
  onClick={() => setOpenLoadCell(true)}
  className="group flex w-full items-center justify-center gap-2 mt-4 bg-[#2787D1] text-white py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30"
>

  Open Load Cell
</button>

<button
  onClick={() => setOpenHeight(true)}
  className="group flex w-full items-center justify-center gap-2 mt-4 bg-[#2787D1] text-white py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/30"
>

Height Measurement
</button>

        </div>


        {/* Camera Workspace */}
        <div className="lg:col-span-7 rounded-xl border border-white/35 bg-white/35 p-5 shadow-xl shadow-blue-950/10 backdrop-blur-2xl">

          <h2 className="text-lg font-bold text-[#FFFFFF] mb-4">
            Camera Workspace
          </h2>

          <LiveStream />

          <div className="mt-6">
            <OfflineCurrentLocationMap location={location} />
          </div>

        </div>


        {/* Result Panel */}
        <div className="lg:col-span-3 rounded-xl border border-white/35 bg-white/35 p-5 shadow-xl shadow-blue-950/10 backdrop-blur-2xl">

          <ResultViewer result={result} />

        </div>

      </div>
  <LoadCellModal
    open={openLoadCell}
    onClose={() => setOpenLoadCell(false)}
  />
  <HeightModal
  open={openHeight}
  onClose={() => setOpenHeight(false)}
/>
    </main>

  )
}
