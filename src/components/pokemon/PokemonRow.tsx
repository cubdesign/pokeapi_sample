import { ApiGetPokemonResponse, getPokemon } from "@/services/pokeapi";
import { Pokemon, PokemonDetails } from "@/types/pokemonTypes";
import Link from "next/link";
import { FC, useState } from "react";
import { useQuery } from "react-query";
export type PokemonRowProps = {
  pokemon: Pokemon;
};
const PokemonRow: FC<PokemonRowProps> = ({ pokemon }) => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const { isLoading } = useQuery<ApiGetPokemonResponse, Error>({
    queryKey: [`pokemon`, pokemon.url],
    queryFn: () => getPokemon(pokemon.url),
    onSuccess(data) {
      setDetails({
        ...data,
      });
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <Link href={`/pokemon/${details!.id}}`}>
        <div>{pokemon.name}</div>
        <div>{details!.id}</div>
      </Link>
    </div>
  );
};

export default PokemonRow;
