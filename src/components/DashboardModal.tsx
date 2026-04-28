import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, Minimize2, RefreshCw, ExternalLink, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  url: string;
  title: string;
  onClose: () => void;
}

export function DashboardModal({ open, url, title, onClose }: Props) {
  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (open) setLoading(true);
  }, [open, reloadKey, url]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
      if (e.key === "f" || e.key === "F") setFullscreen((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 bg-background/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 10, opacity: 0 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
            className={`glass-card relative flex flex-col rounded-2xl overflow-hidden shadow-2xl ${
              fullscreen ? "w-full h-full" : "w-full max-w-7xl h-[88vh]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-6 py-3.5 border-b border-border bg-surface-strong/60">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-2 h-2 rounded-full bg-brand animate-pulse-ring" />
                <h2 className="text-sm md:text-base font-bold tracking-[0.2em] uppercase text-foreground truncate">
                  {title}
                </h2>
                <span className="hidden md:inline text-[10px] font-mono uppercase tracking-wider text-muted-foreground border border-border rounded-md px-2 py-0.5">
                  Power BI
                </span>
              </div>
              <div className="flex items-center gap-1">
                <IconBtn onClick={() => setReloadKey((k) => k + 1)} title="Recarregar">
                  <RefreshCw className="w-4 h-4" />
                </IconBtn>
                <IconBtn onClick={() => window.open(url, "_blank")} title="Abrir em nova aba">
                  <ExternalLink className="w-4 h-4" />
                </IconBtn>
                <IconBtn onClick={() => setFullscreen((v) => !v)} title="Tela cheia (F)">
                  {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </IconBtn>
                <IconBtn onClick={onClose} title="Fechar (Esc)" danger>
                  <X className="w-4 h-4" />
                </IconBtn>
              </div>
            </div>
            <div className="relative flex-1 bg-background">
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background/80 z-10">
                  <Loader2 className="w-8 h-8 text-brand animate-spin" />
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Carregando dashboard
                  </p>
                </div>
              )}
              <iframe
                key={reloadKey}
                src={url}
                title={title}
                onLoad={() => setLoading(false)}
                className="w-full h-full border-0"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
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
          ? "hover:bg-destructive/20 hover:text-destructive"
          : "hover:bg-surface-strong text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
