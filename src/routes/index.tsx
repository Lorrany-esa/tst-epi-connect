import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { SiteHeader } from "@/components/tst/SiteHeader";
import { HeroBanner } from "@/components/tst/HeroBanner";
import { WhatsAppWidget } from "@/components/tst/WhatsAppWidget";
import { useSiteNav } from "@/components/tst/useSiteNav";
import {
  About,
  Advantages,
  CaLookup,
  Categories,
  SiteFooter,
} from "@/components/tst/Sections";

const title = "TST Distribuidora de EPI | EPI, Ferramentas e Produtos Industriais";
const description =
  "Distribuidora de EPI com pronta entrega: capacetes, luvas, botinas, óculos e proteção respiratória com CA aprovado. Atendimento B2B, atacado e varejo.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

function Index() {
  const onNavigate = useSiteNav();

  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader onNavigate={onNavigate} />
      <main>
        <HeroBanner onNavigate={onNavigate} />
        <Advantages />
        <Categories />
        <About />
        <CaLookup />
      </main>
      <SiteFooter onNavigate={onNavigate} />
      <WhatsAppWidget />
    </div>
  );
}