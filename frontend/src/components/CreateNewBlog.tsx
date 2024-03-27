import React from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { blogZod } from "@aayushkumar11092002/medium-common";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import img from "../../public/images.png";
const CreateNewBlog = () => {
  const form = useForm<z.infer<typeof blogZod>>({
    resolver: zodResolver(blogZod),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function onSubmit(values: z.infer<typeof blogZod>) {
    console.log(values);
  }
  return (
    <div className=" flex flex-col p-28">
      <div className="absolute top-9 left-9  font-semibold text-xl flex justify-center items-center gap-2">
        <img src={img} alt="img" className="w-8 h-8" />
        <div>Medium</div>
      </div>
      <Button
        className=" absolute top-8 right-8"
        variant={"outline"}
        type="submit"
      >
        Publish
      </Button>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className=" flex gap-1 justify-center items-center">
                    <Button
                      className=" rounded-full text-2xl border-0"
                      variant={"outline"}
                      type="submit"
                    >
                      +
                    </Button>
                    <div className="h-[4vh] w-[.2vw] bg-gray-400"></div>
                    <Input
                      placeholder=" Title"
                      className=" pl-3 border-0 text-4xl placeholder:text-gray-500 placeholder:tracking-wide placeholder:font-serif"
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    <Textarea
                      placeholder="Tell your story"
                      className="pl-7 border-0 text-2xl placeholder:text-gray-500 placeholder:tracking-wide placeholder:font-serif"
                      {...field}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default CreateNewBlog;
