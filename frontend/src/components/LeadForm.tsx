import {
  ArrowRight,
  Camera,
  Check,
  Compass,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Rocket,
  UserRound,
  UsersRound,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import {
  availablePrograms,
  getDefaultProgram,
  getProgramById,
  images,
  selectedProgramStorageKey,
} from "../data/siteData";
import type { ProgramId } from "../data/siteData";
import { useCountdown } from "../hooks/useCountdown";

type SubmitState = "idle" | "sending" | "success" | "error";
type InterestId = "technology" | "education" | "impressions" | "choosing";

const interests: Array<{
  id: InterestId;
  label: string;
  icon: typeof Rocket;
  programId?: ProgramId;
}> = [
  { id: "technology", label: "Технологии и будущее", icon: Rocket, programId: "nanjing-shanghai" },
  { id: "education", label: "Образование и развитие", icon: GraduationCap, programId: "nanjing-shanghai" },
  { id: "impressions", label: "Новые впечатления", icon: Camera, programId: "chongqing-yangtze" },
  { id: "choosing", label: "Пока выбираем", icon: Compass },
];

function getInterestForProgram(programId: ProgramId): InterestId {
  if (programId === "chongqing-yangtze") return "impressions";
  if (programId === "nanjing-shanghai") return "technology";
  return "choosing";
}

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
  const initialProgram = getProgramById(selectedProgramId ?? getDefaultProgram().id);
  const [interestId, setInterestId] = useState<InterestId>(getInterestForProgram(initialProgram.id));
  const [programId, setProgramId] = useState<ProgramId>(getProgramById(selectedProgramId ?? getDefaultProgram().id).id);
  const upcomingProgram = availablePrograms.find((program) => new Date(program.startDate).getTime() > Date.now());
  const countdown = useCountdown(
    upcomingProgram?.startDate
      ?? availablePrograms[availablePrograms.length - 1]?.startDate
      ?? "2026-10-04T09:00:00+03:00",
  );

  function selectInterest(nextInterestId: InterestId, recommendedProgramId?: ProgramId) {
    setInterestId(nextInterestId);
    if (recommendedProgramId) {
      setProgramId(getProgramById(recommendedProgramId).id);
    }
  }
  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, "");
    if (!digits) {
      return "";
    }

    const localDigits = (digits.startsWith("7") || digits.startsWith("8") ? digits.slice(1) : digits).slice(0, 10);
    const part1 = localDigits.slice(0, 3);
    const part2 = localDigits.slice(3, 6);
    const part3 = localDigits.slice(6, 8);
    const part4 = localDigits.slice(8, 10);
    let result = "+7";

    if (part1) {
      result += ` (${part1}`;
    }
    if (part1.length === 3) {
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

  useEffect(() => {
    if (selectedProgramId) {
      const selectedProgram = getProgramById(selectedProgramId);
      setProgramId(selectedProgram.id);
      setInterestId(getInterestForProgram(selectedProgram.id));
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
      email: String(form.get("email") || ""),
      child_age: Number(form.get("age")),
      program: selectedProgram.id,
      program_title: selectedProgram.title,
      program_date: selectedProgram.date,
      interest: interestId,
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
      <div className="form-panel">
        <div className="form-intro">
          <span className="form-kicker">Подберем маршрут под интересы ребенка</span>
          <h2>Получите программу поездки, ответив на <em>1 вопрос</em></h2>
          <p>Что сейчас важнее для вашего ребенка?</p>
        </div>

        <div className="interest-options" role="group" aria-label="Что важно для ребенка">
          {interests.map((interest) => {
            const Icon = interest.icon;
            const selected = interest.id === interestId;
            return (
              <button
                className={selected ? "is-selected" : ""}
                key={interest.id}
                type="button"
                aria-pressed={selected}
                onClick={() => selectInterest(interest.id, interest.programId)}
              >
                <span className="interest-icon"><Icon size={24} /></span>
                <strong>{interest.label}</strong>
                {selected && <Check className="interest-check" size={14} />}
              </button>
            );
          })}
        </div>

        {upcomingProgram && (
          <div className="form-urgency">
            <div>
              <span>До ближайшей программы</span>
              <strong>{upcomingProgram.title} · {upcomingProgram.date}</strong>
            </div>
            <time dateTime={upcomingProgram.startDate}>
              <b>{countdown.days}</b> дн. <b>{countdown.hours}</b> ч. <b>{countdown.minutes}</b> мин.
            </time>
          </div>
        )}

        <div className="form-grid">
          <label className="form-field form-field--wide">
            <UserRound size={20} />
            <span className="sr-only">Имя родителя</span>
            <input name="name" required minLength={2} placeholder="Имя родителя" autoComplete="name" />
          </label>
          <label className="form-field form-field--wide">
            <Phone size={20} />
            <span className="sr-only">Телефон</span>
            <input
              name="phone"
              required
              inputMode="tel"
              placeholder="+7 (999) 123-45-67"
              autoComplete="tel"
              maxLength={18}
              value={phone}
              onChange={(event) => setPhone(formatPhone(event.target.value))}
            />
          </label>
          <label className="form-field form-field--wide">
            <Mail size={20} />
            <span className="sr-only">Электронная почта</span>
            <input name="email" required type="email" placeholder="E-mail" autoComplete="email" />
          </label>
          <label className="form-field">
            <UsersRound size={20} />
            <span className="sr-only">Возраст ребенка</span>
            <select name="age" required defaultValue="">
              <option value="" disabled>Возраст ребенка</option>
              {Array.from({ length: 11 }, (_, index) => index + 7).map((age) => (
                <option key={age} value={age}>{age} лет</option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <MapPin size={20} />
            <span className="sr-only">Интересующая программа</span>
            <select name="program" value={programId} onChange={(event) => setProgramId(event.target.value as ProgramId)}>
              {availablePrograms.map((item) => (
                <option key={item.id} value={item.id}>{item.title}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="consent">
          <input name="consent" type="checkbox" required />
          <span>Согласен на обработку персональных данных</span>
        </label>
        <button className="primary-button" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Отправляем..." : "Получить программу поездки"}
          <ArrowRight size={21} />
        </button>
        <small className="form-footnote">Без оплаты и обязательств — куратор поможет определиться.</small>
        {state === "success" && <p className="form-message form-message--success">Готово! Куратор свяжется с вами и пришлет материалы по выбранной поездке.</p>}
        {state === "error" && <p className="form-message">{error}</p>}
      </div>
      <div className="form-route-strip"><MapPin size={18} /> Шанхай <i /> Ханчжоу <i /> Лунцзин <i /> Alibaba <i /> Disneyland</div>
    </form>
  );
}
