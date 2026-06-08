import { saveImage } from "../services/api"

export default function ResultViewer({ result }) {

  if (!result) {
    return (
      <div className="mt-10 flex flex-col items-center justify-center gap-4 text-center">
        <div className="relative flex h-14 w-14 items-center justify-center">
          <span className="absolute h-full w-full rounded-full bg-red-400/30 animate-ping" />
          <span className="h-5 w-5 rounded-full bg-red-500 shadow-[0_0_18px_rgba(239,68,68,0.75)]" />
        </div>
        <div>
          <div className="font-semibold text-slate-600">No measurement yet</div>
          <div className="mt-1 text-xs text-slate-400">Capture is standing by</div>
        </div>
      </div>
    )
  }

  const handleSave = async () => {
    await saveImage(result)
    alert("Saved successfully")
  }

  return (

    <div>

      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-blue-700">
          Measurement Result
        </h2>
        <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.8)]" />
          READY
        </div>
      </div>

<img
  src={`data:image/jpeg;base64,${result.annotated_image}`}
  className="rounded-lg border w-full h-auto"
/>
      <div className="mt-6 space-y-3">

        <div className="bg-blue-50 rounded-lg p-3 transition-transform duration-200 hover:scale-[1.02]">
          Diameter: <b>{result.diameter_mm} mm</b>
        </div>

        <div className="bg-blue-50 rounded-lg p-3 transition-transform duration-200 hover:scale-[1.02]">
          Distance: <b>{result.distance_mm} mm</b>
        </div>

      </div>

      <button
        onClick={handleSave}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
      >
        Save Result
      </button>

    </div>

  )
}
