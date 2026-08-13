import { useNavigate, useRouterState } from "@tanstack/react-router";
import { NAV } from "./data";

export function useSiteNav() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (id: string) => {
    const item = NAV.find((n) => n.id === id);
    if (item?.to) {
      navigate({ to: item.to });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (pathname !== "/") {
      navigate({ to: "/", hash: id });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}