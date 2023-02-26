import { ApiGetPokemonResponse, getPokemon } from "@/services/pokeapi";
import { PokemonDetails } from "@/types/pokemonTypes";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

export default function PokemonPage() {
  const router = useRouter();
  let id = router.query.id ? router.query.id.toString() : null;
  const [details, setDetails] = useState<PokemonDetails | null>(null);

  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const { isLoading } = useQuery<ApiGetPokemonResponse, Error>({
    queryKey: [`pokemon`, pokemonUrl],
    queryFn: () => getPokemon(pokemonUrl),
    onSuccess(data) {
      setDetails({
        id: data.id,
        name: data.name,
        imageURL: data.sprites.front_default,
      });
    },
    enabled: !!id,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {details && (
        <Head>
          <title>{details.name}</title>
          <meta name="description" content="pokeapi sample." />
        </Head>
      )}
      {details && (
        <main>
          <h1>
            {details.id}: {details.name}
          </h1>

          {/* eslint-disable @next/next/no-img-element */}
          <img src={details.imageURL} alt={details.name} />
          {/* eslint-enable @next/next/no-img-element */}
        </main>
      )}
    </>
  );
}
