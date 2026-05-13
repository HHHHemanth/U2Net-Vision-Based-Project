"use client"

import { useState, useEffect, useRef } from "react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts"

// const ENDPOINT = "http://192.168.4.70/weight"
const ENDPOINT = "/api/weight"

export default function LoadCellModal({ open, onClose }) {
    const startTime = useRef(null)
    const [data, setData] = useState([])
    const [recording, setRecording] = useState(false)
    const [lastValue, setLastValue] = useState("-")
    const [rollingAvg, setRollingAvg] = useState("-")

    useEffect(() => {

        if (!recording) return

        const timer = setInterval(async () => {

            try {

                const res = await fetch(ENDPOINT)
                const text = await res.text()
                const weight = parseFloat(text)

const time = ((Date.now() - startTime.current) / 1000).toFixed(2)

                setLastValue(weight)

                setData(prev => {

                    const newData = [...prev, { time, weight }].slice(-200)

                    const recent = newData.slice(-20)

                    const avg =
                        recent.reduce((a, b) => a + b.weight, 0) /
                        recent.length

                    setRollingAvg(avg.toFixed(2))

                    return newData
                })

            } catch (e) {
                console.log(e)
            }

        }, 100)

        return () => clearInterval(timer)

    }, [recording])

    const saveCSV = () => {

        const rows = data.map(d => `${d.time},${d.weight}`).join("\n")
        const blob = new Blob([`time,weight\n${rows}`], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "weight.csv"
        a.click()
    }
const clearGraph = () => {
    setData([])
    setLastValue("-")
    setRollingAvg("-")
}
    if (!open) return null

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
<div className="flex items-center gap-2 mb-4">

<div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

<span className="text-sm text-gray-600">
Live Sensor Stream
</span>

</div>
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-500 hover:text-black"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-bold text-[#0071B6] mb-6">
                    Load Cell Monitor
                </h2>

                {/* GRAPH */}

                <div className="w-full h-[280px] mb-6">

<ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>

        <defs>
            <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

                            <CartesianGrid stroke="#dbeafe" strokeDasharray="4 4" />

                            <XAxis
                                dataKey="time"
                                tick={{ fill: "#0071B6", fontSize: 12 }}
                                label={{ value: "Time (s)", position: "insideBottom", offset: -5 }}
                            />

                            <YAxis
                                tick={{ fill: "#0071B6", fontSize: 12 }}
                                label={{
                                    value: "Force (grams)",
                                    angle: -90,
                                    position: "insideLeft"
                                }}
                            />

<Tooltip
  contentStyle={{
    background: "rgba(255,255,255,0.9)",
    border: "1px solid #0071B6",
    borderRadius: "10px"
  }}
  formatter={(value) => [`${value} g`, "Force"]}
  labelFormatter={(label) => `Time: ${label}s`}
/>

                            <Line
                                type="monotone"
                                dataKey="weight"
                                stroke="#0071B6"
                                strokeWidth={4}
                                dot={false}
                                style={{ filter: "url(#glow)" }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

                {/* STATS */}

                <div className="grid grid-cols-3 gap-4 mb-6">

                    <div className="bg-white/60 backdrop-blur border border-blue-200 p-4 rounded-lg text-center">
                        Last: <b>{lastValue}</b>
                    </div>

                    <div className="bg-white/60 backdrop-blur border border-blue-200 p-4 rounded-lg text-center">
                        Rolling Avg: <b>{rollingAvg}</b>
                    </div>

                    <div className="bg-white/60 backdrop-blur border border-blue-200 p-4 rounded-lg text-center">
                        Count: <b>{data.length}</b>
                    </div>

                </div>

                {/* BUTTONS */}

                <div className="flex justify-center gap-4 flex-wrap">

<button
  onClick={() => {
    startTime.current = Date.now()
    setRecording(true)
  }}
                        className="
bg-blue-600
hover:bg-blue-700
shadow-lg
hover:shadow-blue-400/40
transition-all
duration-200
text-white px-6 py-3 rounded-lg
"
                    >
                        Start
                    </button>

<button
  onClick={() => setRecording(false)}
  className="
bg-red-500
hover:bg-red-600
shadow-lg
hover:shadow-red-400/40
transition-all
duration-200
text-white
px-6 py-3
rounded-lg
"
>
Stop
</button>

<button
  onClick={saveCSV}
  className="
bg-green-600
hover:bg-green-700
shadow-lg
hover:shadow-green-400/40
transition-all
duration-200
text-white
px-6 py-3
rounded-lg
"
>
Save CSV
</button>
<button
  onClick={clearGraph}
  className="
bg-gray-600
hover:bg-gray-700
shadow-lg
hover:shadow-gray-400/40
transition-all
duration-200
text-white
px-6 py-3
rounded-lg
"
>
Clear
</button>
                </div>

            </div>

        </div>
    )
}