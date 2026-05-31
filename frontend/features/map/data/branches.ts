export type BankBranch = {
  id: string;
  name: string;
  address: string;
  hours: string;
  position: [number, number];
};

export const BANK_BRANCHES: BankBranch[] = [
  {
    id: "alfa-nemiga",
    name: "Альфа-Банк — Отделение на Немиге",
    address: "г. Минск, ул. Немига, 5",
    hours: "Пн–Пт 09:00–19:00, Сб 10:00–16:00",
    position: [53.9061, 27.5517],
  },
  {
    id: "belarusbank-independence",
    name: "Беларусбанк — Отделение на Независимости",
    address: "г. Минск, пр-т Независимости, 56",
    hours: "Пн–Пт 09:00–20:00, Сб 10:00–15:00",
    position: [53.9153, 27.5843],
  },
  {
    id: "belagroprombank-vokzal",
    name: "Белагропромбанк — Отделение у вокзала",
    address: "г. Минск, ул. Бобруйская, 6",
    hours: "Пн–Пт 09:00–18:00, Сб 10:00–14:00",
    position: [53.8919, 27.5512],
  },
  {
    id: "dabrabyt-bank-sports",
    name: "Дабрабыт-Банк — Отделение на Победителей",
    address: "г. Минск, пр-т Победителей, 23",
    hours: "Пн–Пт 09:00–18:30, Сб 10:00–15:00",
    position: [53.9193, 27.5437],
  },
];
