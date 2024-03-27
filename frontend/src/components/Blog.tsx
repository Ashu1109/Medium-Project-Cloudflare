import img from "../../public/images.png";
import Card from "./Card";
const Blog = () => {
  return (
    <div>
      <div className="absolute top-9 left-9  font-semibold text-xl flex justify-center items-center gap-2">
        <img src={img} alt="img" className="w-8 h-8" />
        <div>Medium</div>
      </div>
      <div className=" p-24">
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <Card />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
