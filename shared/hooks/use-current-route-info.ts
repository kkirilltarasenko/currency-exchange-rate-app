import { usePathname } from "next/navigation";
import { type TRoute } from "../router/router.types";

export const useCurrentRouteInfo = () => {
  const pathname = usePathname();

  const getIsActiveRoute = (route?: TRoute) => {
    if (!route) {
      return false;
    }
    return pathname === route;
  }

  const getPageTitle = () => {
    const path = pathname.replace("/", "");
    return path.charAt(0).toUpperCase() + path.slice(1)
  }

  return { getPageTitle, getIsActiveRoute };
}