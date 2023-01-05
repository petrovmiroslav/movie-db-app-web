import React from "react";
import { render, screen } from "@testing-library/react";
import { TextInput } from "../TextInput";

const VALUE = "VALUE";

test(`'<TextInput value="${VALUE}"/>' 
   renders input with value="${VALUE}"`, () => {
  render(<TextInput value={VALUE} />);

  expect(screen.getByDisplayValue(VALUE)).toBeTruthy();
});
