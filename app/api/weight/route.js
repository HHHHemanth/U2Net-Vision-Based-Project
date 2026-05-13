export async function GET() {

  // simulate load cell signal
  const base = 1500          // base force
  const noise = Math.random() * 100 - 50
  const wave = Math.sin(Date.now() / 500) * 300

  const weight = base + noise + wave

  return new Response(weight.toFixed(2), {
    headers: { "Content-Type": "text/plain" }
  })
}