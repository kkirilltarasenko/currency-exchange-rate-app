import { usePathname } from "next/navigation";
import { LINKS, type TRoute } from "../router/router.types";

export const useCurrentRouteInfo = () => {
  const pathname = usePathname().replace(/\/$/, "");

  const getIsActiveRoute = (route?: TRoute) => {
    if (!route) {
      return false;
    }
    return pathname.endsWith(route);
  };

  const getPageTitle = (): (typeof LINKS)[number]["titleKey"] | "404" => {
    const pageTitle = LINKS.find(({ path }) => pathname.endsWith(path));

    if (pageTitle) {
      return pageTitle.titleKey;
    }

    return "404";
  };

  return { getPageTitle, getIsActiveRoute };
};
