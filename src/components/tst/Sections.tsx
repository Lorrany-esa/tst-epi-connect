import { useState } from "react";
import {
  Truck,
  CreditCard,
  Headset,
  ShieldCheck,
  ArrowRight,
  Search,
  MapPin,
  Mail,
  Phone,
  MessageCircle,
  Instagram,
  Facebook,
  Building,
} from "lucide-react";
import { CONTACT, NAV, waLink } from "./data";
import { Logo } from "./Logo";
import hero from "@/assets/hero-industrial.jpg";
import prodCapacete from "@/assets/prod-capacete.jpg";
import prodAuditiva from "@/assets/prod-auditiva.jpg";
import prodLuvas from "@/assets/prod-luvas.jpg";
import prodBotas from "@/assets/prod-botas.jpg";
import prodRespiratoria from "@/assets/prod-respiratoria.jpg";
import prodOculos from "@/assets/prod-oculos.jpg";
import prodFerramentas from "@/assets/prod-ferramentas.jpg";
import prodEmergencia from "@/assets/prod-emergencia.jpg";
import prodMaquina from "@/assets/prod-maquina.jpg";
import prodKitferramentas from "@/assets/prod-kitferramentas.jpg";

export function Hero({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <section id="inicio" className="relative isolate bg-ink text-ink-foreground">
      <img
        src={hero}
        alt="Trabalhadores usando EPI em canteiro de obras industrial"
        width={1600}
        height={1008}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:py-24">
        <div>
          <span className="inline-block rounded-sm bg-brand/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Atacado &amp; Varejo · B2B
          </span>
          <h1 className="mt-5 text-3xl font-extrabold uppercase leading-[1.05] sm:text-5xl lg:text-6xl">
            As principais linhas de EPI com ampla variedade e{" "}
            <span className="text-brand">pronta entrega.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-ink-foreground/75 sm:text-lg">
            A segurança do seu colaborador começa com a TST Distribuidora.
          </p>
          <button
            onClick={() => onNavigate("catalogo")}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-brand px-6 py-4 text-sm font-extrabold uppercase tracking-wide text-brand-foreground shadow-brand transition hover:brightness-110"
          >
            Acessar catálogo de produtos <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="rounded-lg border border-brand/30 bg-black/60 p-6 backdrop-blur">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
            Oferta do mês
          </div>
          <h2 className="mt-3 text-2xl font-extrabold uppercase">Kits de Segurança</h2>
          <p className="mt-2 text-sm text-ink-foreground/75">
            Monte o kit completo (capacete, óculos, luvas, botina e protetor auricular) com preço de
            atacado e nota fiscal para sua empresa.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {["Produtos com CA aprovado", "Faturamento para empresas", "Entrega em todo o Brasil"].map(
              (t) => (
                <li key={t} className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 shrink-0 text-brand" />
                  {t}
                </li>
              ),
            )}
          </ul>
          <a
            href={waLink("Olá! Quero saber mais sobre os Kits de Segurança.")}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md border border-brand px-4 py-3 text-sm font-bold uppercase text-brand transition hover:bg-brand hover:text-brand-foreground"
          >
            <MessageCircle className="h-4 w-4" /> Pedir cotação
          </a>
        </div>
      </div>
    </section>
  );
}

const ADVANTAGES = [
  { icon: Truck, title: "Entrega Rápida e Garantida", text: "Estoque próprio e pronta entrega." },
  { icon: CreditCard, title: "Condições Facilitadas", text: "Pix e Cartão." },
  { icon: Headset, title: "Atendimento Especializado", text: "Consultores especializados em EPI." },
  { icon: ShieldCheck, title: "Produtos com CA Aprovado", text: "Conformidade com o MTE." },
];

