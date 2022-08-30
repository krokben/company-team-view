import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import "isomorphic-fetch";

describe("Grid toggle test", () => {
  test("should toggle grid on button click", async () => {
    render(<App url="" />);

    const button = await screen.findByTestId("grid-toggle");
    button.click();
    expect(await screen.findByTestId("members-grid")).toBeDefined(true); // not working
  });
});
