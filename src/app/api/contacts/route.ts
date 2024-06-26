import { NextResponse } from "next/server";
import { authorizedFetch, safe } from "./misc";

const resourceServerUri = "http://localhost:8080/api/contacts"

export async function GET() {
  return safe(async () => {
    const fetchRequest = await authorizedFetch(resourceServerUri);
    if (!fetchRequest.ok)
      return new NextResponse(await fetchRequest.text(), { status: fetchRequest.status })
    return NextResponse.json(await fetchRequest.json());
  });
}

export async function POST(request: Request) {
  return safe(async () => {
    const settings: object = {
      method: "POST",
      body: request.body,
      headers: {
        ["Content-Type"]: "application/json"
      }
    }
    const fetchRequest = await authorizedFetch(resourceServerUri, settings);
    return new NextResponse(null, { status: fetchRequest.status });
  });
}