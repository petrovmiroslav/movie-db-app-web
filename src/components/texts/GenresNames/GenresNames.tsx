import React from "react";
import { Genre, GenreId } from "../../../features/genres/genres.types";
import { cn, commonCss } from "../../../utils/styles";
import css from "./GenresNames.module.scss";
import { typeCheckers } from "../../../utils/types";
import { useGenresDict } from "../../../features/genres/genres.hooks";

type GenresNamesProps = {
  genreList?: Genre[];
  genreIdList?: GenreId[];
  className?: string;
};

export const GenresNames = React.memo<GenresNamesProps>((props) => {
  const { genreList, genreIdList, className } = props;

  const genresDict = useGenresDict();

  const genreOrGenreIdList = genreList?.length ? genreList : genreIdList;

  const genreNameList = genreOrGenreIdList
    ?.map((genreOrGenreId) => {
      if (typeCheckers.numberFinite(genreOrGenreId)) {
        return genresDict[genreOrGenreId]?.name;
      }
      return genreOrGenreId.name;
    })
    .filter(Boolean);

  if (!genreNameList?.length) return null;
  return (
    <p className={cn(commonCss.ellipsis, css.list, className)}>
      {genreNameList?.join(", ")}
    </p>
  );
});

GenresNames.displayName = "GenresNames";
