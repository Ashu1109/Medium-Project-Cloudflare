import { useBlogById } from "@/hooks";
import { Link, useParams } from "react-router-dom";
import img from "/images.png";
import Loading from "./Loading";
import { FormatDate } from "@/lib/DateAndTimeConverter";

const BlogPage = () => {
  const { id } = useParams();
  const {loading,blog} = useBlogById(id);
  const CreatedDate = FormatDate(blog.createdAt)
  if(loading || !blog){
    return <Loading/>
  }
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
     <Link to={"/blog"}>
        <div className="absolute top-9 left-9  font-semibold text-xl flex justify-center items-center gap-2">
          <img src={img} alt="img" className="w-8 h-8" />
          <div>Medium</div>
        </div>
     </Link>
      <div className="w-[60%] h-full  flex  flex-col p-32">
      <h1 className=" text-4xl font-extrabold tracking-wide">{blog.title}</h1>
        <h5 className="py-3 text-slate-600 text-sm">Posted on {CreatedDate.monthName} {CreatedDate.date},{CreatedDate.year}</h5>
        <div className=" text-slate-800">
          {blog.content?.split(".").map((item,i) => (
            <div key={i}>{item}.</div>
          ))}
        </div>
      </div>
      <div className="w-[40%] h-full bg-slate-300">
        <div className="w-[60%] h-full  flex  flex-col p-32 gap-2">
          <div className=" font-semibold tracking-wider  text-md">Author</div>
          <div className=" flex  items-center gap-2">
            <div className=" font-semibold text-xl">{blog.author.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
