// A mock function to mimic making an async request for data
import apiEndpoints from "@/lib/apiEndpoints";
import { getLocalUser, removeLocalUser } from "@/lib/utils";

// TODO: it's better to add axios for better error handling
export const postTaskRequest = async (task: CreateTodoTask) => {
  const response = await fetch(apiEndpoints.todos.create, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `${getLocalUser().tokenObj?.token}`,
    },
    body: JSON.stringify(task),
  });
  if (response.status === 401) {
    on401();
  }
  const result: TodoTask = await response.json();

  return result;
};

export const getTasksRequest = async () => {
  const response = await fetch(apiEndpoints.todos.get, {
    headers: {
      authorization: `${getLocalUser().tokenObj?.token}`,
    },
  });
  if (response.status === 401) {
    on401();
  }
  const result: TodoTask[] = await response.json();

  return result;
};

export const deleteTaskRequest = async (id: string) => {
  const response = await fetch(apiEndpoints.todos.delete(id), {
    method: "DELETE",
    headers: {
      authorization: `${getLocalUser().tokenObj?.token}`,
    },
  });
  if (response.status === 401) {
    on401();
  }
  const result: TodoTask = await response.json();

  return result;
};

export const updateTaskRequest = async (task: TodoTask) => {
  const response = await fetch(apiEndpoints.todos.update(task.id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `${getLocalUser().tokenObj?.token}`,
    },
    body: JSON.stringify(task),
  });
  if (response.status === 401) {
    on401();
  }
  const result: TodoTask = await response.json();

  return result;
};

const on401 = async () => {
  removeLocalUser();
  window.location.href = "/";
};
