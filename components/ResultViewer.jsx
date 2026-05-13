import { saveImage } from "../services/api"

export default function ResultViewer({ result }) {

  if (!result) {
    return (
      <div className="text-gray-400 text-center mt-10">
        No measurement yet
      </div>
    )
  }

  const handleSave = async () => {
    await saveImage(result)
    alert("Saved successfully")
  }

  return (

    <div>

      <h2 className="text-lg font-semibold text-blue-700 mb-4">
        Measurement Result
      </h2>

<img
  src={`data:image/jpeg;base64,${result.annotated_image}`}
  className="rounded-lg border w-full h-auto"
/>
      <div className="mt-6 space-y-3">

        <div className="bg-blue-50 rounded-lg p-3">
          Diameter: <b>{result.diameter_mm} mm</b>
        </div>

        <div className="bg-blue-50 rounded-lg p-3">
          Distance: <b>{result.distance_mm} mm</b>
        </div>

      </div>

      <button
        onClick={handleSave}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
      >
        Save Result
      </button>

    </div>

  )
}