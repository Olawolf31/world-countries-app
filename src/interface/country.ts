export interface Countries {
  name: Name;
  cca2: string;
  independent?: boolean;
  capital?: string[];
  region: Region;
  subregion?: string;
  languages?: { [key: string]: string };
  latlng: number[];
  area: number;

  flag: string;
  maps: Maps;
  population: number;
  flags: Flags;
}

export interface CapitalInfo {
  latlng?: number[];
}

export interface Flags {
  png: string;
  svg: string;
  alt?: string;
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Name {
  common: string;
  official: string;
}

export enum Region {
  Africa = "Africa",
  Americas = "Americas",
  Antarctic = "Antarctic",
  Asia = "Asia",
  Europe = "Europe",
  Oceania = "Oceania",
}

export interface CountrySlice {
  countries: Countries[];
  loading: boolean;
  error: boolean;
  favorites: Countries[];
  search: string;
  message: string;
}
