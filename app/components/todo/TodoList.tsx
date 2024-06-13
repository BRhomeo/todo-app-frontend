import { Button } from "../ui/button";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "../ui/command";
import { AddNewTask } from "./_components/AddNewTask";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  selectTasks,
  getTasks,
  updateTask,
} from "@/lib/features/todo-tasks/todoTasksSlice";
import { useEffect } from "react";

export const TodoList = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const tasks = useAppSelector(selectTasks);

  const updateTaskStatus = (task: TodoTask) => {
    dispatch(
      updateTask({
        ...task,
        status: task.status === "active" ? "completed" : "active",
      })
    );
  };
  return (
    <AlertDialog>
      <Command className="rounded-lg bg-transparent">
        <div className="flex flex-row items-center justify-between p-4 lg:mr-16 lg:ml-8">
          <CommandInput placeholder="Search for Task..." />
          <AlertDialogTrigger asChild>
            <Button>Add Task</Button>
          </AlertDialogTrigger>
          <AddNewTask />
        </div>
        <CommandList className="py-4 lg:mx-auto min-w-1/4 max-h-[unset]">
          <CommandEmpty className="w-full flex flex-col items-center justify-center mt-10">
            <h2 className="text-primary font-semibold text-4xl">
              No Tasks Found
            </h2>
            <p className="text-primary text-sm mt-3">
              Click on the Add Task button to add a new task
            </p>
          </CommandEmpty>
          <CommandGroup heading={tasks.length > 0 ? "Tasks List" : ""}>
            {tasks.map((task) => (
              <CommandItem
                key={task.id}
                onSelect={() => updateTaskStatus(task)}
                className={
                  "max-h-24 min-h-16 !bg-background my-2 text-primary border-[1px] border-border p-4 rounded-lg cursor-pointer transition-all" +
                  (task.status === "completed"
                    ? " !bg-green-300 dark:!bg-green-600"
                    : "")
                }
              >
                <div className="flex flex-row justify-start h-full w-full">
                  <div className="flex flex-col justify-start">
                    <h2
                      className={
                        "text-lg font-semibold " +
                        (task.status === "completed" ? "line-through" : "")
                      }
                    >
                      {task.title}
                    </h2>
                    <p
                      className={
                        "text-sm" +
                        (task.status === "completed" ? "line-through" : "")
                      }
                    >
                      {task.description}
                    </p>
                  </div>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </AlertDialog>
  );
};
