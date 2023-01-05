import React from "react";
import { GenresDictContext } from "./genres.contexts";

export const useGenresDict = () => {
  return React.useContext(GenresDictContext);
};
