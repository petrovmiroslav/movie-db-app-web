import { expect, Page, test } from "@playwright/test";
import { MOVIE_PAGE_TITLE_TEST_ID } from "../src/constants/e2e";
import { i18Resources } from "../@types/i18next";

const clickOnFirstMovieCardAndCheckMoviePageTitle = async (page: Page) => {
  const elementTitle = i18Resources.common.components.TitleMovieCard.title;

  const movieCard = await page
    .getByRole("link")
    .filter({ has: page.getByTitle(elementTitle) })
    .first();

  const movieCardTitle = await movieCard
    .getByTitle(elementTitle)
    .first()
    .textContent();

  await movieCard.click();

  const header = await page.getByTestId(MOVIE_PAGE_TITLE_TEST_ID);
  const headerText = await header.textContent();

  await expect(headerText).toBe(movieCardTitle);
};

test(
  "pressing on home page movie button, " +
    "navigate to the movie page with movie title header",
  async ({ page }) => {
    await page.goto("/");

    await clickOnFirstMovieCardAndCheckMoviePageTitle(page);
  }
);

test(
  "type text to the search input, press on a movie card, " +
    "navigate to the movie page with movie title header",
  async ({ page }) => {
    await page.goto("/");

    const navigation = await page.getByRole("navigation");
    const searchLink = await navigation.getByText(
      i18Resources.common.tabs.search
    );

    await searchLink.click();

    const searchInput = await page.getByRole("textbox");

    await searchInput.fill("2 fast");

    await clickOnFirstMovieCardAndCheckMoviePageTitle(page);
  }
);
