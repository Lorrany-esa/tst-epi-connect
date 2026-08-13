import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, Phone, Search, X, Instagram, Facebook, MessageCircle, Lock } from "lucide-react";
import { CONTACT, NAV, waLink } from "./data";
import { Logo } from "./Logo";

export function SiteHeader({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");

  const go = (id: string) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-ink text-ink-foreground shadow-card">
      <div className="border-b border-white/10 bg-black/40">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-2 text-xs sm:flex sm:justify-between">
          <a
            href={`tel:${CONTACT.phoneLabel.replace(/\D/g, "")}`}
            className="flex min-w-0 items-center gap-2 font-semibold"
          >
            <Phone className="h-4 w-4 shrink-0 text-brand" />
            <span className="truncate">
              Tele Vendas <span className="text-brand">{CONTACT.phoneLabel}</span>
            </span>
          </a>
          <div className="flex shrink-0 items-center gap-3">
            <a href={CONTACT.instagram} aria-label="Instagram" className="hover:text-brand">
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={waLink("Olá! Vim pelo site da TST Distribuidora.")}
              aria-label="WhatsApp"
              className="hover:text-brand"
            >
              <MessageCircle className="h-4 w-4" />
            </a>

            {/* Divisor visual discreto */}
            <span className="h-3 w-[1px] bg-white/20" />

            {/* Botão Admin */}
            <Link
              to="/admin"
              className="flex items-center gap-1 font-semibold hover:text-brand transition-colors"
              aria-label="Área Administrativa"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4">
        <button onClick={() => go("inicio")} className="shrink-0" aria-label="Início">
          <Logo />
        </button>

        {/* Barra de busca alinhada à direita com ml-auto */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.open(
              waLink(`Olá! Estou procurando por: ${term || "produtos de EPI"}`),
              "_blank",
            );
          }}
          className="hidden ml-auto max-w-md w-full items-center rounded-md bg-white/95 px-3 py-1.5 lg:flex"
        >
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Pesquisar Produtos, Óculos, Capacetes, Botas..."
            className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted-foreground"
          />
          <button type="submit" aria-label="Pesquisar" className="shrink-0 text-ink/70">
            <Search className="h-5 w-5" />
          </button>
        </form>

        <button
          onClick={() => setOpen((v) => !v)}
          className="ml-auto shrink-0 rounded-md border border-white/15 p-2 md:hidden"
          aria-label="Abrir menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <nav className="hidden border-t border-white/10 bg-white/5 md:block">
        <div className="mx-auto flex max-w-7xl gap-1 px-4">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="border-b-2 border-transparent px-4 py-3 text-sm font-semibold uppercase tracking-wide transition hover:border-brand hover:text-brand"
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {open && (
        <nav className="border-t border-white/10 bg-black/60 md:hidden">
          <div className="px-4 py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.open(waLink(`Olá! Procuro por: ${term || "EPI"}`), "_blank");
              }}
              className="mb-3 flex items-center rounded-md bg-white/95 px-3 py-2"
            >
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Pesquisar produtos..."
                className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted-foreground"
              />
              <Search className="h-5 w-5 shrink-0 text-ink/70" />
            </form>
            {NAV.map((item) => (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                className="block w-full border-b border-white/10 py-3 text-left text-sm font-semibold uppercase"
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}