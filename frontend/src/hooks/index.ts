import axios from "axios";
import { useEffect, useState } from "react"
export const useBlog = () => {
    const [loading, setLoading] = useState(true);
    const [allBlog, setAllBlog] = useState([]);
    useEffect(() => {
        setLoading(true)
        const token = localStorage.getItem("token")
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/all-bulk`,{headers:{"Authorization":token}})
            .then((res) => {setAllBlog(res.data); setLoading(false)})
            .catch((e) => console.log(e))
    },[])

    return { loading, allBlog };
}