export const CONTACT = {
  company: "TST Distribuidora de EPI LTDA",
  slogan:
    "EPI, ferramentas e produtos industriais de qualidade. Segurança e confiança para o seu trabalho.",
  phoneLabel: "(38) 3841-4972",
  whatsappLabel: "5538998751488",
  whatsappNumber: "5538998751488",
  email: "tst.mauriciomc@yahoo.com.br",
  address: "Av. João Pena Sobrinho, 316 - Centro, Salinas - MG, 39560-000",
  cnpj: "13.309.805/0001-63",
  instagram: "https://www.instagram.com/tst.distribuidora/",

};

export const waLink = (message: string) =>
  `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;

export type NavItem = { id: string; label: string; to?: string };

export const NAV: NavItem[] = [
  { id: "inicio", label: "Início" },
  { id: "sobre", label: "Sobre Nós" },
  { id: "catalogo", label: "Catálogo de Produtos", to: "/catalogo" },
  { id: "consultar-ca", label: "Consultar CA"},
];

export const CATEGORY_IMAGE_KEYS = [
  "Capacetes",
  "Proteção Auditiva",
  "Luvas de Proteção",
  "Calçados de Segurança",
  "Proteção Respiratória",
  "Proteção Visual",
  "Ferramentas",
  "Kits de Emergência",
] as const;