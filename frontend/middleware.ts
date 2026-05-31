import createMiddleware from "next-intl/middleware";
import { locales } from "./i18n";

const basePath = "/currency-exchange-rate-app";

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: "ru",
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/currency-exchange-rate-app/",
    "/currency-exchange-rate-app/(ru|en)/:path*",
  ],
};
