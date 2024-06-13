"use client";

import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "../../ui/alert-dialog";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import Loading from "../../ui/loading";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  createTask,
  selectTasks,
} from "@/lib/features/todo-tasks/todoTasksSlice";
import React, { useEffect } from "react";

const FormSchema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(0).max(50),
});

export const AddNewTask = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);

  // heading button ref
  const headingButtonRef = React.useRef<HTMLButtonElement>(null);
  // when new item is added, pop up the AlertDialogContent
  useEffect(() => {
    console.log("tasks => ", tasks);
    console.log("headingButtonRef => ", headingButtonRef);
    console.log("headingButtonRef.current => ", headingButtonRef.current);
    if (tasks.length > 0 && headingButtonRef.current) {
      console.log("clicking heading button");
      headingButtonRef.current.click();
    }
  }, [tasks]);

  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  return (
    <>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">Add Task</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <Form {...form}>
            {/* onSubmit={form.handleSubmit((values) => dispatch(signup(values)))} */}
            <form
              onSubmit={form.handleSubmit((values) =>
                dispatch(createTask(values))
                  //clear the inputs
                  .then(() => form.reset())
              )}
              className="space-y-4 w-full"
            >
              <FormField
                disabled={isLoading}
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Task Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Task Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? <Loading /> : "Add Task"}
              </Button>
              <AlertDialogAction className="hidden">
                {/* will do heading button here, 
                after the task is added,
                will trigger button and
                the alert dialog will pop up */}
                <button ref={headingButtonRef}>hide the dialog</button>
              </AlertDialogAction>
              <AlertDialogCancel className="mb-2 w-full">
                Cancel
              </AlertDialogCancel>
            </form>
          </Form>
        </AlertDialogDescription>
      </AlertDialogContent>
    </>
  );
};
