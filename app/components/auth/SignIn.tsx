"use client";
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
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Loading from "../ui/loading";

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
export const SignIn = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  const handleSubmit = async (values: z.infer<typeof FormSchema>) => {
    console.log(values);
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4 w-1/6"
        >
          <FormField
            disabled={isLoading}
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            disabled={isLoading}
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loading /> : "Login"}
            </Button>
          </div>
          {/* for signing up */}
          <div className="flex justify-center">
            <a href="/signup" className="text-primary">
              Sign up
            </a>
          </div>
        </form>
      </Form>
    </>
  );
};
