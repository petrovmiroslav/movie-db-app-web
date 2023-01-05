import React from "react";
import { getImageLoader } from "../../utils/images";
import Image from "next/image";
import { ImageProps } from "next/dist/client/image";
import { cn } from "../../utils/styles";
import css from "./Img.module.scss";
import { ConfigurationImages } from "../../features/configuration/configuration.types";

export type ImgProps = {
  src: ImageProps["src"] | undefined;
  baseUrl: ConfigurationImages["secureBaseUrl"];
  sizesList: ConfigurationImages["posterSizes"];
} & Pick<ImageProps, "className" | "alt" | "sizes" | "priority" | "style">;

export const Img = React.memo<ImgProps>((props) => {
  const { src, className, baseUrl, sizesList, alt, ...restProps } = props;

  if (!src) return null;
  return (
    <Image
      className={cn(css.img, className)}
      src={src}
      fill={true}
      loader={getImageLoader(baseUrl, sizesList)}
      alt={alt}
      {...restProps}
    />
  );
});
Img.displayName = "Img";
