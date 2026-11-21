import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Check,
  Flame,
  RotateCcw,
  Timer,
  Wheat,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "לחמניות קשר · מולינו" },
      {
        name: "description",
        content:
          "מתכון לחמניות קשר ללא גלוטן ל-1 ק״ג תערובת מולינו: כמויות בכפות וסדר עבודה.",
      },
    ],
  }),
});

const STORAGE = "molino-knots-v1";

type Packs = 1 | 2;

type Amounts = {
  mix: number;
  water: number;
  saltG: number;
  saltSpoon: string;
  yeastG: number;
  yeastSpoon: string;
  sugarG: number;
  sugarSpoon: string;
  oilG: number;
  oilSpoon: string;
};

const ONE: Amounts = {
  mix: 500,
  water: 525,
  saltG: 15,
  saltSpoon: "1 כף",
  yeastG: 17,
  yeastSpoon: "1½ כפות",
  sugarG: 15,
  sugarSpoon: "1¼ כפות",
  oilG: 17,
  oilSpoon: "1¼ כפות",
};

const TWO: Amounts = {
  mix: 1000,
  water: 1050,
  saltG: 30,
  saltSpoon: "2 כפות",
  yeastG: 34,
  yeastSpoon: "3 כפות",
  sugarG: 30,
  sugarSpoon: "2½ כפות",
  oilG: 34,
  oilSpoon: "2½ כפות",
};

const STEPS = [
  {
    id: "mix",
    n: "01",
    title: "מערבבים יבש",
    body: "התערובת יחד עם המלח, עד שהמלח מפוזר לגמרי.",
  },
  {
    id: "wet",
    n: "02",
    title: "מוסיפים את השאר",
    body: "שמרים, סוכר, שמן ומים. השמרים לא נוגעים במלח.",
  },
  {
    id: "knead",
    n: "03",
    title: "לישה",
    body: "12 דקות, עד שהבצק אחיד.",
    seconds: 12 * 60,
    timer: "12:00",
  },
  {
    id: "shape",
    n: "04",
    title: "לחמניות קשר",
    body: "ידיים רטובות או משומנות. לפי האריזה: כ-70 גרם ליחידה.",
  },
  {
    id: "rise",
    n: "05",
    title: "התפחה",
    body: "כשעה, אחרי העיצוב.",
    seconds: 60 * 60,
    timer: "60:00",
  },
  {
    id: "bake",
    n: "06",
    title: "אפייה",
    body: "210 מעלות, בלי טורבו, 25 עד 30 דקות.",
    seconds: 28 * 60,
    timer: "28:00",
  },
  {
    id: "swap",
    n: "07",
    title: "שתי תבניות",
    body: "אחרי 14 דקות מחליפים קומות ומסובבים כל תבנית.",
    seconds: 14 * 60,
    timer: "14:00",
  },
] as const;

function formatClock(total: number) {
  const s = Math.max(0, total);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}

