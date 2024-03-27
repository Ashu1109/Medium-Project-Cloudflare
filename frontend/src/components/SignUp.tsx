"use client";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpZod } from "@aayushkumar11092002/medium-common";
import * as z from "zod";
import img from "../../public/images.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../components/ui/form";
import axios from "axios";
import { Input } from "../components/ui/input";
const SignUp = () => {
  const navigator = useNavigate();
  const form = useForm<z.infer<typeof signUpZod>>({
    resolver: zodResolver(signUpZod),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpZod>) {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signup`,values)
      const jwt = await res.data.token
      if(jwt==undefined){
        return;
      }
      localStorage.setItem("token",`Bearer ${jwt}`)
      navigator("/blog");
    } catch (error) {
      console.log(error)
    }
    console.log(values);
  }
  return (
    <div className="w-[100vw] h-[100vh] flex justify-between items-center mx-10">
      <div className="absolute top-9 left-9  font-semibold text-xl flex justify-center items-center gap-2">
        <img src={img} alt="img" className="w-8 h-8" />
        <div>Medium</div>
      </div>
      <div className=" md:w-[50%] w-full h-full flex justify-center items-center flex-col">
        <h1 className=" text-2xl font-bold  tracking-wide">
          Create an account
        </h1>
        <h3>
          Already have an account?{" "}
          <Link to={"/signin"}>
            <Button variant={"link"} className="p-0">
              SignIn
            </Button>
          </Link>
        </h3>
        <div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-7 w-[30vw]"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="M@gmail.com" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Enter your password" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" variant={"outline"}>
                  Sign Up
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className=" hidden w-[50%] h-full md:flex justify-center  flex-col p-10 mr-5 bg-gray-300">
        <h1 className=" text-3xl font-semibold">
          "The customer service I received was exceptional. The support team
          went above and beyond to address my concerns"
        </h1>
        <h2 className=" text-xl font-medium pt-5">Aayush Kumar</h2>
        <h3 className=" text-sm">Student,NITJSR</h3>
      </div>
    </div>
  );
};

export default SignUp;
