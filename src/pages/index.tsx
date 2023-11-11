import React from "react";
import { PageLayout } from "../layouts/PageLayout/PageLayout";
import { PageHeader } from "../components/PageHeader/PageHeader";
import { GetServerSidePropsType, PageWithLayout } from "../utils/next";
import { dehydrate, QueryClient } from "@tanstack/query-core";
import { moviesQueries } from "../features/movies/movies.queries";
import { configurationQueries } from "../features/configuration/configuration.queries";
import { genresQueries } from "../features/genres/genres.queries";
import { ChartMovies } from "../sections/Home/ChartMovies/ChartMovies";
import {
  usePopularMovies,
  useTopRatedMovies,
} from "../features/movies/movies.hooks";
import { GenresSlider } from "../sections/Home/GenresSlider/GenresSlider";
import { useTranslation } from "next-i18next";
import { getServerSideTranslations } from "../utils/i18n/i18n";
import { getThemeFromCookiesSSR } from "../features/theme/utils/utils";
import css from "../sections/Home/Home.module.scss";

// noinspection JSUnusedGlobalSymbols
export const getServerSideProps: GetServerSidePropsType = async (context) => {
  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery(configurationQueries.configuration),
    queryClient.prefetchInfiniteQuery(
      moviesQueries.popular({ language: context.locale })
    ),
    queryClient.prefetchInfiniteQuery(
      moviesQueries.topRated({ language: context.locale })
    ),
    queryClient.prefetchQuery(
      genresQueries.movie({ language: context.locale })
    ),
  ]);

  const queryClientDehydratedState = JSON.parse(
    JSON.stringify(dehydrate(queryClient))
  );

  return {
    props: {
      ...(await getServerSideTranslations({
        locale: context.locale,
        ns: ["home"],
      })),
      queryClientDehydratedState,
      themeSetting: getThemeFromCookiesSSR(context.req.cookies),
    },
  };
};

const Home: PageWithLayout = () => {
  const { t } = useTranslation(["common", "home"]);

  return (
    <div className={css.container}>
      <PageHeader>{t("tabs.main")}</PageHeader>

      <ChartMovies
        header={t("popular.header", { ns: "home" })}
        useMoviesQuery={usePopularMovies}
      />
      <ChartMovies
        header={t("topRated.header", { ns: "home" })}
        useMoviesQuery={useTopRatedMovies}
      />

      <GenresSlider />
    </div>
  );
};

Home.getLayout = (page) => {
  return <PageLayout>{page}</PageLayout>;
};

// noinspection JSUnusedGlobalSymbols
export default Home;
