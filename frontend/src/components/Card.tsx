import React from "react";
import img from "../../public/images.png";
const Card = () => {
  const data = {
    author: "Peter V.",
    date: "Dec 3,2023",
    title:
      "How an Ugly Single-Page Website Makes $5,000 a Month with Affiliate Marketing",
    content:
      "No need to create a fancy and modern website with hundreds of pages to make money online. Making money online is the dream for man.Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, repellat temporibus aliquid modi magnam fuga, similique adipisci delectus, ducimus dolores natus. Quidem, aliquid est earum cum quaerat soluta inventore accusantium.",
  };
  const words = data.content.split(" ");
  const content = words.slice(0, 40).join(" ");
  return (
    <div>
      <div className=" flex gap-1 p-6">
        <div className="flex justify-center items-center gap-2 ">
          <img src={img} className="w-5 h-5" />
          <div>{data.author}</div>
          <div className=" text-md text-slate-500">{data.date}</div>
        </div>
      </div>
      <div className="">
        <div className=" text-3xl font-extrabold">{data.title}</div>
        <div className=" text-xl font-light p-3">{content}...</div>
      </div>
      <div className=" border-b-[2px] "></div>
    </div>
  );
};

export default Card;
