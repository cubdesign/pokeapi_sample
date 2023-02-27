import { ApiGetPokemonResponse, getPokemon } from "@/services/pokeapi";
import { Pokemon, PokemonDetails } from "@/types/pokemonTypes";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
export type PokemonRowProps = {
  pokemon: Pokemon;
};
const PokemonRow: FC<PokemonRowProps> = ({ pokemon }) => {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const { data, isLoading } = useQuery<ApiGetPokemonResponse, Error>({
    queryKey: [`pokemon`, pokemon.url],
    queryFn: () => getPokemon(pokemon.url),
  });

  useEffect(() => {
    if (data) {
      setDetails({
        id: data.id,
        name: data.name,
        imageURL: data.sprites.front_default,
      });
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {details && (
        <Link href={`/pokemon/${details.id}`}>
          {/* eslint-disable @next/next/no-img-element */}
          <img src={details.imageURL} alt={details.name} />
          {/* eslint-enable @next/next/no-img-element */}
          <div>{pokemon.name}</div>
          <div>{details.id}</div>
        </Link>
      )}
    </div>
  );
};

export default PokemonRow;
