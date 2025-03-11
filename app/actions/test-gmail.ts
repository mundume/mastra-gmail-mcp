"use server";
import { clerkClient, currentUser } from "@clerk/nextjs/server";

export async function testGmail() {
  try {
    const user = await currentUser();
    const access = await clerkClient();
    if (!user) {
      throw new Error("No user found");
    }
    const token = await access.users.getUserOauthAccessToken(user.id, "google");
    if (token.totalCount < 1) throw new Error("No tokens for user");
    const accessToken = token.data[0].token;
    const response = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching Gmail messages:", error.message);
      throw error;
    }
  }
}
