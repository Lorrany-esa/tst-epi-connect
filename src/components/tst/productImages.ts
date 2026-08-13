import prodCapacete from "@/assets/prod-capacete.jpg";
import prodAuditiva from "@/assets/prod-auditiva.jpg";
import prodLuvas from "@/assets/prod-luvas.jpg";
import prodBotas from "@/assets/prod-botas.jpg";
import prodRespiratoria from "@/assets/prod-respiratoria.jpg";
import prodOculos from "@/assets/prod-oculos.jpg";
import prodFerramentas from "@/assets/prod-ferramentas.jpg";
import prodEmergencia from "@/assets/prod-emergencia.jpg";

const BY_CATEGORY: Record<string, string> = {
  Capacetes: prodCapacete,
  "Proteção Auditiva": prodAuditiva,
  "Luvas de Proteção": prodLuvas,
  "Calçados de Segurança": prodBotas,
  "Proteção Respiratória": prodRespiratoria,
  "Proteção Visual": prodOculos,
  Ferramentas: prodFerramentas,
  "Kits de Emergência": prodEmergencia,
  "Proteção Contra Quedas": prodBotas,
  Vestuário: prodEmergencia,
};

export function productImage(imageUrl?: string | null, category?: string | null) {
  if (imageUrl) return imageUrl;
  if (category && BY_CATEGORY[category]) return BY_CATEGORY[category];
  return prodCapacete;
}

export function formatPrice(price: number | null, priceLabel: string | null) {
  if (priceLabel) return priceLabel;
  if (price === null || price === undefined) return "Sob consulta";
  return price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}