import { usePathname } from "next/navigation";
import { LINKS, type TRoute } from "../router/router.types";

export const useCurrentRouteInfo = () => {
  const pathname = usePathname();

  const getIsActiveRoute = (route?: TRoute) => {
    if (!route) {
      return false;
    }
    return pathname === route;
  }

  const getPageTitle = () => {
    const pageTitle = LINKS.find(({ path }) => (
      path === pathname
    ));

    if (pageTitle) {
      return pageTitle.title;
    }

    return "404"
  }

  return { getPageTitle, getIsActiveRoute };
}