import axios from "axios";
import { useEffect, useState } from "react"
export const useBlog = () => {
    const [loading, setLoading] = useState(true);
    const [allBlog, setAllBlog] = useState([]);
    useEffect(() => {
        setLoading(true)
        console.log(import.meta.env.BACKEND_URL);
        axios.get(`${import.meta.env.BACKEND_URL}/api/v1/blog/all-bulk`)
            .then((res) => setAllBlog(res.data))
            .catch((e) => console.log(e))
        setLoading(false);
    },[])

    return { loading, allBlog };
}