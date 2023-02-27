import usePokemonTypes from "@/hooks/usePokemonTypes";
import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material/styles";
import { FC } from "react";

export type PokemonTypeTextProps = {
  url: string;
  sx?: SxProps<Theme>;
};

const PokemonTypeText: FC<PokemonTypeTextProps> = ({ url, sx }) => {
  const { type } = usePokemonTypes({ url: url });
  return <Box sx={sx}>{type}</Box>;
};

export default PokemonTypeText;
