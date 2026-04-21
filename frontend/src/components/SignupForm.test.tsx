import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignupForm } from "./SignupForm";

describe("SignupForm", () => {
  it("renders email, password, and confirm password fields", () => {
    render(<SignupForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
  });

  it("shows an error for an invalid email", async () => {
    render(<SignupForm />);
    await userEvent.type(screen.getByLabelText(/email/i), "not-an-email");
    await userEvent.type(screen.getByLabelText(/^password$/i), "password123");
    await userEvent.type(screen.getByLabelText(/confirm password/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(await screen.findByText(/invalid email/i)).toBeInTheDocument();
  });

  it("shows an error for a short password", async () => {
    render(<SignupForm />);
    await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
    await userEvent.type(screen.getByLabelText(/^password$/i), "short");
    await userEvent.type(screen.getByLabelText(/confirm password/i), "short");
    await userEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(await screen.findByText(/at least 8/i)).toBeInTheDocument();
  });

  it("shows an error when passwords do not match", async () => {
    render(<SignupForm />);
    await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
    await userEvent.type(screen.getByLabelText(/^password$/i), "password123");
    await userEvent.type(screen.getByLabelText(/confirm password/i), "different99");
    await userEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(await screen.findByText(/do not match/i)).toBeInTheDocument();
  });

  it("shows a success message on valid submit", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 201,
      json: async () => ({ message: "Signup successful" }),
    } as Response);

    render(<SignupForm />);
    await userEvent.type(screen.getByLabelText(/email/i), "user@example.com");
    await userEvent.type(screen.getByLabelText(/^password$/i), "password123");
    await userEvent.type(screen.getByLabelText(/confirm password/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(await screen.findByText(/signup successful/i)).toBeInTheDocument();
  });

  it("shows a duplicate-email error from the API", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 409,
      json: async () => ({ error: "That email is already registered" }),
    } as Response);

    render(<SignupForm />);
    await userEvent.type(screen.getByLabelText(/email/i), "dupe@example.com");
    await userEvent.type(screen.getByLabelText(/^password$/i), "password123");
    await userEvent.type(screen.getByLabelText(/confirm password/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(await screen.findByText(/already registered/i)).toBeInTheDocument();
  });
});
