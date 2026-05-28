"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";
import type { Dict } from "@/i18n/dictionaries";

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short").max(80),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(2, "Subject too short").max(120),
  message: z.string().min(10, "Message too short").max(5000),
  honey: z.string().optional(),
});

type FormValues = z.infer<typeof contactSchema>;

export function ContactForm({ dict }: { dict: Dict["contact"] }) {
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          toast.error(data?.error || dict.errGeneric);
          return;
        }
        toast.success(dict.sentOk);
        reset();
        setDone(true);
      } catch {
        toast.error(dict.errNetwork);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
      aria-busy={isPending}
    >
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        {...register("honey")}
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={dict.name} error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            placeholder={dict.namePh}
            className={inputCls}
            {...register("name")}
          />
        </Field>
        <Field label={dict.email} error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            placeholder={dict.emailPh}
            className={inputCls}
            {...register("email")}
          />
        </Field>
      </div>
      <Field label={dict.subject} error={errors.subject?.message}>
        <input
          type="text"
          placeholder={dict.subjectPh}
          className={inputCls}
          {...register("subject")}
        />
      </Field>
      <Field label={dict.message} error={errors.message?.message}>
        <textarea
          rows={6}
          placeholder={dict.messagePh}
          className={cn(inputCls, "resize-y")}
          {...register("message")}
        />
      </Field>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm text-background transition-colors hover:bg-foreground/90 disabled:opacity-60"
        >
          {isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {dict.sending}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {dict.send}
            </>
          )}
        </button>
        {done && (
          <span className="font-mono text-xs text-muted-foreground">
            {dict.sentAgain}
          </span>
        )}
      </div>
    </form>
  );
}

const inputCls =
  "block w-full rounded-md border border-border bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1 block font-mono text-[11px] text-red-500">
          {error}
        </span>
      )}
    </label>
  );
}
