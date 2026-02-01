import logoMark from "./assets/dva-logo.svg";
import React, { useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Braces,
  Building2,
  CheckCircle2,
  Database,
  Globe,
  LineChart,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

// Requires:
//   npm i framer-motion lucide-react
//   Tailwind enabled in src/index.css

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
      return true;
    } catch {
      setCopied(false);
      return false;
    }
  };

  return { copied, copy };
}

const Section = ({ id, eyebrow, title, subtitle, children }) => (
  <section id={id} className="scroll-mt24 py-16 sm:py-16">
    <div className="mx-auto max-w-6xl px-6">
      <motion.div {...fadeUp}>
        {eyebrow ? (
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">
            <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
            <span className="tracking-wide">{eyebrow}</span>
          </div>
        ) : null}
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </motion.div>
      <div className="mt-10">{children}</div>
    </div>
  </section>
);

const Small = ({ children }) => (
  <p className="mt-2 text-sm leading-6 text-slate-600">{children}</p>
);

const Pill = ({ children, tone = "emerald" }) => {
  const tones = {
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    indigo: "border-indigo-200 bg-indigo-50 text-indigo-700",
    slate: "border-slate-200 bg-slate-50 text-slate-600",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${
        tones[tone] || tones.emerald
      }`}
    >
      {children}
    </span>
  );
};

const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:border-emerald-200 hover:shadow-[0_18px_60px_-45px_rgba(16,185,129,0.35)] ${className}`}
  >
    {children}
  </div>
);

