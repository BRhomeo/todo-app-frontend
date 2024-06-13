import { createAppSlice } from "@/lib/createAppSlice";
import {
  postTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
  updateTaskRequest,
} from "./todoTasksAPI";

const initialState: {
  tasks: TodoTask[];
  isLoading: boolean;
} = {
  tasks: [],
  isLoading: false,
};

// If you are not using async thunks you can use the standalone `createSlice`.
export const todoTaskSlice = createAppSlice({
  name: "todoTask",
  // `createSlice` will infer the state type from the `initialState` argument

  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: (create) => ({
    createTask: create.asyncThunk(
      async (task: CreateTodoTask) => {
        const response = await postTaskRequest(task);
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          // add into first position
          state.tasks.unshift(action.payload);
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      }
    ),
    getTasks: create.asyncThunk(
      async () => {
        const response = await getTasksRequest();
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.tasks = action.payload;
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      }
    ),
    deleteTask: create.asyncThunk(
      async (id: string) => {
        const response = await deleteTaskRequest(id);
        return response;
      },
      {
        pending: (state) => {
          state.isLoading = true;
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.tasks = state.tasks.filter(
            (task) => task.id !== action.payload.id
          );
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      }
    ),
    updateTask: create.asyncThunk(
      async (task: TodoTask) => {
        const response = await updateTaskRequest(task);
        return response;
      },
      {
        // to update the list while waiting for the response
        pending: (state, action) => {
          state.isLoading = true;
          state.tasks = state.tasks.map((t) =>
            t.id === action.meta.arg.id ? action.meta.arg : t
          );
        },
        fulfilled: (state, action) => {
          state.isLoading = false;
          state.tasks = state.tasks.map((t) =>
            t.id === action.payload.id ? action.payload : t
          );
        },
        rejected: (state) => {
          state.isLoading = false;
        },
      }
    ),
  }),
  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectTasks: (todoTask) => todoTask.tasks,
    selectIsLoading: (todoTask) => todoTask.isLoading,
  },
});

// Action creators are generated for each case reducer function.
export const { createTask, getTasks, deleteTask, updateTask } =
  todoTaskSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const { selectTasks, selectIsLoading } = todoTaskSlice.selectors;
