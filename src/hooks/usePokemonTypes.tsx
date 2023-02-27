import { ApiGetPokemonTypeResponse, getPokemonType } from "@/services/pokeapi";
import { useQuery } from "react-query";

export type PokemonTypesProps = { url: string };

export type UsePokemonTypesResult = {
  type: string;
};

const usePokemonTypes = ({ url }: PokemonTypesProps): UsePokemonTypesResult => {
  const { data: details } = useQuery<ApiGetPokemonTypeResponse, Error>({
    queryKey: [`pokemon-types`, url],
    queryFn: () => getPokemonType(url),
    enabled: url !== "",
  });

  let type = "";
  if (details) {
    type = details?.names.find((el) => el.language.name === "ja")?.name ?? "";
  }

  return { type };
};

export default usePokemonTypes;
