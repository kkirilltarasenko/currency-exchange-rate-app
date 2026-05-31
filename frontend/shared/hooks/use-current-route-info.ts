import { usePathname } from "next/navigation";
import { LINKS, type TRoute } from "../router/router.types";

export const useCurrentRouteInfo = () => {
  const pathname = usePathname();

  const getIsActiveRoute = (route?: TRoute) => {
    if (!route) {
      return false;
    }
    return pathname === route;
  };

  const getPageTitle = (): (typeof LINKS)[number]["titleKey"] | "404" => {
    const pageTitle = LINKS.find(({ path }) => path === pathname);

    if (pageTitle) {
      return pageTitle.titleKey;
    }

    return "404";
  };

  return { getPageTitle, getIsActiveRoute };
};
