"use server";

import { signIn, signOut } from "./auth";

export async function login() {
  await signIn("google");
  console.log("log in successfull");
}

export async function logout() {
  await signOut();
  console.log("logout successfull");
}
