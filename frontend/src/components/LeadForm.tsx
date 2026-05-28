import { ArrowRight } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import {
  getProgramById,
  images,
  programs,
  selectedProgramStorageKey,
} from "../data/siteData";
import type { ProgramId } from "../data/siteData";
import { useCountdown } from "../hooks/useCountdown";

type SubmitState = "idle" | "sending" | "success" | "error";

export function LeadForm({
  compact = false,
  selectedProgramId,
  onSubmitted,
}: {
  compact?: boolean;
  selectedProgramId?: ProgramId;
  onSubmitted?: () => void;
}) {
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [programId, setProgramId] = useState<ProgramId>(selectedProgramId ?? programs[0].id);
  const countdown = useCountdown("2026-06-14T09:00:00+03:00");

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "");
    if (!digits) {
      return "";
    }

    const normalized = digits.startsWith("8") ? `7${digits.slice(1)}` : digits;
    const country = normalized.startsWith("7") ? "+7" : `+${normalized.slice(0, 1)}`;
    const local = normalized.startsWith("7") ? normalized.slice(1) : normalized.slice(1);

    if (normalized.startsWith("7")) {
      const part1 = local.slice(0, 3);
      const part2 = local.slice(3, 6);
      const part3 = local.slice(6, 8);
      const part4 = local.slice(8, 10);
      let result = country;

      if (part1) {
        result += ` (${part1}`;
      }
      if (part1 && part1.length === 3) {
        result += ")";
      }
      if (part2) {
        result += ` ${part2}`;
      }
      if (part3) {
        result += `-${part3}`;
      }
      if (part4) {
        result += `-${part4}`;
      }

      return result;
    }

    return `+${normalized}`;
  }

  useEffect(() => {
    if (selectedProgramId) {
      setProgramId(selectedProgramId);
    }
  }, [selectedProgramId]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const consent = form.get("consent") === "on";

    if (!consent) {
      setState("error");
      setError("Нужно согласие на обработку персональных данных.");
      return;
    }

    setState("sending");
    setError("");

    const selectedProgram = getProgramById(programId);
    window.localStorage.setItem(selectedProgramStorageKey, selectedProgram.id);

    const payload = {
      source: compact ? "hero" : "request",
      parent_name: String(form.get("name") || ""),
      phone: String(form.get("phone") || ""),
      child_age: Number(form.get("age")),
      program: selectedProgram.id,
      program_title: selectedProgram.title,
      program_date: selectedProgram.date,
      program_price: selectedProgram.price,
      consent,
      page_url: window.location.href,
    };

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "/api/v1";
      const response = await fetch(`${baseUrl}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Не удалось отправить заявку");
      }

      formElement.reset();
      setPhone("");
      setProgramId(selectedProgram.id);
      setState("success");
      onSubmitted?.();
    } catch (submitError) {
      setState("error");
      setError(submitError instanceof Error ? submitError.message : "Не удалось отправить заявку");
    }
  }

  return (
    <form
      className={`lead-form ${compact ? "lead-form--compact" : ""}`}
      style={compact ? ({ "--form-bg": `url("${images.formBg}")` } as CSSProperties) : undefined}
      onSubmit={submit}
    >
      {compact && <span className="form-kicker">Персональная консультация</span>}
      <h2>Получить программу и забронировать место</h2>
      {compact && (
        <div className="hero-offer">
          <span>До первой поездки</span>
          <strong>
            {countdown.days} дн. {countdown.hours} ч. {countdown.minutes} мин.
          </strong>
          <small>Получите подробную программу и условия участия</small>
        </div>
      )}
      <div className="form-grid">
        <label>
          <span>Имя родителя</span>
          <input name="name" required minLength={2} placeholder="Анна Иванова" autoComplete="name" />
        </label>
        <label>
          <span>Телефон</span>
          <input
            name="phone"
            required
            inputMode="tel"
            placeholder="+7 (999) 123-45-67"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(formatPhone(event.target.value))}
          />
        </label>
        <label>
          <span>Возраст ребенка</span>
          <input name="age" required type="number" min={7} max={17} placeholder="12" />
        </label>
        <label>
          <span>Интересующая программа</span>
          <select value={programId} onChange={(event) => setProgramId(event.target.value as ProgramId)}>
            {programs.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="consent">
        <input name="consent" type="checkbox" required defaultChecked />
        <span>Я согласен на обработку персональных данных</span>
      </label>
      <button className="primary-button" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Отправляем..." : "Получить программу"}
        <ArrowRight size={18} />
      </button>
      {state === "success" && <p className="form-message form-message--success">Заявка отправлена. Куратор скоро свяжется с вами.</p>}
      {state === "error" && <p className="form-message">{error}</p>}
    </form>
  );
}
