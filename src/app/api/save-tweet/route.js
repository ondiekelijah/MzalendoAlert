import { NextResponse } from "next/server";
import dbConnect from "../../lib/mongodb";
import Tweets from "../../models/Tweets";

dbConnect();

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
  if (!tweetId) {
    return NextResponse.json({ message: "Missing tweetId" }, { status: 400 });
  }

  // Check if the tweetId already exists in the collection
  const existingTweet = await Tweets.findOne({
    tweetId,
  });
  if (existingTweet) {
    return NextResponse.json(
      { message: "Report already exists" },
      { status: 409 }
    ); // 409 Conflict
  }

  // Insert the new tweet
  try {
    await Tweets.create({ tweetId });
    return NextResponse.json(
      { message: "Thank you! Your report has been successfully submitted!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error inserting tweet:", error);
    return NextResponse.json(
      { message: "Failed to submit report" },
      { status: 500 } // Internal Server Error
    );
  }
}
