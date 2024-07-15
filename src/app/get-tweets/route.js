import { NextResponse } from "next/server";
import dbConnect from "../lib/mongodb";
import Tweets from "../models/Tweets";

dbConnect();

export async function GET(request) {
  if (request.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const tweets = await Tweets.find({});
    return NextResponse.json({ tweets }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return NextResponse.json(
      { message: "Failed to fetch tweets" },
      { status: 500 }
    );
  }
}
