export async function GET() {

  try {

    const res = await fetch("http://192.168.4.22/data", {
      cache: "no-store"
    })

    const data = await res.json()

    return Response.json(data)

  } catch (err) {

    return Response.json({
      ok: 0,
      error: "sensor unreachable"
    })

  }

}