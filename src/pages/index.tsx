import Head from "next/head";
import { useQuery } from "react-query";
import PokemonRow from "@/components/pokemon/PokemonRow";
import { ApiGetPokemonsResponse, getPokemons } from "@/services/pokeapi";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function Home() {
  const limit = 12;

  const { data, isLoading, error, isSuccess, isError, refetch } = useQuery<
    ApiGetPokemonsResponse,
    Error
  >({
    queryKey: [`pokemons`],
    queryFn: () => getPokemons(limit),
  });

  const pokemons = data ? data.results : [];

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>pokeapi sample</title>
        <meta name="description" content="pokeapi sample." />
      </Head>
      <main>
        <Container
          sx={{
            textAlign: "center",
          }}
        >
          <h1>pokeapi sample</h1>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {pokemons.map((pokemon, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    width: "33%",
                  }}
                >
                  <PokemonRow pokemon={pokemon}></PokemonRow>
                </Box>
              );
            })}
          </Box>
        </Container>
      </main>
    </>
  );
}
