import Head from "next/head";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Pokemon } from "@/types/pokemonTypes";
import PokemonRow from "@/components/pokemon/PokemonRow";
import { ApiGetPokemonsResponse, getPokemons } from "@/services/pokeapi";

export default function Home() {
  const limit = 10;
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const { data, isLoading, error, isSuccess, isError, refetch } = useQuery<
    ApiGetPokemonsResponse,
    Error
  >({
    queryKey: [`pokemons`],
    queryFn: () => getPokemons(limit),
  });

  useEffect(() => {
    if (data) {
      setPokemons(data.results);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>pokeapi sample</title>
        <meta name="description" content="pokeapi sample." />
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
