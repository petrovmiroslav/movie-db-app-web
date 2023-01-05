import { ImageLoader } from "next/dist/client/image";

export const DEFAULT_IMAGE_SIZE = "original";

export const getOptimalImageWidth = (
  sizesList: string[] | undefined,
  width: number
): string | undefined => {
  if (!sizesList?.length) return;

  const pixelSizesList = sizesList.reduce<number[]>((list, curr) => {
    if (!curr.startsWith("w")) return list;
    const maybeNumber = +curr.slice(1);
    if (Number.isNaN(maybeNumber)) return list;
    list.push(maybeNumber);
    return list;
  }, []);

  const sortedPixelSizesList = pixelSizesList.sort((a, b) => a - b);

  for (let i = 0; i < sortedPixelSizesList.length; i++) {
    if (sortedPixelSizesList[i] > width) return "w" + sortedPixelSizesList[i];
  }
};

export const getImageUrl = (
  baseUrl: string | undefined,
  size: string | undefined,
  filePath: string | undefined | null
): string | undefined => {
  if (!baseUrl || !filePath) return;
  return baseUrl + (size ?? DEFAULT_IMAGE_SIZE) + filePath;
};

export const getImageLoader =
  (
    baseUrl: Parameters<typeof getImageUrl>[0],
    sizesList: Parameters<typeof getOptimalImageWidth>[0]
  ): ImageLoader =>
  ({ src, width }) => {
    const sizePart = getOptimalImageWidth(sizesList, width);
    return getImageUrl(baseUrl, sizePart, src) ?? "";
  };
