import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Globe2,
  Car,
  ShieldCheck,
  AlertTriangle,
  CalendarDays,
  ListChecks,
  Plane,
  Search,
  Radio,
  PlayCircle,
} from "lucide-react";
import { DashboardCard } from "@/components/DashboardCard";
import { DashboardModal } from "@/components/DashboardModal";
import { DashboardMarquee } from "@/components/DashboardMarquee";
import { PresentationMode } from "@/components/PresentationMode";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GPS Vista — Central de Inteligência Operacional" },
      {
        name: "description",
        content:
          "Central GPS Vista: dashboards Power BI de rondas, OEA, controle, inspeção, NCs, eventos, checklists e drones em uma interface única.",
      },
    ],
  }),
  component: Index,
});

const dashboards = [
  {
    t: "Rondas",
    desc: "Monitoramento em tempo real das rondas operacionais",
    i: Activity,
    accent: "oklch(0.65 0.22 255)",
    u: "https://app.powerbi.com/view?r=eyJrIjoiYWVlMjc3OGYtOTU2Ni00NzZhLTg3MWQtZWFhMDc3Njk2OTFmIiwidCI6IjQyODUyNWQ5LTIzYmQtNGY4Yy1hZmEyLTU2MDBmNDAxZjMyNiJ9",
  },
  {
    t: "OEA",
    desc: "Operador Econômico Autorizado — visão consolidada",
    i: Globe2,
    accent: "oklch(0.7 0.18 180)",
    u: "https://app.powerbi.com/view?r=eyJrIjoiYWM4YTU4OTAtODM1Ny00ZTY3LWJhYTMtMzc1NmM5ZTY2NGFkIiwidCI6IjQyODUyNWQ5LTIzYmQtNGY4Yy1hZmEyLTU2MDBmNDAxZjMyNiJ9",
  },
  {
    t: "Controle",
    desc: "Acesso e movimentação de veículos no perímetro",
    i: Car,
    accent: "oklch(0.7 0.2 80)",
    u: "https://app.powerbi.com/view?r=eyJrIjoiOWU3OGJjNDMtYjU3Yi00MTE3LTg4MzgtMzU2YzMzMWI4N2I4IiwidCI6IjQyODUyNWQ5LTIzYmQtNGY4Yy1hZmEyLTU2MDBmNDAxZjMyNiJ9",
  },
  {
    t: "Inspeção",
    desc: "Vistorias técnicas e indicadores de conformidade",
    i: ShieldCheck,
    accent: "oklch(0.65 0.2 145)",
    u: "https://app.powerbi.com/view?r=eyJrIjoiYjZiZTE5YzYtMjk5YS00OTZkLWFjMGMtYzFlZjRkNDc4YzQ3IiwidCI6IjQyODUyNWQ5LTIzYmQtNGY4Yy1hZmEyLTU2MDBmNDAxZjMyNiJ9",
  },
  {
    t: "NCs",
    desc: "Não conformidades, prazos e tratativas em aberto",
    i: AlertTriangle,
    accent: "oklch(0.7 0.22 35)",
    u: "https://app.powerbi.com/view?r=eyJrIjoiMDQyYjg2MTktZmRkMy00OTk2LThmZDktZTAzNGViMzgwNDg3IiwidCI6IjQyODUyNWQ5LTIzYmQtNGY4Yy1hZmEyLTU2MDBmNDAxZjMyNiJ9",
  },
  {
    t: "Eventos",
    desc: "Calendário e indicadores de eventos operacionais",
    i: CalendarDays,
    accent: "oklch(0.65 0.24 305)",
    u: "https://app.powerbi.com/view?r=eyJrIjoiMzk0YjM1NDgtNDY2Yi00ZjEyLThhMmEtZDM5YzZlZDU3OTc5IiwidCI6IjQyODUyNWQ5LTIzYmQtNGY4Yy1hZmEyLTU2MDBmNDAxZjMyNiJ9",
  },
  {
    t: "Checklist",
    desc: "Execução, aderência e pendências de checklists",
    i: ListChecks,
    accent: "oklch(0.7 0.18 200)",
    u: "https://app.powerbi.com/view?r=eyJrIjoiOWI0ZDRkMzgtMzUxZS00Yjc2LTk3Y2UtOWU1ODA2YWUyMzQ0IiwidCI6IjQyODUyNWQ5LTIzYmQtNGY4Yy1hZmEyLTU2MDBmNDAxZjMyNiJ9",
  },
  {
    t: "Drones",
    desc: "Sobrevoos, áreas cobertas e detecções automáticas",
    i: Plane,
    accent: "oklch(0.65 0.2 260)",
    u: "https://app.powerbi.com/view?r=eyJrIjoiZmEwYWNiYWYtMWM1ZS00MmVhLWJjMzYtYmQyMWQzNTNhZTRiIiwidCI6IjQyODUyNWQ5LTIzYmQtNGY4Yy1hZmEyLTU2MDBmNDAxZjMyNiJ9",
  },
];

