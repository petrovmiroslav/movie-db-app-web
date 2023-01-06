import React from "react";
import Head from "next/head";
import { Colors } from "../../constants/colors";

const title = "The Movie Database (TMDB)";
const description =
  "The Movie Database (TMDB) is a popular, user editable database for movies and TV shows.";

export const AppHead = React.memo(() => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="color-scheme" content="only light" />
      <meta name="theme-color" content={Colors.BACKGROUND_LIGHT} />

      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="icon" href="/favicon.ico" />

      <meta
        property="og:url"
        content="https://movie-db-app-web.vercel.app/"
        key="og-url"
      />
      <meta property="og:title" content={title} key="og-title" />
      <meta
        property="og:description"
        content={description}
        key="og-description"
      />
      <meta property="og:image" content="/logo192.png" key="og-image" />
      <meta property="og:locale" content="en" key="og-locale" />

      <meta
        name="keywords"
        content="Movies, TV Shows, Streaming, Reviews, API, Actors, Actresses, Photos, User Ratings, Synopsis, Trailers, Teasers, Credits, Cast"
      />
    </Head>
  );
});
AppHead.displayName = "AppHead";
