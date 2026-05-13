"use client"
import Grainient from '../components/Grainient';
import { useState } from "react"
import Header from "../components/Header"
import LiveStream from "../components/LiveStream"
import CapturePanel from "../components/CapturePanel"
import ResultViewer from "../components/ResultViewer"
import LoadCellModal from "../components/LoadCellModal"
import HeightModal from "../components/HeightModal"

export default function Home() {
  const [openLoadCell, setOpenLoadCell] = useState(false)
  const [openHeight, setOpenHeight] = useState(false)
  const [result, setResult] = useState(null)

  return (

    <main className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Grainient
          color1="#ffffff"
          color2="#0071B6"
          color3="#ffffff"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>

      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 lg:p-6">

        {/* Controls Panel */}
        <div className="lg:col-span-2 bg-white/90 backdrop-blur rounded-xl shadow-lg p-5">

          <h2 className="text-lg font-bold text-[#0071B6] mb-4">
            Controls
          </h2>

          <CapturePanel setResult={setResult} />
<button
  onClick={() => setOpenLoadCell(true)}
  className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg"
>
  Open Load Cell
</button>

<button
  onClick={() => setOpenHeight(true)}
  className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg"
>
Height Measurement
</button>

        </div>


        {/* Camera Workspace */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur rounded-xl shadow-lg p-5">

          <h2 className="text-lg font-bold text-[#0071B6] mb-4">
            Camera Workspace
          </h2>

          <LiveStream />

        </div>


        {/* Result Panel */}
        <div className="lg:col-span-3 bg-white/90 backdrop-blur rounded-xl shadow-lg p-5">

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