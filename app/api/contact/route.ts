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
  //
  // Option A — Resend (recommended, simplest):
  //
  //   if (process.env.RESEND_API_KEY) {
  //     const res = await fetch("https://api.resend.com/emails", {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         from: "JJZ TECH Site <noreply@jjztech.ph>",
  //         to: [to],
  //         reply_to: email,
  //         subject: fullSubject,
  //         text: body_text,
  //       }),
  //     });
  //     if (!res.ok) {
  //       const detail = await res.text();
  //       return NextResponse.json(
  //         { ok: false, error: "Email service failed", detail },
  //         { status: 502 },
  //       );
  //     }
  //     return NextResponse.json({ ok: true, mode: "sent" });
  //   }
  //
  // Option B — generic SMTP via nodemailer:
  //
  //   if (process.env.SMTP_HOST) {
  //     const nodemailer = await import("nodemailer");
  //     const transporter = nodemailer.createTransport({
  //       host: process.env.SMTP_HOST,
  //       port: Number(process.env.SMTP_PORT ?? 587),
  //       secure: process.env.SMTP_SECURE === "1",
  //       auth: process.env.SMTP_USER
  //         ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  //         : undefined,
  //     });
  //     await transporter.sendMail({
  //       from: `"${name}" <${process.env.SMTP_USER}>`,
  //       to,
  //       replyTo: email,
  //       subject: fullSubject,
  //       text: body_text,
  //     });
  //     return NextResponse.json({ ok: true, mode: "smtp" });
  //   }

  // Default: log only (replace with one of the options above).
  console.log("[contact] would send email to", to);
  console.log("[contact] subject:", fullSubject);
  console.log("[contact] body:", body_text);

  return NextResponse.json({ ok: true, mode: "logged" });
}
