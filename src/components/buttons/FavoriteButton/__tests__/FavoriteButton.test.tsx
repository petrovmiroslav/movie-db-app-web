import React from "react";
import {
  DEFAULT_ADD_TO_FAVORITES_LABEL_TEXT,
  DEFAULT_REMOVE_FROM_FAVORITES_LABEL_TEXT,
  EMPTY_ICON_TEST_ID,
  FavoriteButton,
  FILLED_ICON_TEST_ID,
} from "../FavoriteButton";
import { screen } from "@testing-library/react";
import { MovieId } from "../../../../features/movies/movies.types";
import { renderWithClient } from "../../../../utils/tests";
import css from "../FavoriteButton.module.scss";
import { CommonApp } from "../../../../pages/_app";
import { server } from "../../../../../__mocks__/msw/server";
import userEvent from "@testing-library/user-event";

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const MOVIE_ID = 1 as MovieId;

test("FavoriteButton can add and remove item by id to favorite, and render icons", async () => {
  const user = userEvent.setup();

  renderWithClient(
    <CommonApp>
      <FavoriteButton movieId={MOVIE_ID} />
    </CommonApp>
  );

  const role = "button";

  // button with role DEFAULT_ADD_TO_FAVORITES_LABEL_TEXT
  const button = screen.getByRole(role, {
    name: DEFAULT_ADD_TO_FAVORITES_LABEL_TEXT,
  });

  // accidental double tap
  await user.dblClick(button);

  /* after add to favorite
   * Button with role DEFAULT_REMOVE_FROM_FAVORITES_LABEL_TEXT */
  expect(
    await screen.findByRole(role, {
      name: DEFAULT_REMOVE_FROM_FAVORITES_LABEL_TEXT,
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
   * Button with role DEFAULT_ADD_TO_FAVORITES_LABEL_TEXT*/
  expect(
    await screen.getByRole(role, {
      name: DEFAULT_ADD_TO_FAVORITES_LABEL_TEXT,
    })
  ).toBeTruthy();

  // filled icon invisible, empty icon visible
  expect(screen.getByTestId(FILLED_ICON_TEST_ID)).toHaveClass(css.icon_hidden);
  expect(screen.getByTestId(EMPTY_ICON_TEST_ID)).not.toHaveClass(
    css.icon_hidden
  );
});
