"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Send, CheckCircle, AlertCircle } from "@/components/ui/Icon";

type State = "idle" | "sending" | "sent" | "error" | "invalid";

export type FormLabels = Record<"name" | "email" | "message" | "trap" | "notice" | "noticeLink" | "submit" | "sending" | "sent" | "error" | "invalid", string>;

export function ContactForm({ idPrefix = "f", labels, privacyHref }: { idPrefix?: string; labels: FormLabels; privacyHref: string }) {
  const t = (key: keyof FormLabels) => labels[key];
  const [state, setState] = useState<State>("idle");
  const token = useRef<string>("");
  const status = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/contact", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { token?: string } | null) => {
        if (alive && d?.token) token.current = d.token;
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (state === "sent" || state === "error" || state === "invalid") status.current?.focus();
  }, [state]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const body = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      website: String(data.get("website") ?? ""),
      token: token.current,
    };
    if (!body.name || !/^\S+@\S+\.\S+$/.test(body.email) || body.message.length < 10) {
      setState("invalid");
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setState("sent");
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={`${idPrefix}-status`}>
      <label className="field">
        <span>{t("name")}</span>
        <input type="text" name="name" autoComplete="name" required maxLength={120} />
      </label>
      <label className="field">
        <span>{t("email")}</span>
        <input type="email" name="email" autoComplete="email" required maxLength={200} />
      </label>
      <label className="field">
        <span>{t("message")}</span>
        <textarea name="message" required minLength={10} maxLength={4000} />
      </label>
      <div className="hp" aria-hidden="true">
        <label>
          {t("trap")}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <p className="notice">
        {t("notice")} <a href={privacyHref}>{t("noticeLink")}</a>
      </p>
      <div>
        <button className="btn primary" type="submit" disabled={state === "sending"}>
          <Send className="ic" aria-hidden="true" />
          {state === "sending" ? t("sending") : t("submit")}
        </button>
      </div>
      <p id={`${idPrefix}-status`} ref={status} tabIndex={-1} role="status" aria-live="polite" className={`form-status ${state}`}>
        {state === "sent" && (
          <>
            <CheckCircle className="ic" aria-hidden="true" /> {t("sent")}
          </>
        )}
        {state === "error" && (
          <>
            <AlertCircle className="ic" aria-hidden="true" /> {t("error")}
          </>
        )}
        {state === "invalid" && (
          <>
            <AlertCircle className="ic" aria-hidden="true" /> {t("invalid")}
          </>
        )}
      </p>
    </form>
  );
}
