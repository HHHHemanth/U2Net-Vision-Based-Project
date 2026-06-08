import { captureMeasure } from "../services/api"

export default function CapturePanel({ setResult }) {

  const handleCapture = async () => {
    const data = await captureMeasure()
    setResult(data)
  }

  return (

    <div className="flex justify-center mt-6">

<button
  onClick={handleCapture}
  className="primary-btn w-full px-6 py-3 rounded-lg text-white lg:text-lg font-semibold cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
>
  Capture & Measure
</button>

    </div>

  )
}