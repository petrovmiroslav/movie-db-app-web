export enum Languages {
  BG = "bg",
  DA = "da",
  DE = "de",
  EN = "en",
  ES = "es",
  FR = "fr",
  IT = "it",
  NL = "nl",
  PL = "pl",
  PT = "pt",
  RU = "ru",
}

export const LanguagesData = {
  [Languages.BG]: {
    name: "Български",
  },
  [Languages.DA]: {
    name: "Dansk",
  },
  [Languages.DE]: {
    name: "Deutsch",
  },
  [Languages.EN]: {
    name: "English",
  },
  [Languages.ES]: {
    name: "Español",
  },
  [Languages.FR]: {
    name: "Français",
  },
  [Languages.IT]: {
    name: "Italiano",
  },
  [Languages.NL]: {
    name: "Nederlands",
  },
  [Languages.PL]: {
    name: "Polski",
  },
  [Languages.PT]: {
    name: "Português",
  },
  [Languages.RU]: {
    name: "Русский",
  },
} as const satisfies Record<Languages, { name: string } | undefined>;
