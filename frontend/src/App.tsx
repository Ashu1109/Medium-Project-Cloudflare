import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import BlogPage from "./components/BlogPage";
import CreateNewBlog from "./components/CreateNewBlog";
import Blog from "./components/Blog";
import PrivateRoutes from "./lib/PrivateRoutes";
function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/createblog" element={<CreateNewBlog />} />
          <Route path="/blog" element={<Blog />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
