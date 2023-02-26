import Head from "next/head";
import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";
import { Pokemon } from "@/types/pokemonTypes";
import PokemonRow from "@/components/pokemon/PokemonRow";

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const query = useQuery(["pokemon"], async () => {
    const { data } = await axios.get("https://pokeapi.co/api/v2/pokemon");
    setPokemons(data.results);
    return data;
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
