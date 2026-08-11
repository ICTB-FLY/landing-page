"use client";

import { FormEvent } from "react";
import { ArrowRight } from "lucide-react";

const WA_NUMBER = "6282295495489";

export default function ContactProposalForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();

    const text = `Nama Lengkap: ${name}\nProject Details : ${details}`;
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <form className="mt-9 space-y-7" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-xs font-semibold tracking-wide text-[var(--body-muted)]"
        >
          Nama Lengkap
        </label>
        <input
          id="name"
          name="name"
          required
          className="input-line"
          placeholder="Nama Anda"
          autoComplete="name"
        />
      </div>
      <div>
        <label
          htmlFor="details"
          className="mb-1 block text-xs font-semibold tracking-wide text-[var(--body-muted)]"
        >
          Project Details
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          required
          className="input-line resize-none"
          placeholder="Jelaskan kebutuhan proyek Anda..."
        />
      </div>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Submit Proposal
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
