import { CookieSerializeOptions } from "next/dist/server/web/spec-extension/cookies/types";

export enum CookiesKeys {
  LOCALE = "NEXT_LOCALE",
  THEME_SETTING = "NEXT_THEME_SETTING",
}

export const setClientCookies = (
  params: {
    key: CookiesKeys;
    value: string;
  } & Pick<CookieSerializeOptions, "path">
) => {
  document.cookie = `${params.key}=${params.value}; path=${
    params.path ?? "/"
  }; samesite=Lax; secure`;
};

export const getCookie = (cname: string) => {
  if (typeof document === "undefined") return "";
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};
