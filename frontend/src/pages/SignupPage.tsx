import React from "react";
import { SignupForm } from "../components/SignupForm";

export function SignupPage() {
  return (
    <main className="page">
      <h1 className="page-title">Create an account</h1>
      <div className="card">
        <SignupForm />
      </div>
    </main>
  );
}
