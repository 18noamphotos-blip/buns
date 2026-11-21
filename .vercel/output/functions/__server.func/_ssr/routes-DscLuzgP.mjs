import { i as __toESM } from "../_runtime.mjs";
import { K as require_react, b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Flame, i as RotateCcw, n as TriangleAlert, o as Check, r as Timer, t as Wheat } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DscLuzgP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STORAGE = "molino-knots-v1";
var ONE = {
	mix: 500,
	water: 525,
	saltG: 15,
	saltSpoon: "1 כף",
	yeastG: 17,
	yeastSpoon: "1½ כפות",
	sugarG: 15,
	sugarSpoon: "1¼ כפות",
	oilG: 17,
	oilSpoon: "1¼ כפות"
};
var TWO = {
	mix: 1e3,
	water: 1050,
	saltG: 30,
	saltSpoon: "2 כפות",
	yeastG: 34,
	yeastSpoon: "3 כפות",
	sugarG: 30,
	sugarSpoon: "2½ כפות",
	oilG: 34,
	oilSpoon: "2½ כפות"
};
var STEPS = [
	{
		id: "mix",
		n: "01",
		title: "מערבבים יבש",
		body: "התערובת יחד עם המלח, עד שהמלח מפוזר לגמרי."
	},
	{
		id: "wet",
		n: "02",
		title: "מוסיפים את השאר",
		body: "שמרים, סוכר, שמן ומים. השמרים לא נוגעים במלח."
	},
	{
		id: "knead",
		n: "03",
		title: "לישה",
		body: "12 דקות, עד שהבצק אחיד.",
		seconds: 720,
		timer: "12:00"
	},
	{
		id: "shape",
		n: "04",
		title: "לחמניות קשר",
		body: "ידיים רטובות או משומנות. לפי האריזה: כ-70 גרם ליחידה."
	},
	{
		id: "rise",
		n: "05",
		title: "התפחה",
		body: "כשעה, אחרי העיצוב.",
		seconds: 3600,
		timer: "60:00"
	},
	{
		id: "bake",
		n: "06",
		title: "אפייה",
		body: "210 מעלות, בלי טורבו, 25 עד 30 דקות.",
		seconds: 1680,
		timer: "28:00"
	},
	{
		id: "swap",
		n: "07",
		title: "שתי תבניות",
		body: "אחרי 14 דקות מחליפים קומות ומסובבים כל תבנית.",
		seconds: 840,
		timer: "14:00"
	}
];
function formatClock(total) {
	const s = Math.max(0, total);
	const m = Math.floor(s / 60);
	const r = s % 60;
	return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function Home() {
	const [packs, setPacks] = (0, import_react.useState)(2);
	const [done, setDone] = (0, import_react.useState)([]);
	const [timerId, setTimerId] = (0, import_react.useState)(null);
	const [left, setLeft] = (0, import_react.useState)(0);
	const [running, setRunning] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(STORAGE);
			if (!raw) return;
			const saved = JSON.parse(raw);
			if (saved.packs === 1 || saved.packs === 2) setPacks(saved.packs);
			if (Array.isArray(saved.done)) setDone(saved.done);
		} catch {}
	}, []);
	(0, import_react.useEffect)(() => {
		localStorage.setItem(STORAGE, JSON.stringify({
			packs,
			done
		}));
	}, [packs, done]);
	(0, import_react.useEffect)(() => {
		if (!running) return;
		const id = window.setInterval(() => {
			setLeft((value) => {
				if (value <= 1) {
					setRunning(false);
					return 0;
				}
				return value - 1;
			});
		}, 1e3);
		return () => window.clearInterval(id);
	}, [running]);
	const qty = packs === 1 ? ONE : TWO;
	const steps = (0, import_react.useMemo)(() => packs === 1 ? STEPS.filter((step) => step.id !== "swap") : STEPS, [packs]);
	const next = (0, import_react.useMemo)(() => steps.find((step) => !done.includes(step.id)) ?? null, [steps, done]);
	const active = steps.find((step) => step.id === timerId);
	const finished = done.filter((id) => steps.some((step) => step.id === id)).length;
	function choosePacks(nextPacks) {
		setPacks(nextPacks);
		if (nextPacks === 1 && timerId === "swap") {
			setRunning(false);
			setTimerId(null);
		}
	}
	function toggle(id) {
		setDone((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
	}
	function startTimer(id, seconds) {
		setTimerId(id);
		setLeft(seconds);
		setRunning(true);
	}
	const ingredients = [
		{
			key: "salt",
			name: "מלח",
			grams: `${qty.saltG} גרם`,
			spoon: qty.saltSpoon
		},
		{
			key: "yeast",
			name: "שמרים יבשים",
			grams: `${qty.yeastG} גרם`,
			spoon: qty.yeastSpoon
		},
		{
			key: "sugar",
			name: "סוכר",
			grams: `${qty.sugarG} גרם`,
			spoon: qty.sugarSpoon
		},
		{
			key: "oil",
			name: "שמן",
			grams: `${qty.oilG} גרם`,
			spoon: qty.oilSpoon
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto min-h-screen w-full max-w-lg px-4 pt-5 pb-36",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-4 flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-latin text-lg tracking-widest text-red uppercase",
					children: "Forno"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-4xl leading-none font-bold text-ink",
					children: "לחמניות קשר"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "pb-1 text-end text-sm leading-snug text-muted",
					children: [
						"מולינו",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"ללא גלוטן"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
				className: "ticket overflow-hidden rounded-3xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/hero.jpg",
					alt: "לחמניות קשר זהובות על שולחן עץ",
					className: "aspect-3/2 w-full object-cover"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
					className: "flex items-center justify-between gap-3 px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 text-sm font-semibold text-olive",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wheat, {
							className: "size-4",
							"aria-hidden": "true"
						}), "לפי האריזה"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-latin text-base text-gold italic",
						children: "panini al nodo"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rule my-5" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				role: "group",
				"aria-label": "כמות תערובת",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackButton, {
					active: packs === 1,
					onClick: () => choosePacks(1),
					label: "חבילה אחת",
					hint: "500 גרם"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackButton, {
					active: packs === 2,
					onClick: () => choosePacks(2),
					label: "שתי חבילות",
					hint: "1 ק״ג"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4",
				"aria-label": "כמויות",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ticket rounded-3xl p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold tracking-wide text-muted",
								children: "תערובת"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-3xl leading-none font-bold",
								children: [qty.mix, " גרם"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "rule my-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold tracking-wide text-muted",
								children: "מים"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-3xl leading-none font-bold text-red",
								children: [qty.water, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ms-1 text-lg font-semibold",
									children: "מ״ל"
								})]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 grid grid-cols-2 gap-2",
					children: ingredients.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "ticket rounded-3xl p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-muted",
								children: item.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display mt-2 text-3xl leading-none font-bold text-red",
								children: item.spoon
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-ink",
								children: item.grams
							})
						]
					}, item.key))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "mt-3 rounded-3xl border border-red/25 bg-wheat px-4 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 font-display text-xl font-bold text-red",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
						className: "size-5 shrink-0",
						"aria-hidden": "true"
					}), "שמרים ומלח"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-base leading-relaxed text-ink",
					children: "לא נותנים לשמרים לגעת ישירות במלח. קודם מערבבים את המלח בתערובת, ורק אז מוסיפים שמרים. אפשר גם להפעיל את השמרים במעט מהמים עם הסוכר, בנפרד."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6",
				"aria-label": "סדר עבודה",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl leading-none font-bold",
						children: "סדר עבודה"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setDone([]),
						className: "inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
							className: "size-4",
							"aria-hidden": "true"
						}), "איפוס"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "flex flex-col gap-2",
					children: steps.map((step) => {
						const checked = done.includes(step.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "ticket rounded-3xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggle(step.id),
								"aria-pressed": checked,
								className: "flex w-full items-start gap-3 px-4 py-4 text-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 grid size-11 shrink-0 place-items-center rounded-full font-display text-sm font-bold " + (checked ? "bg-olive text-paper" : "bg-wheat text-red"),
									children: checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
										className: "size-5",
										"aria-hidden": "true"
									}) : step.n
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-display text-2xl leading-tight font-bold " + (checked ? "text-muted line-through" : "text-ink"),
										children: step.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-base leading-relaxed text-muted",
										children: step.body
									})]
								})]
							}), "seconds" in step ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-4 pb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => startTimer(step.id, step.seconds),
									className: "inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-paper",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, {
											className: "size-4",
											"aria-hidden": "true"
										}),
										"טיימר ",
										step.timer
									]
								})
							}) : null]
						}, step.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ticket mt-4 rounded-3xl p-4",
				"aria-label": "תנור",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "flex items-center gap-2 font-display text-2xl font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
							className: "size-5 text-red",
							"aria-hidden": "true"
						}), "התנור"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-3 grid grid-cols-3 gap-2 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-wheat px-2 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs font-semibold text-muted",
									children: "חום"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-display mt-1 text-2xl font-bold",
									children: "210°"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-wheat px-2 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs font-semibold text-muted",
									children: "זמן"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-display mt-1 text-2xl font-bold",
									children: "25–30"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-wheat px-2 py-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs font-semibold text-muted",
									children: "מצב"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-display mt-1 text-xl font-bold",
									children: "בלי טורבו"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-muted",
						children: "הכמויות הן של היבואן, כמו שכתוב על האריזה. הטיימר של האפייה עומד על 28 דקות — אמצע הטווח."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-6 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-latin text-lg text-gold italic",
					children: "impastare · lievitare · infornare"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "קמח הארץ · תערובת מולינו"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-0 z-10 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex max-w-lg items-center justify-between gap-3",
					children: active ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-muted",
						children: active.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl leading-none font-bold text-red",
						children: formatClock(left)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setRunning((value) => !value),
							className: "min-h-12 rounded-full bg-red px-4 text-sm font-semibold text-paper",
							children: left === 0 ? "הסתיים" : running ? "השהיה" : "המשך"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setRunning(false);
								setTimerId(null);
							},
							className: "min-h-12 rounded-full bg-wheat px-4 text-sm font-semibold text-ink",
							children: "סגור"
						})]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-semibold text-muted",
						children: [
							finished,
							" מתוך ",
							steps.length
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl leading-tight font-bold",
						children: next ? next.title : "הכל מוכן"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-latin text-lg text-gold italic",
						children: "buon forno"
					})] })
				})
			})
		]
	});
}
function PackButton({ active, onClick, label, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		"aria-pressed": active,
		className: "min-h-14 rounded-2xl border px-3 py-2 text-start transition-colors " + (active ? "border-red bg-red text-paper" : "border-line bg-paper text-ink"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-base font-bold",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "block text-sm " + (active ? "text-paper/80" : "text-muted"),
			children: hint
		})]
	});
}
//#endregion
export { Home as component };
