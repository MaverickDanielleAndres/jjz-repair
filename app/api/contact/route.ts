import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: NextRequest) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();

  if (!name || name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Please enter your name." },
      { status: 400 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 },
    );
  }
  if (!message || message.length < 5) {
    return NextResponse.json(
      { ok: false, error: "Please enter a message." },
      { status: 400 },
    );
  }

  const to =
    process.env.CONTACT_EMAIL_TO ?? process.env.MAIL_TO ?? "jjztechph@gmail.com";
  const fullSubject = subject
    ? `[JJZ TECH Contact] ${subject}`
    : `[JJZ TECH Contact] New message from ${name}`;
  const body_text = [
    `From: ${name} <${email}>`,
    `Subject: ${subject || "(none)"}`,
    "",
    message,
  ].join("\n");

  // ─── Wire your email service below ────────────────────────────

  if (process.env.RESEND_API_KEY) {
    const htmlContent = `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
        <h2 style="color: #111827; margin-top: 0; font-size: 20px; font-weight: 600;">New Contact Form Submission</h2>
        <p style="color: #4b5563; font-size: 14px; margin-bottom: 24px;">You have received a new message from the JJZ TECH website contact form.</p>
        
        <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 24px; border: 1px solid #f3f4f6;">
          <p style="margin: 0 0 12px 0; color: #374151; font-size: 14px;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 0 0 12px 0; color: #374151; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a></p>
          <p style="margin: 0; color: #374151; font-size: 14px;"><strong>Subject:</strong> ${subject || "(None)"}</p>
        </div>
        
        <h3 style="color: #111827; font-size: 16px; font-weight: 600; margin-bottom: 12px;">Message:</h3>
        <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; white-space: pre-wrap; font-family: inherit; font-size: 14px; color: #374151; line-height: 1.6; border: 1px solid #f3f4f6;">
          ${message}
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
          This email was sent automatically from the JJZ TECH Contact Form.
        </p>
      </div>
    `;

    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `JJZ TECH Site <${fromEmail}>`,
        to: [to],
        reply_to: email,
        subject: fullSubject,
        text: body_text,
        html: htmlContent,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[contact] Resend API error:", detail);
      return NextResponse.json(
        { ok: false, error: "Email service failed", detail },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, mode: "sent" });
  }

  // Fallback if no API key is provided
  console.log("[contact] RESEND_API_KEY not set. Would send email to", to);
  console.log("[contact] subject:", fullSubject);
  console.log("[contact] body:", body_text);

  return NextResponse.json({ ok: true, mode: "logged" });
}
