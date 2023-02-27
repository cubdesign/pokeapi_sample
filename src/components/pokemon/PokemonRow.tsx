import { ApiGetPokemonResponse, getPokemon } from "@/services/pokeapi";
import { Pokemon, PokemonDetails } from "@/types/pokemonTypes";
import Box from "@mui/material/Box";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
export type PokemonRowProps = {
  pokemon: Pokemon;
};
const PokemonRow: FC<PokemonRowProps> = ({ pokemon }) => {
  const { data: details, isLoading } = useQuery<ApiGetPokemonResponse, Error>({
    queryKey: [`pokemon`, pokemon.url],
    queryFn: () => getPokemon(pokemon.url),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box
      sx={{
        height: "200px",
      }}
    >
      {details && (
        <Link href={`/pokemon/${details.id}`}>
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src={details.sprites.front_default}
            alt={details.name}
            style={{
              width: "96px",
              height: "96px",
            }}
          />
          {/* eslint-enable @next/next/no-img-element */}
          <div>{pokemon.name}</div>
          <div>{details.id}</div>
        </Link>
      )}
    </Box>
  );
};

export default PokemonRow;
