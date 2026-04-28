import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  X,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight,
  Timer,
  type LucideIcon,
} from "lucide-react";

export interface PresentationItem {
  title: string;
  url: string;
  icon: LucideIcon;
  accent: string;
}

interface Props {
  open: boolean;
  items: PresentationItem[];
  intervalSeconds?: number;
  onClose: () => void;
}

export function PresentationMode({
  open,
  items,
  intervalSeconds = 20,
  onClose,
}: Props) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(intervalSeconds);

  // reset when opening
  useEffect(() => {
    if (open) {
      setIdx(0);
      setProgress(0);
      setPaused(false);
    }
  }, [open]);

  // keyboard
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === " ") {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // progress timer
  useEffect(() => {
    if (!open || paused || items.length === 0) return;
    setProgress(0);
    const start = Date.now();
    const id = setInterval(() => {
      const p = ((Date.now() - start) / (duration * 1000)) * 100;
      if (p >= 100) {
        setIdx((i) => (i + 1) % items.length);
        setProgress(0);
      } else {
        setProgress(p);
      }
    }, 100);
    return () => clearInterval(id);
  }, [open, paused, idx, duration, items.length]);

  if (!open) return null;
  const current = items[idx];
  if (!current) return null;
  const Icon = current.icon;

  function next() {
    setIdx((i) => (i + 1) % items.length);
    setProgress(0);
  }
  function prev() {
    setIdx((i) => (i - 1 + items.length) % items.length);
    setProgress(0);
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-background flex flex-col"
      >
        {/* Top bar */}
        <div className="relative flex items-center justify-between px-6 py-3 border-b border-border bg-surface-strong/60 backdrop-blur-xl">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-border"
              style={{ boxShadow: `0 0 25px -5px ${current.accent}` }}
            >
              <Icon className="w-5 h-5" strokeWidth={1.6} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand">
                Apresentação · {idx + 1}/{items.length}
              </p>
              <h2 className="text-base font-bold tracking-tight truncate">
                {current.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-surface text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <Timer className="w-3 h-3" />
              <input
                type="number"
                min={5}
                max={180}
                value={duration}
                onChange={(e) =>
                  setDuration(Math.max(5, Number(e.target.value) || 20))
                }
                className="w-10 bg-transparent text-foreground outline-none text-center"
              />
              s
            </div>
            <IconBtn onClick={prev} title="Anterior (←)">
              <ChevronLeft className="w-4 h-4" />
            </IconBtn>
            <IconBtn
              onClick={() => setPaused((p) => !p)}
              title={paused ? "Retomar (Espaço)" : "Pausar (Espaço)"}
            >
              {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            </IconBtn>
            <IconBtn onClick={next} title="Próximo (→)">
              <ChevronRight className="w-4 h-4" />
            </IconBtn>
            <IconBtn onClick={onClose} title="Sair (Esc)" danger>
              <X className="w-4 h-4" />
            </IconBtn>
          </div>

          {/* progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-border/40">
            <motion.div
              className="h-full"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${current.accent}, var(--brand))`,
              }}
            />
          </div>
        </div>

        {/* Iframe */}
        <div className="relative flex-1 bg-background">
          <AnimatePresence mode="wait">
            <motion.iframe
              key={idx}
              src={current.url}
              title={current.title}
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
            />
          </AnimatePresence>
        </div>

        {/* Bottom dots */}
        <div className="flex items-center justify-center gap-2 py-3 bg-surface-strong/60 backdrop-blur-xl border-t border-border">
          {items.map((it, i) => (
            <button
              key={it.title}
              onClick={() => {
                setIdx(i);
                setProgress(0);
              }}
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                i === idx
                  ? "border-brand bg-brand/10 text-foreground"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: i === idx ? it.accent : "currentColor" }}
              />
              <span className="text-[10px] font-mono uppercase tracking-widest">
                {it.title}
              </span>
            </button>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function IconBtn({
  children,
  onClick,
  title,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-all duration-200 hover:scale-110 active:scale-95 ${
        danger
          ? "hover:bg-destructive/20 hover:text-destructive text-muted-foreground"
          : "hover:bg-surface-strong text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
