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
    title: "Главная",
    path: Routes.HOME,
    icon: FiHome,
  },
  {
    title: "Валютные Курсы",
    path: Routes.RATES,
    icon: FiTrendingUp,
  },
  {
    title: "История",
    path: Routes.HISTORY,
    icon: FiBarChart,
  },
  {
    title: "Настройки",
    path: Routes.SETTINGS,
    icon: FiSettings,
  }
] as const