import fs from "fs";
import path from "path";

import { NextResponse } from "next/server";

export async function GET(request) {
  if (request.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  const filePath = path.join(process.cwd(), "tweets.json");
  let tweets = [];

  if (fs.existsSync(filePath)) {
    tweets = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } else {
    return NextResponse.json({ message: "No tweets found" }, { status: 404 });
  }

  return NextResponse.json({ tweets }, { status: 200 });
}
