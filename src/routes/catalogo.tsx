import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SiteHeader } from "@/components/tst/SiteHeader";
import { SiteFooter } from "@/components/tst/Sections";
import { WhatsAppWidget } from "@/components/tst/WhatsAppWidget";
import { waLink } from "@/components/tst/data";
import { formatPrice, productImage } from "@/components/tst/productImages";
import { useSiteNav } from "@/components/tst/useSiteNav";

const title = "Catálogo de Produtos EPI | TST Distribuidora de EPI";
const description =
  "Catálogo completo de EPI: capacetes, luvas, botinas, óculos, proteção respiratória e ferramentas com CA aprovado e pronta entrega. Solicite seu orçamento.";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Catalogo,
});

type Product = {
  id: string;
  name: string;
  ca_number: string | null;
  category: string | null;
  price: number | null;
  price_label: string | null;
  image_url: string | null;
};

function Catalogo() {
  const onNavigate = useSiteNav();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("Todos");

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, ca_number, category, price, price_label, image_url")
        .eq("is_active", true)
        .order("created_at", { ascending: true });
      if (!active) return;
      if (error) setError("Não foi possível carregar os produtos agora.");
      else setProducts((data ?? []) as Product[]);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const categories = ["Todos", ...Array.from(new Set(products.map((p) => p.category).filter(Boolean) as string[]))];
  const visible = category === "Todos" ? products : products.filter((p) => p.category === category);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader onNavigate={onNavigate} />
      <main>
        <section className="bg-ink py-12 text-ink-foreground">
          <div className="mx-auto max-w-7xl px-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand">Catálogo</span>
            <h1 className="mt-2 text-3xl font-extrabold uppercase sm:text-4xl">Catálogo de produtos</h1>
            <p className="mt-3 max-w-2xl text-sm text-ink-foreground/70">
              Todos os itens com Certificado de Aprovação (CA) e pronta entrega. Solicite orçamento
              direto pelo WhatsApp.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-10">
          {categories.length > 1 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`rounded-md border px-3 py-2 text-xs font-bold uppercase transition ${
                    category === c
                      ? "border-brand bg-brand text-brand-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-brand hover:text-brand"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {loading && <p className="py-10 text-center text-sm text-muted-foreground">Carregando produtos...</p>}
          {error && <p className="py-10 text-center text-sm text-destructive">{error}</p>}
          {!loading && !error && visible.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Nenhum produto cadastrado no momento.
            </p>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((p) => (
              <article
                key={p.id}
                className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card"
              >
                <div className="aspect-square overflow-hidden bg-surface">
                  <img
                    src={productImage(p.image_url, p.category)}
                    alt={p.name}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                    CA: {p.ca_number || "—"}
                  </span>
                  <h2 className="mt-1 text-sm font-bold leading-snug">{p.name}</h2>
                  <div className="mt-3 text-lg font-extrabold text-ink">
                    {formatPrice(p.price, p.price_label)}
                  </div>
                  <a
                    href={waLink(
                      `Olá! Quero um orçamento para: ${p.name}${p.ca_number ? ` (CA ${p.ca_number})` : ""}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-brand px-3 py-2.5 text-xs font-extrabold uppercase text-brand-foreground transition hover:brightness-110"
                  >
                    <MessageCircle className="h-4 w-4" /> Solicitar orçamento
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter onNavigate={onNavigate} />
      <WhatsAppWidget />
    </div>
  );
}