function Home() {
  const [packs, setPacks] = useState<Packs>(2);
  const [done, setDone] = useState<string[]>([]);
  const [timerId, setTimerId] = useState<string | null>(null);
  const [left, setLeft] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (!raw) return;
      const saved = JSON.parse(raw) as { packs?: Packs; done?: string[] };
      if (saved.packs === 1 || saved.packs === 2) setPacks(saved.packs);
      if (Array.isArray(saved.done)) setDone(saved.done);
    } catch {
      /* ignore broken storage */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify({ packs, done }));
  }, [packs, done]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setLeft((value) => {
        if (value <= 1) {
          setRunning(false);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const qty = packs === 1 ? ONE : TWO;
  const steps = useMemo(
    () => (packs === 1 ? STEPS.filter((step) => step.id !== "swap") : STEPS),
    [packs],
  );
  const next = useMemo(
    () => steps.find((step) => !done.includes(step.id)) ?? null,
    [steps, done],
  );
  const active = steps.find((step) => step.id === timerId);
  const finished = done.filter((id) => steps.some((step) => step.id === id)).length;

  function choosePacks(nextPacks: Packs) {
    setPacks(nextPacks);
    if (nextPacks === 1 && timerId === "swap") {
      setRunning(false);
      setTimerId(null);
    }
  }

  function toggle(id: string) {
    setDone((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function startTimer(id: string, seconds: number) {
    setTimerId(id);
    setLeft(seconds);
    setRunning(true);
  }

  const ingredients = [
    { key: "salt", name: "מלח", grams: `${qty.saltG} גרם`, spoon: qty.saltSpoon },
    { key: "yeast", name: "שמרים יבשים", grams: `${qty.yeastG} גרם`, spoon: qty.yeastSpoon },
    { key: "sugar", name: "סוכר", grams: `${qty.sugarG} גרם`, spoon: qty.sugarSpoon },
    { key: "oil", name: "שמן", grams: `${qty.oilG} גרם`, spoon: qty.oilSpoon },
  ];

  return (
    <main className="mx-auto min-h-screen w-full max-w-lg px-4 pt-5 pb-36">
      <header className="mb-4 flex items-end justify-between gap-3">
        <div>
          <p className="font-latin text-lg tracking-widest text-red uppercase">
            Forno
          </p>
          <h1 className="font-display text-4xl leading-none font-bold text-ink">
            לחמניות קשר
          </h1>
        </div>
        <p className="pb-1 text-end text-sm leading-snug text-muted">
          מולינו
          <br />
          ללא גלוטן
        </p>
      </header>

      <figure className="ticket overflow-hidden rounded-3xl">
        <img
          src="/hero.jpg"
          alt="לחמניות קשר זהובות על שולחן עץ"
          className="aspect-3/2 w-full object-cover"
        />
        <figcaption className="flex items-center justify-between gap-3 px-4 py-3">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-olive">
            <Wheat className="size-4" aria-hidden="true" />
            לפי האריזה
          </span>
          <span className="font-latin text-base text-gold italic">panini al nodo</span>
        </figcaption>
      </figure>

      <div className="rule my-5" />

      <div className="grid grid-cols-2 gap-2" role="group" aria-label="כמות תערובת">
        <PackButton active={packs === 1} onClick={() => choosePacks(1)} label="חבילה אחת" hint="500 גרם" />
        <PackButton active={packs === 2} onClick={() => choosePacks(2)} label="שתי חבילות" hint="1 ק״ג" />
      </div>

      <section className="mt-4" aria-label="כמויות">
        <div className="ticket rounded-3xl p-4">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-sm font-semibold tracking-wide text-muted">תערובת</p>
            <p className="font-display text-3xl leading-none font-bold">{qty.mix} גרם</p>
          </div>
          <div className="rule my-3" />
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-sm font-semibold tracking-wide text-muted">מים</p>
            <p className="font-display text-3xl leading-none font-bold text-red">
              {qty.water}
              <span className="ms-1 text-lg font-semibold">מ״ל</span>
            </p>
          </div>
        </div>

        <ul className="mt-2 grid grid-cols-2 gap-2">
          {ingredients.map((item) => (
            <li key={item.key} className="ticket rounded-3xl p-4">
              <p className="text-sm font-semibold text-muted">{item.name}</p>
              <p className="font-display mt-2 text-3xl leading-none font-bold text-red">
                {item.spoon}
              </p>
              <p className="mt-2 text-sm text-ink">{item.grams}</p>
            </li>
          ))}
        </ul>
      </section>

      <aside className="mt-3 rounded-3xl border border-red/25 bg-wheat px-4 py-4">
        <p className="flex items-center gap-2 font-display text-xl font-bold text-red">
          <AlertTriangle className="size-5 shrink-0" aria-hidden="true" />
          שמרים ומלח
        </p>
        <p className="mt-2 text-base leading-relaxed text-ink">
          לא נותנים לשמרים לגעת ישירות במלח. קודם מערבבים את המלח בתערובת, ורק אז
          מוסיפים שמרים. אפשר גם להפעיל את השמרים במעט מהמים עם הסוכר, בנפרד.
        </p>
      </aside>

      <section className="mt-6" aria-label="סדר עבודה">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-display text-3xl leading-none font-bold">סדר עבודה</h2>
          <button
            type="button"
            onClick={() => setDone([])}
            className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-muted"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            איפוס
          </button>
        </div>
        <ol className="flex flex-col gap-2">
          {steps.map((step) => {
            const checked = done.includes(step.id);
            return (
              <li key={step.id} className="ticket rounded-3xl">
                <button
                  type="button"
                  onClick={() => toggle(step.id)}
                  aria-pressed={checked}
                  className="flex w-full items-start gap-3 px-4 py-4 text-start"
                >
                  <span
                    className={
                      "mt-0.5 grid size-11 shrink-0 place-items-center rounded-full font-display text-sm font-bold " +
                      (checked ? "bg-olive text-paper" : "bg-wheat text-red")
                    }
                  >
                    {checked ? <Check className="size-5" aria-hidden="true" /> : step.n}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={
                        "block font-display text-2xl leading-tight font-bold " +
                        (checked ? "text-muted line-through" : "text-ink")
                      }
                    >
                      {step.title}
                    </span>
                    <span className="mt-1 block text-base leading-relaxed text-muted">
                      {step.body}
                    </span>
                  </span>
                </button>
                {"seconds" in step ? (
                  <div className="px-4 pb-4">
                    <button
                      type="button"
                      onClick={() => startTimer(step.id, step.seconds)}
                      className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-paper"
                    >
                      <Timer className="size-4" aria-hidden="true" />
                      טיימר {step.timer}
                    </button>
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>
      </section>

      <section className="ticket mt-4 rounded-3xl p-4" aria-label="תנור">
        <p className="flex items-center gap-2 font-display text-2xl font-bold">
          <Flame className="size-5 text-red" aria-hidden="true" />
          התנור
        </p>
        <dl className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl bg-wheat px-2 py-3">
            <dt className="text-xs font-semibold text-muted">חום</dt>
            <dd className="font-display mt-1 text-2xl font-bold">210°</dd>
          </div>
          <div className="rounded-2xl bg-wheat px-2 py-3">
            <dt className="text-xs font-semibold text-muted">זמן</dt>
            <dd className="font-display mt-1 text-2xl font-bold">25–30</dd>
          </div>
          <div className="rounded-2xl bg-wheat px-2 py-3">
            <dt className="text-xs font-semibold text-muted">מצב</dt>
            <dd className="font-display mt-1 text-xl font-bold">בלי טורבו</dd>
          </div>
        </dl>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          הכמויות הן של היבואן, כמו שכתוב על האריזה. הטיימר של האפייה עומד על 28 דקות — אמצע הטווח.
        </p>
      </section>

      <footer className="mt-6 text-center">
        <p className="font-latin text-lg text-gold italic">impastare · lievitare · infornare</p>
        <p className="mt-1 text-sm text-muted">קמח הארץ · תערובת מולינו</p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur-sm">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          {active ? (
            <>
              <div>
                <p className="text-xs font-semibold text-muted">{active.title}</p>
                <p className="font-display text-3xl leading-none font-bold text-red">
                  {formatClock(left)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRunning((value) => !value)}
                  className="min-h-12 rounded-full bg-red px-4 text-sm font-semibold text-paper"
                >
                  {left === 0 ? "הסתיים" : running ? "השהיה" : "המשך"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRunning(false);
                    setTimerId(null);
                  }}
                  className="min-h-12 rounded-full bg-wheat px-4 text-sm font-semibold text-ink"
                >
                  סגור
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="text-xs font-semibold text-muted">
                  {finished} מתוך {steps.length}
                </p>
                <p className="font-display text-xl leading-tight font-bold">
                  {next ? next.title : "הכל מוכן"}
                </p>
              </div>
              <p className="font-latin text-lg text-gold italic">buon forno</p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function PackButton({
  active,
  onClick,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={
        "min-h-14 rounded-2xl border px-3 py-2 text-start transition-colors " +
        (active
          ? "border-red bg-red text-paper"
          : "border-line bg-paper text-ink")
      }
    >
      <span className="block text-base font-bold">{label}</span>
      <span className={"block text-sm " + (active ? "text-paper/80" : "text-muted")}>{hint}</span>
    </button>
  );
}
