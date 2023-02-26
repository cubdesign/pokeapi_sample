import Head from "next/head";
import { useQuery } from "react-query";
import { useState } from "react";
import { Pokemon } from "@/types/pokemonTypes";
import PokemonRow from "@/components/pokemon/PokemonRow";
import { ApiGetPokemonsResponse, getPokemons } from "@/services/pokeapi";

export default function Home() {
  const limit = 10;
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const { isLoading, error, isSuccess, isError, refetch } = useQuery<
    ApiGetPokemonsResponse,
    Error
  >({
    queryKey: [`pokemons`],
    queryFn: () => getPokemons(limit),
    onSuccess(data) {
      setPokemons(data.results);
    },
  });

  return (
    <>
      <Head>
        <title>pokeapi sample</title>
        <meta name="description" content="pokeapi sample." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>pokeapi sample</h1>
        {pokemons.map((pokemon, index) => {
          return <PokemonRow key={index} pokemon={pokemon}></PokemonRow>;
        })}
      </main>
    </>
  );
}
