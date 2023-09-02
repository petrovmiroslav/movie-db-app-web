import React from "react";
import {
  EMPTY_ICON_TEST_ID,
  FavoriteButton,
  FILLED_ICON_TEST_ID,
} from "../FavoriteButton";
import { render, screen } from "@testing-library/react";
import { MovieId } from "../../../../features/movies/movies.types";
import { TestApp } from "../../../../utils/tests";
import css from "../FavoriteButton.module.scss";
import { server } from "../../../../../__mocks__/msw/server";
import userEvent from "@testing-library/user-event";
import { i18Resources } from "../../../../../@types/i18next";

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const MOVIE_ID = 1 as MovieId;

test("FavoriteButton can add and remove item by id to favorite, and render icons", async () => {
  const user = userEvent.setup();

  render(
    <TestApp>
      <FavoriteButton movieId={MOVIE_ID} />
    </TestApp>
  );

  const role = "button";

  // button with role add to favorites
  const button = screen.getByRole(role, {
    name: i18Resources.common.components.FavoriteButton.addToFavoritesAriaLabel,
  });

  // accidental double tap
  await user.dblClick(button);

  /* after add to favorite
   * Button with role remove from favorites */
  expect(
    await screen.findByRole(role, {
      name: i18Resources.common.components.FavoriteButton
        .removeFromFavoritesAriaLabel,
    })
  ).toBeTruthy();

  // filled icon visible, empty icon invisible
  expect(screen.getByTestId(FILLED_ICON_TEST_ID)).not.toHaveClass(
    css.icon_hidden
  );
  expect(screen.getByTestId(EMPTY_ICON_TEST_ID)).toHaveClass(css.icon_hidden);

  // accidental double tap
  await user.dblClick(button);

  /* after remove from favorite
   * Button with role add to favorites*/
  expect(
    await screen.findByRole(role, {
      name: i18Resources.common.components.FavoriteButton
        .addToFavoritesAriaLabel,
    })
  ).toBeTruthy();

  // filled icon invisible, empty icon visible
  expect(screen.getByTestId(FILLED_ICON_TEST_ID)).toHaveClass(css.icon_hidden);
  expect(screen.getByTestId(EMPTY_ICON_TEST_ID)).not.toHaveClass(
    css.icon_hidden
  );
});
