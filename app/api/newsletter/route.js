import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ message: "Email is required" }), {
        status: 400,
      });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Cyclopedia" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: "New Newsletter Subscription",
      text: `New subscriber: ${email}`,
    });

    return new Response(
      JSON.stringify({ message: "Subscribed successfully!" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Nodemailer error:", err);
    return new Response(JSON.stringify({ message: "Failed to subscribe" }), {
      status: 500,
    });
  }
}
