import { useParams } from "react-router-dom";
import img from "../../public/images.png";

const BlogPage = () => {
  const { id } = useParams();
  console.log(id);
  const data = {
    title: "Taxing Laughter: The Joke Tax Chronicles",
    content: `Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money.
Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's
pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester.
And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop.`,
    date: "August 24, 2023",
    Author: "Jokester",
  };
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="absolute top-9 left-9  font-semibold text-xl flex justify-center items-center gap-2">
        <img src={img} alt="img" className="w-8 h-8" />
        <div>Medium</div>
      </div>
      <div className="w-[60%] h-full  flex  flex-col p-32">
        <h1 className=" text-4xl font-extrabold tracking-wide">{data.title}</h1>
        <h5 className="py-3 text-slate-600 text-sm">Posted on {data.date}</h5>
        <p className=" text-slate-800">
          {data.content.split(".").map((item) => (
            <div>{item}.</div>
          ))}
        </p>
      </div>
      <div className="w-[40%] h-full bg-slate-300">
        <div className="w-[60%] h-full  flex  flex-col p-32 gap-2">
          <div className=" font-semibold tracking-wider  text-md">Author</div>
          <div className=" flex  items-center gap-2">
            <div className=" bg-slate-50 rounded-full w-5 h-5"></div>
            <div className=" font-semibold text-xl">{data.Author}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
