import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Banner {
  id: string;
  title?: string;
  highlight?: string;
  description?: string;
  badge?: string;
  button_label?: string;
  image_url?: string;
}

export function HeroBanner({ onNavigate }: { onNavigate: (id: string) => void }) {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    async function loadBanners() {
      const { data } = await supabase
        .from("banners")
        .select("*")
        .order("order_index", { ascending: true });

      if (data && data.length > 0) {
        setBanners(data);
      }
    }
    loadBanners();
  }, []);

  // Auto-rotação a cada 5 segundos
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const banner = banners[current];

  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-transparent transition-all duration-500 shadow-lg">
      {/* Imagem do Banner em alta visibilidade e proporcionalidade */}
      {banner.image_url ? (
        <div className="relative w-full min-h-[300px] sm:min-h-[400px] md:min-h-[480px]">
          <img
            src={banner.image_url}
            alt={banner.title || "Banner Promocional"}
            className="h-full w-full object-cover object-center"
          />

          {/* Renderização condicional de textos caso o banner tenha texto via banco */}
          {(banner.title || banner.description || banner.badge) && (
            <div className="absolute inset-0 z-10 flex flex-col justify-center bg-gradient-to-r from-black/70 via-black/30 to-transparent p-6 sm:p-12 max-w-2xl text-white">
              {banner.badge && (
                <span className="inline-block w-fit rounded-md bg-emerald-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2 border border-emerald-500/30">
                  {banner.badge}
                </span>
              )}

              {banner.title && (
                <h1 className="text-2xl font-extrabold uppercase tracking-tight sm:text-4xl md:text-5xl">
                  {banner.title}{" "}
                  {banner.highlight && (
                    <span className="text-emerald-400">{banner.highlight}</span>
                  )}
                </h1>
              )}

              {banner.description && (
                <p className="mt-3 text-xs sm:text-base text-slate-200">
                  {banner.description}
                </p>
              )}

              <button
                onClick={() => onNavigate("catalogo")}
                className="mt-6 flex w-fit items-center gap-2 rounded-md bg-emerald-500 px-6 py-3 text-xs sm:text-sm font-bold text-black shadow-lg transition hover:bg-emerald-400"
              >
                {banner.button_label || "ACESSAR CATÁLOGO DE PRODUTOS"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Botão padrão apenas no canto inferior caso a imagem do banner seja pura (sem título cadastrado) */}
          {!banner.title && !banner.description && (
            <div className="absolute bottom-6 left-6 z-10 sm:left-12 sm:bottom-10">
              <button
                onClick={() => onNavigate("catalogo")}
                className="flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-3 text-xs sm:text-sm font-bold text-black shadow-xl transition hover:bg-emerald-400 hover:scale-105"
              >
                {banner.button_label || "ACESSAR CATÁLOGO DE PRODUTOS"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      ) : null}

      {/* Controles de navegação (caso haja mais de 1 banner) */}
      {banners.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1))}
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
            aria-label="Próximo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicadores inferiores */}
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === current ? "w-6 bg-emerald-500" : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}