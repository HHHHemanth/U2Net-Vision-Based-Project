export default function LiveStream() {
  return (

    <div className="rounded-lg overflow-hidden border bg-black">

      <img
        src="http://localhost:8000/api/stream"
        className="w-full h-auto"
        alt="Live Stream"
      />

    </div>

  )
}