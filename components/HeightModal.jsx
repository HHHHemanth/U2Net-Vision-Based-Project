"use client"

import { useState, useEffect, useRef } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"

const ENDPOINT = "/api/height"

export default function HeightModal({ open, onClose }) {

  const [data,setData] = useState([])
  const [ground,setGround] = useState(null)
  const [height,setHeight] = useState(0)
  const buffer = useRef([])

  useEffect(()=>{

    const timer = setInterval(async ()=>{

      const res = await fetch(ENDPOINT)
      const j = await res.json()
        if (!j || j.ok !== 1) return
      const alt = parseFloat(j.alt_kalman_m ?? j.alt_raw_m ?? 0)

      let rel = ground==null ? alt : alt-ground

      buffer.current.push(rel)

      if(buffer.current.length>20)
        buffer.current.shift()

        const smooth =
        buffer.current.length > 0
            ? buffer.current.reduce((a,b)=>a+b,0) / buffer.current.length
            : 0

      setHeight(smooth)

      setData(prev=>[
        ...prev,
        {time:Date.now(),height:smooth}
      ].slice(-200))

    },100)

    return ()=>clearInterval(timer)

  },[ground])

  if(!open) return null

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="
        bg-white/70
        backdrop-blur-xl
        border border-blue-200
        rounded-2xl
        shadow-[0_0_40px_rgba(0,113,182,0.3)]
        w-[90%] max-w-[900px] p-6 relative
      ">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-[#0071B6] mb-6">
          Height Measurement
        </h2>

        {/* HEIGHT DISPLAY */}
        <div className="text-center text-4xl font-bold text-blue-700 mb-4">
          {height.toFixed(2)} m
        </div>

        {/* GRAPH */}
        <div className="h-[300px]">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={data}>

              <XAxis hide/>

              <YAxis
                label={{
                  value:"Height (m)",
                  angle:-90,
                  position:"insideLeft"
                }}
              />

              <Line
                dataKey="height"
                stroke="#0071B6"
                strokeWidth={4}
                dot={false}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* CONTROLS */}
        <div className="flex justify-center gap-4 mt-6">

          <button
            onClick={()=>setGround(height)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Set Zero
          </button>

          <button
            onClick={()=>setGround(null)}
            className="bg-gray-600 text-white px-5 py-2 rounded-lg"
          >
            Clear
          </button>

        </div>

      </div>

    </div>
  )
}