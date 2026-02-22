import { FiBarChart, FiHome, FiSettings, FiTrendingUp } from "react-icons/fi";

export const Routes = {
  HOME: "/home",
  RATES: "/exchange-rates",
  HISTORY: "/history",
  SETTINGS: "/settings",
} as const;

export type TRoute = typeof Routes[keyof typeof Routes];

export const LINKS = [
  {
    title: "Home",
    path: Routes.HOME,
    icon: FiHome,
  },
  {
    title: "Exchange Rates",
    path: Routes.RATES,
    icon: FiTrendingUp,
  },
  {
    title: "History",
    path: Routes.HISTORY,
    icon: FiBarChart,
  },
  {
    title: "Settings",
    path: Routes.SETTINGS,
    icon: FiSettings,
  }
] as const