import React from "react";
import { Image } from "../../../../features/images/images.types";
import { Img, ImgProps } from "../../../../components/Img/Img";
import { Movie } from "../../../../features/movies/movies.types";
import css from "./MovieImagesSlider.module.scss";
import { cn } from "../../../../utils/styles";
import { SectionHeader } from "../../../../components/headers/SectionHeader/SectionHeader";

type MovieImagesSliderProps = {
  imageList: Image[] | undefined;
  headerText: string;
  isPosters?: boolean;
} & Pick<Movie, "title"> &
  Pick<ImgProps, "baseUrl" | "sizesList">;

export const MovieImagesSlider = React.memo<MovieImagesSliderProps>((props) => {
  const {
    headerText,
    imageList,
    title = "",
    baseUrl,
    sizesList,
    isPosters,
  } = props;

  if (!imageList?.length) return null;
  return (
    <>
      <SectionHeader className={css.sectionHeader}>{headerText}</SectionHeader>

      <div className={css.container}>
        {imageList?.map((image) => (
          <div key={image.filePath} className={css.item}>
            <div
              className={cn(
                css.item__imgContainer,
                isPosters && css.item__imgContainer_poster
              )}
            >
              <Img
                src={image.filePath}
                baseUrl={baseUrl}
                sizesList={sizesList}
                alt={title}
                sizes={isPosters ? "20vw" : "50vw"}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
});

MovieImagesSlider.displayName = "MovieImagesSlider";
