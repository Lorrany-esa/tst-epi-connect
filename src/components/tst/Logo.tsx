export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      {/* Container fixo em 12 (48px) para não esticar a barra */}
      <div className="h-16 w-16 shrink-0 flex items-center justify-center">
        <img
          src="/02.png"
          alt="TST Distribuidora - Mascot Logo"
          className="h-full w-full object-contain scale-250" 
        />
      </div>

      {!compact && (
        <div className="min-w-0 leading-none">
          <div className="font-display text-lg font-extrabold tracking-tight text-ink-foreground">
            TST<span className="text-brand"> DISTRIBUIDORA</span>
          </div>
          <div className="mt-1 truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-foreground/60">
            EPI &middot; Ferramentas &middot; Produtos Industriais
          </div>
        </div>
      )}
    </div>
  );
}