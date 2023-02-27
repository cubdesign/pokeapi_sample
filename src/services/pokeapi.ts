import { Pokemon } from "@/types/pokemonTypes";
import axios from "axios";
import { S } from "vitest/dist/types-7cd96283";

export type ApiGetPokemonsParams = {
  limit: number;
  offset: number;
};

export type ApiGetPokemonsResponse = {
  count: number;
  next: string;
  previous: string;
  results: Pokemon[];
};

export type ApiGetPokemonResponse = {
  id: number;
  name: string;
  weight: number;
  height: number;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  species: {
    name: string;
    url: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
};

export type ApiGetPokemonSpeciesResponse = {
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  genera: {
    genus: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: {
      name: string;
      url: string;
    };
    version: {
      name: string;
      url: string;
    };
  }[];
};

export type ApiGetPokemonTypeResponse = {
  names: {
    name: string;
    language: {
      name: string;
      url: string;
    };
  }[];
};

export const apiClient = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export const getPokemons = async ({ limit, offset }: ApiGetPokemonsParams) => {
  const res = await apiClient.get<ApiGetPokemonsResponse>(`/pokemon`, {
    params: { limit, offset },
  });

  return res.data;
};

export const getPokemon = async (url: string) => {
  const res = await apiClient.get<ApiGetPokemonResponse>(url);
  return res.data;
};

export const getPokemonSpecies = async (url: string) => {
  const res = await apiClient.get<ApiGetPokemonSpeciesResponse>(url);
  console.log(res.data);
  return res.data;
};

export const getPokemonType = async (url: string) => {
  const res = await apiClient.get<ApiGetPokemonTypeResponse>(url);
  console.log(res.data);
  return res.data;
};
