// app/api/upload-photo/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const formData = await req.formData();
  const image = formData.get("photo");
  const language = formData.get("language");

  if (!image || !language) {
    return NextResponse.json(
      { error: "Image and language are required!" },
      { status: 400 }
    );
  }

  // Here, you would send the image to your backend (Django API) for processing.
  // For now, we'll mock the response.

  const recommendations = [
    {
      title: "Song 1",
      artist: "Artist 1",
      albumArt: "https://via.placeholder.com/150",
    },
    {
      title: "Song 2",
      artist: "Artist 2",
      albumArt: "https://via.placeholder.com/150",
    },
  ];

  return NextResponse.json({ recommendations });
}