function Index() {
  const [active, setActive] = useState<{ url: string; title: string } | null>(null);
  const [presenting, setPresenting] = useState(false);
  const [query, setQuery] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const filtered = useMemo(
    () =>
      dashboards.filter(
        (d) =>
          d.t.toLowerCase().includes(query.toLowerCase()) ||
          d.desc.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-radial-hero text-foreground">
      {/* decorative layers */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-brand/20 blur-[120px] animate-float-slow pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-accent/15 blur-[140px] animate-float-slow pointer-events-none" style={{ animationDelay: "5s" }} />

      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16">
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-accent flex items-center justify-center">
                <Radio className="w-5 h-5 text-foreground" strokeWidth={2} />
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-background animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
                System Online
              </p>
              <p className="text-xs font-semibold text-foreground">
                {time.toLocaleTimeString("pt-BR")} · {time.toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPresenting(true)}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand to-accent text-brand-foreground text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_30px_-5px_var(--brand)] transition-all hover:scale-105 active:scale-95"
            >
              <PlayCircle className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Apresentação</span>
            </button>
            <div className="hidden md:flex items-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
              <span>v 2.0</span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {dashboards.length} painéis
              </span>
            </div>
          </div>
        </motion.div>

        {/* Hero */}
        <header className="text-center mb-14 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[11px] font-mono uppercase tracking-[0.4em] text-brand mb-4"
          >
            // Central de Inteligência Operacional
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-6xl md:text-8xl font-black tracking-tighter italic uppercase leading-none"
          >
            <span className="text-gradient">GPS</span>{" "}
            <span className="text-foreground">VISTA</span>
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="h-[3px] bg-gradient-to-r from-transparent via-brand to-transparent mx-auto mt-6"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 max-w-xl mx-auto text-sm text-muted-foreground leading-relaxed"
          >
            Acesse todos os painéis de monitoramento, segurança e operações em
            tempo real, em uma interface unificada.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 max-w-md mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar painel..."
              className="w-full glass-card rounded-full pl-11 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-brand transition-colors"
            />
          </motion.div>
        </header>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {filtered.map((d, idx) => (
              <DashboardCard
                key={d.t}
                title={d.t}
                description={d.desc}
                icon={d.i}
                accent={d.accent}
                index={idx}
                onClick={() => setActive({ url: d.u, title: d.t })}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground text-sm">
            Nenhum painel encontrado para "{query}".
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
          <span>© {new Date().getFullYear()} GPS Vista · Inteligência Operacional</span>
          <span>Powered by Microsoft Power BI</span>
        </footer>
      </main>

      <DashboardModal
        open={!!active}
        url={active?.url ?? ""}
        title={active?.title ?? ""}
        onClose={() => setActive(null)}
      />

      <PresentationMode
        open={presenting}
        onClose={() => setPresenting(false)}
        items={dashboards.map((d) => ({
          title: d.t,
          url: d.u,
          icon: d.i,
          accent: d.accent,
        }))}
      />
    </div>
  );
}
