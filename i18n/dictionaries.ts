import "server-only";
import type { Locale } from "./config";
import { en, type Dict } from "./dictionaries/en";
import { vi } from "./dictionaries/vi";

const dicts: Record<Locale, Dict> = { en, vi };

export function getDictionary(locale: Locale): Dict {
  return dicts[locale];
}

export type { Dict };
