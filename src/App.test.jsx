import React from "react";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import "isomorphic-fetch";

describe("Button test", () => {
  test("should be defined", async () => {
    render(<App url="" />);

    const button = await screen.findByRole("button");
    expect(button).toBeDefined(true);
  });
});
