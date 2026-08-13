import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Phone, Search, X, Instagram, Facebook, MessageCircle, Lock } from "lucide-react";
import { CONTACT, NAV, waLink } from "./data";
import { Logo } from "./Logo";

export function SiteHeader({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  const go = (id: string) => {
    setOpen(false);
    onNavigate(id);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      navigate({
        to: "/catalogo",
        search: { q: term.trim() },
      });
      setOpen(false);
    } else {
      navigate({ to: "/catalogo" });
      setOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full max-w-full overflow-x-hidden bg-ink text-ink-foreground shadow-card">
      {/* Topo Superior */}
      <div className="border-b border-white/10 bg-black/40 w-full">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs w-full max-w-full overflow-hidden">
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

      {/* Conteúdo Principal do Header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 w-full">
        <button onClick={() => go("inicio")} className="shrink-0 max-w-[60%] sm:max-w-none" aria-label="Início">
          <Logo />
        </button>

        {/* Barra de busca Desktop */}
        <form
          onSubmit={handleSearch}
          className="hidden ml-auto max-w-md w-full items-center rounded-md bg-white/95 px-3 py-1.5 lg:flex"
        >
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Pesquisar Produtos, Óculos, Capacetes, Botas..."
            className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted-foreground"
          />
          <button type="submit" aria-label="Pesquisar" className="shrink-0 text-ink/70 hover:text-brand transition-colors">
            <Search className="h-5 w-5" />
          </button>
        </form>

        {/* Botão Sanduíche Mobile */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="ml-auto shrink-0 rounded-md border border-white/15 p-2 md:hidden"
          aria-label="Abrir menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Navegação Desktop */}
      <nav className="hidden border-t border-white/10 bg-white/5 md:block w-full">
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

      {/* Menu Sanduíche Mobile */}
      {open && (
        <nav className="border-t border-white/10 bg-black/90 md:hidden w-full max-w-full">
          <div className="px-4 py-3 w-full">
            <form
              onSubmit={handleSearch}
              className="mb-3 flex w-full max-w-full items-center rounded-md bg-white/95 px-3 py-2"
            >
              <input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Pesquisar produtos..."
                className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted-foreground"
              />
              <button type="submit" aria-label="Pesquisar" className="shrink-0 text-ink/70">
                <Search className="h-5 w-5" />
              </button>
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