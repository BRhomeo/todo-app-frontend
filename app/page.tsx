import type { Metadata } from "next";
import { Counter } from "./components/counter/Counter";
import { SignIn } from "./components/auth/SignIn";

export default function IndexPage() {
  return <SignIn />;
  // return <Counter />;
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
