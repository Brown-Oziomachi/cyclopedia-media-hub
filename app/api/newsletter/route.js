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

    // ✅ 1. Save subscriber in Firestore
    await addDoc(collection(db1, "subscribers"), {
      firstName: firstName || "",
      lastName: lastName || "",
      email,
      createdAt: new Date(),
    });

    // ✅ 2. Send confirmation email to subscriber
    await resend.emails.send({
      from: "Cyclopedia <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to Cyclopedia 🚀",
      html: `
        <h2>Hello ${firstName || "Friend"},</h2>
        <p>Thanks for subscribing to <b>Cyclopedia</b>! 🎉</p>
        <p>You’ll now get the latest blogs, news, and updates right in your inbox.</p>
        <br/>
        <p>– The Cyclopedia Team</p>
      `,
    });

    // ✅ 3. Notify admin (you)
    await resend.emails.send({
      from: "Cyclopedia <onboarding@resend.dev>",
      to: "youremail@example.com", // 🔹 replace with your admin email
      subject: "New Subscriber to Cyclopedia 📩",
      html: `
        <h3>New Subscriber Alert 🚨</h3>
        <p><b>Name:</b> ${firstName || ""} ${lastName || ""}</p>
        <p><b>Email:</b> ${email}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error subscribing:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
