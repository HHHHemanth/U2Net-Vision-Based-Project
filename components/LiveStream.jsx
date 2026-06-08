"use client"

import { useState } from "react"

export default function LiveStream() {
  const [streamStatus, setStreamStatus] = useState("connecting")
  const isLive = streamStatus === "live"

  return (

    <div className="relative rounded-lg overflow-hidden border bg-black shadow-inner">

      <div className="absolute left-3 top-3 z-10 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
        <span
          className={`h-2.5 w-2.5 rounded-full ${isLive ? "bg-green-400 animate-pulse shadow-[0_0_14px_rgba(74,222,128,0.9)]" : "bg-red-500 animate-pulse shadow-[0_0_14px_rgba(239,68,68,0.9)]"}`}
        />
        {isLive ? "LIVE STREAM" : "STREAM CHECK"}
      </div>

      <img
        src="http://localhost:8000/api/stream"
        className="w-full h-auto"
        alt="Live Stream"
        onLoad={() => setStreamStatus("live")}
        onError={() => setStreamStatus("error")}
      />

    </div>

  )
}
