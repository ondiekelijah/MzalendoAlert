import { NextResponse } from "next/server";
import dbConnect from "../../lib/mongodb";
import Tweets from "../../models/Tweets";

dbConnect();

export async function GET(request) {
  if (request.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  // Extract query parameters from the request URL
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10); // Default to page 1 if not specified
  const limit = parseInt(url.searchParams.get("limit") || "10", 10); // Default to 10 tweets per page if not specified
  const skip = (page - 1) * limit; // Calculate the number of documents to skip

  try {
    const [tweets, total] = await Promise.all([
      Tweets.find({}).sort({ createdAt: -1 }).skip(skip).limit(limit), // Apply pagination
      Tweets.countDocuments({}), // Get total count of tweets
    ]);
    return NextResponse.json({ tweets, total }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return NextResponse.json(
      { message: "Failed to fetch tweets" },
      { status: 500 }
    );
  }
}

export const revalidate = 10;
