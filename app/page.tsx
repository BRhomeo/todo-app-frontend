"use client";

import type { Metadata } from "next";
import { SignIn } from "./components/auth/SignIn";
import { selectToken, selectUser } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { TodoList } from "./components/todo/TodoList";

export default function IndexPage() {
  const user = useAppSelector(selectUser);

  return user && user.id ? <TodoList /> : <SignIn />;
}
