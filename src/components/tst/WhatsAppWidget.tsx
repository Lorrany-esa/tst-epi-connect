import { MessageCircle } from "lucide-react";
import { waLink } from "./data";

export function WhatsAppWidget() {
  return (
    <a
      href={waLink("Olá! Gostaria de um orçamento de EPI.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-4 font-bold text-brand-foreground shadow-brand transition hover:brightness-110"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden sm:inline">Fale conosco</span>
    </a>
  );
}