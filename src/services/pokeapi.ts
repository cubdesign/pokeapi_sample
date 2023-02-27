import { Pokemon } from "@/types/pokemonTypes";
import axios from "axios";

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
  sprites: {
    front_default: string;
  };
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
