import { NextResponse } from "next/server";
import { Resend } from "resend";
import { collection, addDoc } from "firebase/firestore";
import { db1 } from "@/lib/firebaseConfig";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { firstName, lastName, email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    //  1. Save subscriber in Firestore
    await addDoc(collection(db1, "subscribers"), {
      firstName: firstName || "",
      lastName: lastName || "",
      email,
      createdAt: new Date(),
    });

await resend.emails.send({
  from: 'The Cyclopedia <info@thecyclopedia.com.ng>',
  to: email,
  subject: "Welcome to The Cyclopedia 🚀",
  html: `
    <h2>Hello ${firstName || "Friend"},</h2>
    <p>Welcome to <b>The Cyclopedia</b>! 👁️</p>
    <p>We’re thrilled to have you on board. As a subscriber, you’ll get the latest news, insightful articles, and trending news delivered straight to your inbox.</p>
    <p>Explore, discover, and stay informed with content curated just for you. Don’t forget to visit our website to catch the newest updates and hidden insights!</p>
    <p style="text-align:center; margin:30px 0;">
      <a href="https://cyclopedia-media-hub.vercel.app/global"
         style="display:inline-block; padding:12px 25px; background-color:#4F46E5; color:#ffffff; text-decoration:none; border-radius:6px; font-weight:bold;">
        Explore The Latest News
      </a>
    </p>
    <br/>
    <p>Warm regards,<br/>
    The Cyclopedia Team</p>
      `,
});

    await resend.emails.send({
      from: "Cyclopedia <onboarding@resend.dev>",
      to: "browncemmanuel@gmail.com", 
      subject: "Hello Admin, New Subscriber to The Cyclopedia",
      html: `
        <h3>New Subscriber Alert 🚨</h3>
        <p><b>Name:</b> ${firstName || ""} ${lastName || ""}</p>
        <p><b>Email:</b> ${email}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error subscribing:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
