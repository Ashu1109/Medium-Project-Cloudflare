import { blogZod } from "@aayushkumar11092002/medium-common";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import img from "/images.png";
import Loading from "./Loading";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
const CreateNewBlog = () => {
  const form = useForm<z.infer<typeof blogZod>>({
    resolver: zodResolver(blogZod),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const navigator=useNavigate();
  const [loading,setLoading] = useState(false);
  if(loading){
    return(<Loading/>)
  }
  async function onSubmit(values: z.infer<typeof blogZod>) {
    if(values.content==="" || values.title===""){
      return ;
    }
    try {
      setLoading(true)
      const token = localStorage.getItem("token")
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog`,values,{headers:{"Authorization":token}})
      setLoading(false)
      if(res.status==200){
        navigator("/blog");
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=" flex flex-col p-28">
      <Link to={"/blog"}>
        <div className="absolute top-9 left-9  font-semibold text-xl flex justify-center items-center gap-2">
          <img src={img} alt="img" className="w-8 h-8" />
          <div>Medium</div>
        </div>
      </Link>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
      <Button
        className=" absolute top-8 right-8"
        variant={"outline"}
        type="submit"
      >
        Publish
      </Button>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className=" flex gap-1 justify-center items-center">
                    {/* <Button
                      className=" rounded-full text-2xl border-0"
                      variant={"outline"}
                      type="submit"
                    >
                      +
                    </Button> */}
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
                      className="pl-7 border-0 text-2xl w-full h-[80vh] placeholder:text-gray-500 placeholder:tracking-wide placeholder:font-serif"
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
