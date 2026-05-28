import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { profile } from "@/content/profile";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  subject: z.string().min(2).max(120),
  message: z.string().min(10).max(5000),
  honey: z.string().optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { name, email, subject, message, honey } = parsed.data;

  if (honey && honey.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? profile.email;

  if (!apiKey || !from) {
    console.warn(
      "[contact] Resend not configured — set RESEND_API_KEY and CONTACT_FROM_EMAIL",
    );
    return NextResponse.json(
      { error: "Contact channel not configured yet. Please email instead." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);

  try {
    const html = `
      <div style="font-family:ui-sans-serif,system-ui,sans-serif;color:#0a0a0a;">
        <h2 style="margin:0 0 16px;font-weight:500;">New message from portfolio</h2>
        <table style="border-collapse:collapse;width:100%;font-size:14px;">
          <tr><td style="padding:6px 0;color:#737373;">From</td><td>${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</td></tr>
          <tr><td style="padding:6px 0;color:#737373;">Subject</td><td>${escapeHtml(subject)}</td></tr>
        </table>
        <hr style="border:none;border-top:1px solid #e5e5e5;margin:16px 0;" />
        <pre style="white-space:pre-wrap;font-family:inherit;font-size:14px;line-height:1.6;margin:0;">${escapeHtml(message)}</pre>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `[portfolio] ${subject}`,
      html,
      text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json(
        { error: "Email failed to send. Try again or email directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error("[contact] Unhandled error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
