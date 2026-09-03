"use client";

import { useState } from "react";
import {
  Loader2,
  Mail,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { FacebookIcon, InstagramIcon } from "./brand-icons";
import {
  EMAIL_TO,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  MESSENGER_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "./site-data";
import { ScrollReveal, StaggerReveal, StaggerItem } from "@/components/ui/scroll-reveal";
import { SectionContainer, SectionHeader } from "./section-header";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((s) => ({ ...s, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Failed to send");
      }
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to send. Try again.",
      );
    }
  };

  return (
    <section
      id="contact"
      className="bg-stone-50 border-t border-stone-200 py-12 md:py-16 jjz-defer"
    >
      <SectionContainer>
        <SectionHeader
          eyebrow="Contact us"
          title="Let's talk about your device."
          lede="Send us a message and we'll get back to you within the day. For
          urgent repairs, message us on Messenger or call directly."
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="lg:col-span-3 rounded-2xl border border-zinc-200 bg-white p-5 md:p-6 space-y-3"
            noValidate
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field
                id="name"
                label="Your name"
                value={form.name}
                onChange={update("name")}
                required
              />
              <Field
                id="email"
                type="email"
                label="Email"
                value={form.email}
                onChange={update("email")}
                required
              />
            </div>
            <Field
              id="subject"
              label="Subject"
              value={form.subject}
              onChange={update("subject")}
              placeholder="e.g. iPhone 13 screen replacement"
            />
            <div>
              <label
                htmlFor="message"
                className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1"
              >
                Message <span className="text-amber-700">*</span>
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={update("message")}
                placeholder="Tell us about your device and the issue…"
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400 resize-none"
                suppressHydrationWarning
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
              <p className="text-xs text-zinc-500">
                Or email us directly at{" "}
                <a
                  href={`mailto:${EMAIL_TO}`}
                  className="text-amber-700 hover:underline font-semibold"
                >
                  {EMAIL_TO}
                </a>
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-zinc-950 font-semibold shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 transition-shadow text-xs disabled:opacity-60 disabled:cursor-not-allowed"
                suppressHydrationWarning
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Send message
                  </>
                )}
              </button>
            </div>

            {status === "success" && (
              <p
                role="status"
                className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2"
              >
                Thanks — we received your message. We'll reply soon.
              </p>
            )}
            {status === "error" && (
              <p
                role="alert"
                className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
              >
                {errorMsg || "Something went wrong."}
              </p>
            )}
          </form>

          {/* Socials column */}
          <aside className="lg:col-span-2 space-y-2.5">
            <h3 className="text-base font-semibold text-zinc-900">
              Reach us directly
            </h3>
            <p className="text-xs text-zinc-600">
              For the fastest response, message us on Messenger or call.
            </p>

            <SocialCard
              href={MESSENGER_URL}
              icon={<MessageCircle className="w-4 h-4" />}
              label="Messenger"
              handle="@jjztech"
              highlight
            />
            <SocialCard
              href={`tel:${PHONE_TEL}`}
              icon={<Phone className="w-4 h-4" />}
              label="Call us"
              handle={PHONE_DISPLAY}
            />
            <SocialCard
              href={`mailto:${EMAIL_TO}`}
              icon={<Mail className="w-4 h-4" />}
              label="Email"
              handle={EMAIL_TO}
            />
            <SocialCard
              href={FACEBOOK_URL}
              icon={<FacebookIcon className="w-4 h-4" />}
              label="Facebook"
              handle="Follow our page"
            />
            <SocialCard
              href={INSTAGRAM_URL}
              icon={<InstagramIcon className="w-4 h-4" />}
              label="Instagram"
              handle="@jjztech"
            />
          </aside>
        </div>
      </SectionContainer>
    </section>
  );
}

function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1"
      >
        {label} {required && <span className="text-amber-700">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-400"
        // See HydrationSafeButtons — password managers / autofill
        // heuristics inject `fdprocessedid` on form fields at runtime.
        suppressHydrationWarning
      />
    </div>
  );
}

function SocialCard({
  href,
  icon,
  label,
  handle,
  highlight,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  handle: string;
  highlight?: boolean;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className={
        "group flex items-center gap-2.5 rounded-xl border p-2.5 transition-all hover:-translate-y-0.5 hover:shadow-md " +
        (highlight
          ? "border-amber-300 bg-gradient-to-r from-amber-50 to-amber-100/60 hover:shadow-amber-500/15"
          : "border-zinc-200 bg-white hover:border-amber-300 hover:shadow-amber-500/5")
      }
    >
      <span
        className={
          "inline-flex w-8 h-8 items-center justify-center rounded-lg shrink-0 " +
          (highlight
            ? "bg-amber-500 text-zinc-950"
            : "bg-amber-50 text-amber-700")
        }
      >
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-sm font-semibold text-zinc-900">
          {label}
        </span>
        <span className="block text-xs text-zinc-500 truncate">{handle}</span>
      </span>
      <span className="text-amber-700 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
        →
      </span>
    </a>
  );
}

export default ContactForm;
