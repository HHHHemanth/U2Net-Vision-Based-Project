const API_BASE = "http://localhost:8000/api"

export async function captureMeasure() {
  const res = await fetch(`${API_BASE}/capture-measure`, {
    method: "POST"
  })
  return await res.json()
}

export async function saveImage(data) {
  const res = await fetch(`${API_BASE}/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  return await res.json()
}