declare interface SignUp {
  email: string;
  password: string;
  name: string;
}

declare interface SignIn {
  email: string;
  password: string;
}

declare interface User {
  email: string;
  name: string;
  id: string;
}
declare interface CreateTodoTask {
  title: string;
  description: string;
}
declare interface TodoTask extends CreateTodoTask {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed";
  userId: string;
  createdAt: string;
  updatedAt: string;
}
