import { NextResponse } from "next/server";

// Destination email kept securely on server-side only
const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL || "reyanshbhardwaj.2005@gmail.com";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const res = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: String(name).trim(),
        email: String(email).trim(),
        message: String(message).trim(),
        _subject: `Portfolio Message from ${String(name).trim()}`,
        _replyto: String(email).trim(),
        _template: "table",
      }),
    });

    const data = await res.json().catch(() => ({}));

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (err: any) {
    console.error("API contact error:", err);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}