export function Advantages() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        {ADVANTAGES.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex min-w-0 items-start gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-ink text-brand">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold uppercase">{title}</h3>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const CATEGORIES = [
  { name: "Capacetes", img: prodCapacete },
  { name: "Proteção Auditiva", img: prodAuditiva },
  { name: "Luvas de Proteção", img: prodLuvas },
  { name: "Calçados de Segurança", img: prodBotas },
  { name: "Proteção Respiratória", img: prodRespiratoria },
  { name: "Proteção Visual", img: prodOculos },
  { name: "Ferramentas", img: prodFerramentas },
  { name: "Óleo e Graxas", img: prodEmergencia },
  { name: "Máquinas", img: prodMaquina },
  { name: "Kit Ferramentas", img: prodKitferramentas },



];

export function Categories() {
  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-4 py-16">
      <SectionTitle kicker="Catálogo" title="Categorias em destaque" />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <a
            key={c.name}
            href={waLink(`Olá! Quero ver os produtos da categoria ${c.name}.`)}
            className="group overflow-hidden rounded-lg border border-border bg-card shadow-card transition hover:-translate-y-1 hover:border-brand"
          >
            <div className="aspect-square overflow-hidden bg-surface">
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                width={800}
                height={800}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between gap-2 px-4 py-3">
              <span className="min-w-0 truncate text-sm font-bold uppercase">{c.name}</span>
              <ArrowRight className="h-4 w-4 shrink-0 text-brand" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="sobre" className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionTitle kicker="Sobre nós" title="Segurança e confiança para o seu trabalho" />
          <p className="mt-6 text-muted-foreground">
            A {CONTACT.company}  é referência no fornecimento de equipamentos de 
            proteção individual (EPIs), ferramentas e produtos industriais. Com uma trajetória sólida de 14 anos, 
            nossa história começou em Salinas-MG e segue marcada por constante expansão e evolução. Trabalhamos com as principais marcas do setor para atender indústrias, 
            construtoras, prestadoras de serviço e revendas, oferecendo soluções completas no atacado e no varejo.
          </p>
          <p className="mt-4 text-muted-foreground">
            Nossa prioridade é a sua proteção e eficiência. Por isso, todos os EPIs comercializados possuem Certificado de Aprovação (CA) válido, garantindo total conformidade com as Normas Regulamentadoras do Ministério do Trabalho. É a união de tradição, crescimento 
            contínuo e compromisso para levar a máxima segurança ao seu trabalho.
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4">
            {[
              ["+2.000", "Itens em estoque"],
              ["+500", "Empresas atendidas"],
              ["24h", "Retorno de cotação"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-lg border border-border bg-card p-4 shadow-card">
                <dt className="text-xl font-extrabold text-ink">{n}</dt>
                <dd className="text-xs uppercase text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="overflow-hidden rounded-lg border border-border shadow-card">
          <img
            src="/04.png"
            alt="Equipe com EPI completo em ambiente industrial"
            loading="lazy"
            width={1600}
            height={1008}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}



export function CaLookup() {
  const [ca, setCa] = useState("");
  const [submitted, setSubmitted] = useState<string | null>(null);

  return (
    <section id="consultar-ca" className="bg-ink py-16 text-ink-foreground">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand">
          Certificado de Aprovação
        </span>
        <h2 className="mt-3 text-2xl font-extrabold uppercase sm:text-3xl">Consultar CA</h2>
        <p className="mt-3 text-sm text-ink-foreground/70">
          Digite o número do CA para verificar a validade do equipamento junto ao Ministério do
          Trabalho e Emprego.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(ca.trim());
          }}
          className="mx-auto mt-6 grid max-w-xl grid-cols-[minmax(0,1fr)_auto] gap-2"
        >
          <input
            value={ca}
            onChange={(e) => setCa(e.target.value.replace(/\D/g, ""))}
            inputMode="numeric"
            placeholder="Ex: 31469"
            aria-label="Número do CA"
            className="min-w-0 rounded-md bg-white px-4 py-3 text-sm text-ink outline-none ring-brand focus:ring-2"
          />
          <button
            type="submit"
            className="inline-flex shrink-0 items-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-extrabold uppercase text-brand-foreground transition hover:brightness-110"
          >
            <Search className="h-4 w-4" /> Consultar
          </button>
        </form>
        {submitted && (
          <div className="mx-auto mt-5 max-w-xl rounded-md border border-brand/40 bg-white/5 p-4 text-left text-sm">
            {submitted ? (
              <>
                <p className="font-bold text-brand">CA {submitted}</p>
                <p className="mt-1 text-ink-foreground/75">
                  Consulte a situação oficial no portal do MTE ou fale com nosso time para receber a
                  ficha técnica e o certificado do produto.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={`https://consultaca.com/${submitted}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-brand px-3 py-2 text-xs font-bold uppercase text-brand"
                  >
                    Ver consulta oficial
                  </a>
                  <a
                    href={waLink(`Olá! Quero informações do CA ${submitted}.`)}
                    className="rounded-md bg-brand px-3 py-2 text-xs font-bold uppercase text-brand-foreground"
                  >
                    Falar com especialista
                  </a>
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

export function SiteFooter({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <footer id="contato" className="bg-black text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-ink-foreground/65">{CONTACT.slogan}</p>
          <div className="mt-5 flex gap-3">
            <a href={CONTACT.instagram} aria-label="Instagram" className="text-brand">
              <Instagram className="h-5 w-5" />
            </a>
            
            <a href={waLink("Olá!")} aria-label="WhatsApp" className="text-brand">
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-brand">Contato</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-foreground/75">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-brand" /> {CONTACT.address}
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 shrink-0 text-brand" /> {CONTACT.phoneLabel}
            </li>
            <li className="flex gap-2">
              <MessageCircle className="h-4 w-4 shrink-0 text-brand" /> {CONTACT.whatsappLabel}
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 shrink-0 text-brand" /> {CONTACT.email}
            </li>
            <li className="flex gap-2">
              <Building className="h-4 w-4 shrink-0 text-brand" /> {CONTACT.cnpj}
            </li>
          

          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-brand">Links rápidos</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => onNavigate(n.id)}
                  className="text-ink-foreground/75 transition hover:text-brand"
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-ink-foreground/50">
  <p>
    {CONTACT.company} © Todos os direitos reservados.
  </p>
  <p className="mt-1">
    Desenvolvido por{" "}
    <a
      href="https://lorranevelosodevweb.com.br/"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-brand hover:underline transition-colors"
    >
      Lorrane Veloso Dev Web
    </a>
  </p>
</div>
    </footer>
  );
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div>
      <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand">{kicker}</span>
      <h2 className="mt-2 text-2xl font-extrabold uppercase sm:text-3xl">{title}</h2>
      <div className="mt-3 h-1 w-16 bg-brand" />
    </div>
  );
}