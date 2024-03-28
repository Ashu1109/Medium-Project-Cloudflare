import { Link } from "react-router-dom";
import img from "/images.png";
import { FormatDate, Time } from "@/lib/DateAndTimeConverter";
interface CardProps {
  data: {
    id:string
    author: { email: string };
    createdAt: Date;
    title: string;
    content: string;
  };
}
const Card = ({ data }: CardProps) => {
  const CreatedDate = FormatDate(data.createdAt);
  const createdAt = new Date(data.createdAt);
  const time = Time(createdAt)
  const words = data.content.split(" ");
  const content = words.slice(0, 40).join(" ");
  return (
    <Link to={data.id}>
      <div className=" flex gap-1 p-6">
        <div className="flex justify-center items-center gap-2 ">
          <img src={img} className="w-5 h-5" />
          <div>{data.author.email}</div>
          <div className=" text-md text-slate-500">{`${CreatedDate.monthName} ${CreatedDate.date},${CreatedDate.year} | ${time}`}</div>
        </div>
      </div>
      <div className="">
        <div className=" text-3xl font-extrabold">{data.title}</div>
        <div className=" text-xl font-light p-3">{content}...</div>
      </div>
      <div className=" border-b-[2px] "></div>
    </Link>
  );
};

export default Card;
