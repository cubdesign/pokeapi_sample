import PokemonTypeText from "@/components/pokemon/PokemonTypeText";
import usePokemonTypes from "@/hooks/usePokemonTypes";
import {
  ApiGetPokemonResponse,
  ApiGetPokemonSpeciesResponse,
  getPokemon,
  getPokemonSpecies,
} from "@/services/pokeapi";
import { PokemonDetails } from "@/types/pokemonTypes";
import Box from "@mui/material/Box";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function PokemonPage() {
  const router = useRouter();
  let id = router.query.id ? router.query.id.toString() : null;

  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${id}/`;

  const { data: details } = useQuery<ApiGetPokemonResponse, Error>({
    queryKey: [`pokemon`, pokemonUrl],
    queryFn: () => getPokemon(pokemonUrl),
    enabled: !!id,
  });

  const { data: species, isLoading } = useQuery<
    ApiGetPokemonSpeciesResponse,
    Error
  >({
    queryKey: [`pokemon-species`, details ? details.species.url : ""],
    queryFn: () => getPokemonSpecies(details ? details.species.url : ""),
    enabled: !!details,
  });

  const typesUrls = details?.types.map((el) => el.type.url) ?? [];

  const nameJa = species?.names.find((el) => el.language.name === "ja")?.name;
  const generaJa = species?.genera.find(
    (el) => el.language.name === "ja"
  )?.genus;

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {details && species && (
        <Head>
          <title>{details.name}</title>
          <meta name="description" content="pokeapi sample." />
        </Head>
      )}
      {details && species && (
        <main>
          <h1>
            {details.id}: {details.name} ({nameJa})
          </h1>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Box
              sx={{
                width: "50%",
              }}
            >
              No: {details.id}
              <br />
              {details.name}
              <br />
              {nameJa}
              <br />
              高さ: {details.height}
              <br />
              重さ: {details.weight}
              <br />
              分類: {generaJa}
              <br />
              タイプ:{" "}
              {typesUrls.map((url, index) => (
                <PokemonTypeText
                  key={index}
                  url={url}
                  sx={{ marginRight: "8px", display: "inline-block" }}
                />
              ))}
              <br />
              説明: xxxx
            </Box>
            <Box
              sx={{
                width: "50%",
              }}
            >
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src={details.sprites.other["official-artwork"].front_default}
                alt={details.name}
              />
              {/* eslint-enable @next/next/no-img-element */}
            </Box>
          </Box>
        </main>
      )}
    </>
  );
}
