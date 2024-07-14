import fs from "fs";
import path from "path";

import { NextResponse } from "next/server";

export async function POST(request) {
  if (request.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch (error) {
    console.error("Error parsing request body:", error);
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { tweetId } = body;
  const filePath = path.join(process.cwd(), "tweets.json");
  let tweets = [];

  if (fs.existsSync(filePath)) {
    tweets = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  // Check if the tweetId already exists in the array
  if (tweets.some(tweet => tweet.tweetId === tweetId)) {
    return NextResponse.json(
      { message: "Report already exists" },
      { status: 409 } // 409 Conflict
    );
  }

  tweets.push({ tweetId });
  fs.writeFileSync(filePath, JSON.stringify(tweets, null, 2));

  return NextResponse.json(
    { message: "Report successfully added!" },
    { status: 200 }
  );
}

