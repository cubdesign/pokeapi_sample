import Head from "next/head";
import { useInfiniteQuery, useQuery } from "react-query";
import PokemonRow from "@/components/pokemon/PokemonRow";
import {
  ApiGetPokemonsParams,
  ApiGetPokemonsResponse,
  getPokemons,
} from "@/services/pokeapi";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function Home() {
  const limit = 12;
  const { ref, inView, entry } = useInView();
  const {
    data,
    error,
    isFetching,
    status,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery<ApiGetPokemonsResponse, Error>({
    queryKey: [`pokemons`, { limit: limit, offset: 0 }],
    queryFn: (options) => {
      const param = options.pageParam
        ? options.pageParam
        : { limit: limit, offset: 0 };
      return getPokemons(param);
    },
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.next) {
        // hasNextPage = false;
        return undefined;
      }

      const next = new URL(lastPage.next);
      const limit = next.searchParams.get("limit");
      const offset = next.searchParams.get("offset");
      return { limit: limit, offset: offset };
    },
  });
  const pokemons = data?.pages.flatMap((page) => page.results) ?? [];
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (status === "loading") return <div>Loading...</div>;

  if (status === "error") return <div>Error</div>;
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
          <div>
            <button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load More"
                : "Nothing more to load"}
            </button>
          </div>
          <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
        </Container>
      </main>
    </>
  );
}
