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
    disabled: false,
  },
  {
    title: "Валютные Курсы",
    path: Routes.RATES,
    icon: FiTrendingUp,
    disabled: true,
  },
  {
    title: "История",
    path: Routes.HISTORY,
    icon: FiBarChart,
    disabled: true,
  },
  {
    title: "Настройки",
    path: Routes.SETTINGS,
    icon: FiSettings,
    disabled: false,
  }
] as const