function AbstractHeroBackdrop() {
  const line = {
    hidden: { pathLength: 0, opacity: 0.25 },
    show: { pathLength: 1, opacity: 0.95 },
  };

  return (
    <div aria-hidden className="absolute inset-0 z-0 overflow-hidden">
      {/* Base gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(16,185,129,0.14),transparent_55%),radial-gradient(circle_at_70%_35%,rgba(99,102,241,0.12),transparent_60%),linear-gradient(to_bottom,rgba(255,255,255,0.95),rgba(255,255,255,0.70))]" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      {/* Chart-like SVG */}
      <motion.svg
        viewBox="0 0 1200 700"
        className="absolute -right-24 top-0 h-[120%] w-[120%] opacity-80"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-120px" }}
      >
        <defs>
          <linearGradient id="dv-line" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(16,185,129,0.95)" />
            <stop offset="55%" stopColor="rgba(99,102,241,0.88)" />
            <stop offset="100%" stopColor="rgba(15,23,42,0.35)" />
          </linearGradient>
          <filter id="dv-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M 80 520 C 220 390, 320 560, 460 450 S 730 350, 910 260 S 1080 170, 1140 210"
          fill="none"
          stroke="url(#dv-line)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#dv-glow)"
          variants={line}
          transition={{ duration: 3.25, ease: "easeInOut" }}
        />

        <motion.path
          d="M 120 560 C 280 540, 420 610, 560 520 S 780 430, 940 360 S 1090 330, 1140 350"
          fill="none"
          stroke="rgba(15,23,42,0.22)"
          strokeWidth="4"
          strokeLinecap="round"
          variants={line}
          transition={{ duration: 2.05, ease: "easeInOut", delay: 0.12 }}
        />

        {[{ x: 460, y: 450 }, { x: 700, y: 380 }, { x: 910, y: 260 }, { x: 1140, y: 210 }].map(
          (p, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22 + i * 0.08 }}
            >
              <circle cx={p.x} cy={p.y} r="14" fill="rgba(16,185,129,0.12)" />
              <circle cx={p.x} cy={p.y} r="8" fill="rgba(16,185,129,0.60)" />
            </motion.g>
          )
        )}
      </motion.svg>

      {/* Left-side contrast mask */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,23,42,0.06),transparent_30%,transparent_70%,rgba(15,23,42,0.06))]" />

      {/* Floating particles */}
      <motion.div
        className="absolute left-[18%] top-[22%] h-8 w-8 rounded-full bg-emerald-500/40"
        animate={{ y: [0, 22, 0], opacity: [0.25, 0.8, 0.25] }}
        transition={{ duration: 9.4, repeat: Infinity, ease: "easeInOut", }}
      />
      <motion.div
        className="absolute left-[14%] top-[15%] h-15 w-15 rounded-full bg-slate-900/20"
        animate={{ y: [0, 200, 0], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.div
        className="absolute right-[22%] top-[28%] h-2.5 w-2.5 rounded-full bg-indigo-400/35"
        animate={{ y: [0, 240, 0], opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 6.0, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </div>
  );
}

export default function DataVineAnalyticsSite() {
  const year = new Date().getFullYear();
  const { copied, copy } = useCopyToClipboard();

{/* -- THE FOLLOWING FUNCTION IS RELATED TO THE EMAIL SUBMISSION -- */} 
  const [contactStatus, setContactStatus] = useState({ state: "idle", message: "" });
  // state: "idle" | "sending" | "success" | "error"

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/maqnrgrk";

  async function handleContactSubmit(e) {
    e.preventDefault();
    setContactStatus({ state: "sending", message: "" });

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        form.reset();
        setContactStatus({
          state: "success",
          message: "Message sent.",
        });
        return;
      }

      let errorMessage = "Sorry—something went wrong. Please try again.";
      try {
        const data = await res.json();
        if (data?.errors?.length) errorMessage = data.errors.map((x) => x.message).join(" ");
      } catch {}

      setContactStatus({ state: "error", message: errorMessage });
    } catch {
      setContactStatus({
        state: "error",
        message: "Network error—please try again, or email us directly.",
      });
    }
  }

  const { scrollY } = useScroll();
  const heroGlowY = useTransform(scrollY, [0, 900], [0, 70]);
  const heroGlowOpacity = useTransform(scrollY, [0, 900], [1, 0.35]);

  const nav = useMemo(
    () => [
      { label: "Services", href: "#services" },
      { label: "Approach", href: "#approach" },
      { label: "Work", href: "#work" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  const services = useMemo(
    () => [
      {
        icon: BarChart3,
        title: "Executive Dashboards & KPIs",
        body: "Define north stars, instrumentation, and decision-ready dashboards without the BI sprawl.",
        bullets: ["Metric definitions & governance", "Tableau/Looker/Power BI builds", "Self-serve enablement"],
      },
      {
        icon: Database,
        title: "Modern Data Foundations",
        body: "A pragmatic path to a clean warehouse and reliable pipelines. Snowflake, BigQuery, Databricks, dbt, Airflow.",
        bullets: ["Warehouse schema design", "Data quality & SLAs", "Cost & performance tuning"],
      },
      {
        icon: LineChart,
        title: "Growth Analytics & Experimentation",
        body: "Design experiments, interpret results, and operationalize learning to improve conversion, retention, and LTV.",
        bullets: ["Experiment design", "Causal analysis", "Funnel & cohort deep dives"],
      },
      {
        icon: Braces,
        title: "Analytics Engineering",
        body: "Build reusable models, semantic layers, and documentation that scale across teams and use cases.",
        bullets: ["dbt modeling", "Semantic layer", "Documentation & lineage"],
      },
      {
        icon: ShieldCheck,
        title: "Data Privacy & Compliance",
        body: "Enable analytics while managing risk: access controls, PII handling, and compliance-friendly processes.",
        bullets: ["PII minimization", "RBAC & auditing", "Policy-as-code patterns"],
      },
      {
        icon: Users,
        title: "Team Upskilling & Operating Model",
        body: "Workshops, playbooks, and routines to level up data literacy and reduce ad hoc chaos.",
        bullets: ["Analytics review cadence", "Metric playbooks", "Stakeholder alignment"],
      },
    ],
    []
  );

  const approach = useMemo(
    () => [
      {
        step: "01",
        title: "Diagnose",
        body: "A focused discovery to understand goals, data reality, and decision bottlenecks.",
        deliverables: ["Priority use-cases", "Metric definitions", "Data readiness assessment"],
      },
      {
        step: "02",
        title: "Design",
        body: "Translate decisions into an analytics architecture: models, governance, and dashboards.",
        deliverables: ["Solution blueprint", "Instrumentation plan", "Roadmap & estimates"],
      },
      {
        step: "03",
        title: "Deliver",
        body: "Ship in thin slices: pipelines, data models, and products that can be adopted quickly.",
        deliverables: ["MVP dashboards", "Validated datasets", "Quality checks"],
      },
      {
        step: "04",
        title: "Scale",
        body: "Operationalized with ownership, training, and reliability so analytics stays healthy.",
        deliverables: ["Runbooks", "Enablement", "SLA & monitoring"],
      },
    ],
    []
  );

  const caseStudies = useMemo(
    () => [
      {
        label: "Marketplace",
        title: "Improved Conversion Visibility Across Acquisition → Activation",
        body: "Unified tracking, standardized funnel metrics, and built an exec dashboard suite that reduced reporting time and improved actionability.",
        outcomes: ["Single source of truth for KPIs", "Faster weekly decision cycles", "Reduced metric disputes"],
      },
      {
        label: "B2B SaaS",
        title: "Built a Scalable Revenue Analytics Model",
        body: "Implemented a governed semantic layer and curated datasets for sales, marketing, and finance.",
        outcomes: ["Consistent pipeline definitions", "Self-serve for GTM", "Improved forecast hygiene"],
      },
      {
        label: "Consumer App",
        title: "Experimentation program & causal measurement",
        body: "Created experimentation playbooks and standardized analysis templates for rapid iteration.",
        outcomes: ["Higher confidence decisions", "Fewer false positives", "Reusable analysis workflows"],
      },
    ],
    []
  );

  const faqs = useMemo(
    () => [
      {
        q: "What types of engagements do you offer?",
        a: (
        <div>
          <p className="mb-3">
            We offer three engagement types:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Project-based builds (2–8 weeks)</li>
            <li>Retainers for ongoing analytics delivery and support</li>
            <li>
              Embedded engagements (3–12+ months) where a consultant stays with your team to own an analytics lane end-to-end
            </li>
          </ul>
          <p className="mt-3">
            We scope around outcomes and ship weekly.
          </p>
        </div>
      ),
      },
      {
        q: "What tools do you work with?",
        a: (
        <div>
          <p className="mb-3">
            We work with a variety of modern data stack and data visualization tools, including:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Snowflake</li>
            <li>Google BigQuery</li>
            <li>Databricks</li>
            <li>Tableau</li>
            <li>Looker</li>
            <li>Lark Base</li>
            <li>And more...</li>
          </ul>
          <p className="mt-3">
            We adapt to your stack.
          </p>
        </div>
      ),
      },
      {
        q: "How do you ensure data quality and trust?",
        a: "We implement metric definitions, automated tests, lineage/documentation, a lightweight governance model, and monitoring with clear ownership and SLAs.",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900">
      {/* Site background */}
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(16,185,129,0.10),transparent_42%),radial-gradient(circle_at_82%_18%,rgba(99,102,241,0.10),transparent_44%),radial-gradient(circle_at_50%_85%,rgba(15,23,42,0.06),transparent_45%)]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="group inline-flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <img
                    src={logoMark}
                    alt="Data Vine Consulting"
                    className="h-6 w-6"
              />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight text-slate-900">
                Data Vine Consulting
              </div>
              <div className="text-xs text-slate-500">Technical Insights and Analytics Research</div>
            </div>
          </a>

          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm text-slate-600 hover:text-slate-900 transition">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => copy("datavine.analytics@gmail.com")}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition"
              title="Copy email"
            >
              <Mail className="h-4 w-4" />
              {copied ? "Copied" : "datavine.analytics@gmail.com"}
            </button>
            <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-500 transition sm:px-4"
                aria-label="Contact us"
            >
                {/* Mobile: icon only */}
                <span className="sm:hidden inline-flex items-center">
                    <Mail className="h-5 w-5" />
                </span>

                {/* Desktop/tablet: text + arrow */}
                <span className="hidden sm:inline-flex items-center gap-2">
                    Talk to us <ArrowRight className="h-4 w-4" />
                </span>
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-14 sm:pt-16">
          <AbstractHeroBackdrop />

          <motion.div
            aria-hidden
            style={{ y: heroGlowY, opacity: heroGlowOpacity }}
            className="pointer-events-none absolute -top-28 left-1/2 z-0 h-[520px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_30%_40%,rgba(16,185,129,0.16),transparent_60%),radial-gradient(circle_at_70%_30%,rgba(99,102,241,0.14),transparent_62%)] blur-3xl"
          />

          <div className="relative z-10 mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-7">
                <motion.div {...fadeUp}>
                  <div className="flex flex-wrap gap-2">
                    <Pill tone="emerald">Analytics Partner for Tech Teams</Pill>
                    <Pill tone="indigo">Dashboards · Metrics Layer · Experimentation</Pill>
                  </div>

                  <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                    Turn Messy Data Into Clear Decisions
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                    Data Vine Consulting help marketing, product, and growth teams build trusted metrics, reliable data models, and exec-ready reporting so decisions are faster, clearer, and aligned.
                  </p>

                  <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition"
                    >
                      Book a consult <ArrowRight className="h-4 w-4" />
                    </a>
                    <a
                      href="#services"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition"
                    >
                      Explore services
                    </a>
                  </div>

                  <div className="mt-10 grid gap-4 sm:grid-cols-3">
                    <Card>
                      <div className="flex items-center gap-3">
                        <Building2 className="h-5 w-5 text-emerald-700" />
                        <div className="text-sm font-semibold">Tech-Native</div>
                      </div>
                      <Small>We bridge strategy and execution, delivering analytics your teams can run with.</Small>
                    </Card>
                    <Card>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                        <div className="text-sm font-semibold">Built for Decisions</div>
                      </div>
                      <Small>Dashboards and metrics designed for action, not reporting theater.</Small>
                    </Card>
                    <Card>
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-emerald-700" />
                        <div className="text-sm font-semibold">Ready to Scale</div>
                      </div>
                      <Small>Enterprise-grade analytics foundations: governed, monitored, and built for adoption.</Small>
                    </Card>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-5">
                <motion.div {...fadeUp} transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}>
                  <Card className="p-0 overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-slate-500">What you'll get</div>
                          <div className="mt-1 text-sm font-semibold">Analytics Foundations</div>
                        </div>
                      </div>

                      <div className="mt-5 space-y-4">
                        {[
                          { icon: Database, title: "Curated Data Models", desc: "Clean, documented models for core entities (users, accounts, orders)." },
                          { icon: BarChart3, title: "KPI Tree & Definitions", desc: "North star + supporting metrics with definitions and owners." },
                          { icon: LineChart, title: "Executive Dashboard", desc: "Executive-ready views with drilldowns and narrative." },
                          { icon: ShieldCheck, title: "Data Quality & Trust Layer", desc: "Tests, monitoring, and SLAs to keep reporting reliable." },
                        ].map((x) => (
                          <div key={x.title} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                            <div className="grid h-9 w-9 flex-none place-items-center rounded-xl border border-slate-200 bg-white">
                              <x.icon className="h-4 w-4 text-slate-700" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold">{x.title}</div>
                              <div className="mt-1 text-xs leading-5 text-slate-600">{x.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <div className="text-xs text-slate-500">Engagement Model</div>
                        <div className="mt-1 text-sm font-semibold">Outcome-Based, With Weekly Deliverables</div>
                        <div className="mt-2 text-xs leading-5 text-slate-600">
                          Scoped around business impact, with progress you can review every week.
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-200 bg-white p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <a
                          href="#contact"
                          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition"
                        >
                          Book a call <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>

            <div className="h-10" />
          </div>
        </section>

        {/* Services */}
        <Section
          id="services"
          eyebrow="What We Do"
          title="Analytics That Ships and Scales"
          subtitle="Engagements designed for clarity, adoption, and durability. We meet you where you are; then modernize with intent."
        >
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((s) => (
              <motion.div
                key={s.title}
                {...fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <Card>
                  <div className="flex items-start gap-4">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-slate-50">
                      <s.icon className="h-5 w-5 text-slate-700" />
                    </div>
                    <div>
                      <div className="text-base font-semibold">{s.title}</div>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{s.body}</p>
                      <ul className="mt-4 space-y-2">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm text-slate-700">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-700" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-10">
            <Card className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <div className="text-sm font-semibold">Not sure where to start?</div>
                <div className="mt-1 text-sm text-slate-600">
                  Ask for a short diagnostic. We’ll map your bottlenecks and propose the fastest path to impact.
                </div>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition"
              >
                Book a diagnostic <ArrowRight className="h-4 w-4" />
              </a>
            </Card>
          </motion.div>
        </Section>

        {/* Approach */}
        <Section
          id="approach"
          eyebrow="How We Work"
          title="A Simple, Rigorous Engagement Model"
          subtitle="We prioritize speed to value, but never at the cost of trust. Each phase produces concrete, reviewable artifacts."
        >
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {approach.map((a) => (
              <motion.div
                key={a.step}
                {...fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <Card>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500">Step</div>
                    <div className="text-xs font-semibold text-slate-700">{a.step}</div>
                  </div>
                  <div className="mt-3 text-base font-semibold">{a.title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">{a.body}</div>
                  <div className="mt-5 space-y-2">
                    {a.deliverables.map((d) => (
                      <div key={d} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-700" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Work */}
        <Section
          id="work"
          eyebrow="Selected Work"
          title="Representative Outcomes"
          subtitle="Below are anonymized, typical engagements we run for our clients."
        >
          <div className="grid gap-5 lg:grid-cols-3">
            {caseStudies.map((c) => (
              <motion.div
                key={c.title}
                {...fadeUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <Card>
                  <div className="flex items-center justify-between">
                    <Pill tone="slate">{c.label}</Pill>
                    {/*<div className="text-xs text-slate-500">Case study</div>*/}
                  </div>
                  <div className="mt-4 text-base font-semibold">{c.title}</div>
                  <div className="mt-2 text-sm leading-6 text-slate-600">{c.body}</div>
                  <div className="mt-5 space-y-2">
                    {c.outcomes.map((o) => (
                      <div key={o} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-700" />
                        <span>{o}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* About */}
        <Section
          id="about"
          eyebrow="Who We Are"
          title="Data Vine Consulting"
          subtitle="Data Vine is your insights and analytics partner. We combine product sense with engineering rigor to help teams build analytics that drives outcomes."
        >
          <div className="mt-10">
            <motion.div {...fadeUp} className="lg:col-span-7">
              <Card>
                <div className="text-sm font-semibold">Our promise</div>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  You’ll leave with a simpler, clearer analytics system: fewer disputes, faster iteration, and stronger trust in your numbers.
                  We focus on operational analytics your teams use every week.
                </p>
              </Card>
            </motion.div>

           <motion.div {...fadeUp} className="lg:col-span-5">
              
            </motion.div> 
          </div>

          <motion.div {...fadeUp} className="mt-10">
            <Card>
              <div className="text-sm font-semibold">Frequently asked questions</div>
              <div className="mt-5 space-y-4">
                {faqs.map((f) => (
                  <div key={f.q} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="text-sm font-semibold">{f.q}</div>
                    <div className="mt-2 text-sm leading-6 text-slate-600">{f.a}</div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </Section>

        {/* Contact */}
        <Section
          id="contact"
          eyebrow="Contact"
          title="Tell us what you’re trying to achieve"
          subtitle="Share your stack, goals, and timeline. We’ll respond with a suggested approach and a clear scope."
        >
          <div className="grid gap-5 lg:grid-cols-12">
            <motion.div {...fadeUp} className="lg:col-span-7">
              <Card>
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2">
                      <div className="text-xs text-slate-500">Name</div>
                      <input
                        name="name"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-300"
                        placeholder="Your name"
                        required
                      />
                    </label>
                    <label className="space-y-2">
                      <div className="text-xs text-slate-500">Work email</div>
                      <input
                        name="email"
                        type="email"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-300"
                        placeholder="name@company.com"
                        required
                      />
                    </label>
                  </div>

                  <label className="mt-2 sm:mt-2 space-y-2">
                    <div className="text-xs text-slate-500">What outcomes do you want?</div>
                    <textarea
                        name="message"
                        rows={5}
                        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-emerald-300"
                        placeholder="Example: unify KPI definitions, build an exec dashboard, instrument funnels, reduce data quality issues…"
                        required
                    />
                  </label>

                  <div className="pt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition"
                    >
                      Send message <ArrowRight className="h-4 w-4" />
                    </button>
                    <div className="text-xs text-slate-500">
                      Or email us at{" "}
                      <a className="text-slate-700 hover:text-slate-900 underline underline-offset-4" href="mailto:datavine.analytics@gmail.com">
                        datavine.analytics@gmail.com
                      </a>
                    </div>
                    {contactStatus.state !== "idle" && (
                        <p
                            className={`text-sm ${
                                contactStatus.state === "success"
                                    ? "text-emerald-700"
                                    : contactStatus.state === "error"
                                    ? "text-rose-700"
                                    : "text-slate-600"
                            }`}
                            role="status"
                        >
                            {contactStatus.state === "sending" ? "Sending…" : contactStatus.message}
                        </p>
                    )}
                  </div>
                </form>
              </Card>
            </motion.div>

            <motion.div {...fadeUp} className="lg:col-span-5">
              <div className="space-y-5">
                <Card>
                  <div className="text-sm font-semibold">Contact details</div>
                  <div className="mt-4 space-y-3">
                    <a
                      className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 hover:bg-slate-100 transition"
                      href="mailto:datavine.analytics@gmail.com"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Mail className="h-4 w-4" /> datavine.analytics@gmail.com
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                      <span className="inline-flex items-center gap-2">
                        <Phone className="h-4 w-4" /> By request
                      </span>
                      <span className="text-xs text-slate-500">We’ll share a number after intake</span>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </Section>
      </main>

      <footer className="border-t border-slate-200 bg-white/70">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                <span className="text-sm font-semibold tracking-tight">DV</span>
              </div>
              <div>
                <div className="text-sm font-semibold">Data Vine Consulting</div>
                <div className="text-xs text-slate-500">Built for speed, clarity, and trust.</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
                >
                  {n.label}
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-slate-500">© {year} Data Vine Consulting LLC. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
