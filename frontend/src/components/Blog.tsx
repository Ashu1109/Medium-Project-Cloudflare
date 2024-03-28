import { useBlog } from "@/hooks";
import img from "/images.png";
import Card from "./Card";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading";
const Blog = () => {
  const { loading, allBlog } = useBlog();
  const navigator = useNavigate();
  if (loading) {
    return <Loading/>
  }
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigator("/signin");
  };
  return (
    <div>
      <div className="absolute top-9 left-9  font-semibold text-xl flex justify-center items-center gap-2">
        <img src={img} alt="img" className="w-8 h-8" />
        <div>Medium</div>
      </div>
      <div className="absolute top-10  right-8   font-semibold text-xl flex justify-center items-center gap-2">
        <Button
          onClick={handleSignOut}
          className=" font-bold "
          variant={"outline"}
        >
          SignOut
        </Button>
      </div>
      <Link to={"/createblog"}>
        <div className="absolute top-10 right-36 font-semibold text-xl flex justify-center items-center gap-2">
          <Button className=" font-bold " variant={"outline"}>
            New
          </Button>
        </div>
      </Link>
      <div className=" p-24">
        {allBlog.map((data, i) => (
          <Card data={data} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Blog;
