import {
  FiBarChart,
  FiHome,
  FiMapPin,
  FiSettings,
  FiTrendingUp,
} from "react-icons/fi";

export const Routes = {
  HOME: "/home",
  RATES: "/exchange-rates",
  HISTORY: "/history",
  MAP: "/map",
  SETTINGS: "/settings",
} as const;

export type TRoute = (typeof Routes)[keyof typeof Routes];

export const LINKS = [
  {
    titleKey: "navigation.home",
    path: Routes.HOME,
    icon: FiHome,
    disabled: false,
  },
  {
    titleKey: "navigation.exchangeRates",
    path: Routes.RATES,
    icon: FiTrendingUp,
    disabled: true,
  },
  {
    titleKey: "navigation.history",
    path: Routes.HISTORY,
    icon: FiBarChart,
    disabled: true,
  },
  {
    titleKey: "navigation.map",
    path: Routes.MAP,
    icon: FiMapPin,
    disabled: false,
  },
  {
    titleKey: "navigation.settings",
    path: Routes.SETTINGS,
    icon: FiSettings,
    disabled: false,
  },
] as const;
