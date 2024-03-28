import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
interface Blog {
    content:string,
    title:string,
    id:string,
    createdAt:Date
    author:{
        email:string
    }
}


export const useBlog = () => {
    const [loading, setLoading] = useState(true);
    const [allBlog, setAllBlog] = useState<Blog[]>([]);
    useEffect(() => {
        const token = localStorage.getItem("token")
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/all-bulk`,{headers:{"Authorization":token}})
            .then((res) => {setAllBlog(res.data.data); setLoading(false)})
            .catch((e) => console.log(e))
    },[])

    return { loading, allBlog };
}

export const useBlogById = (id:string | undefined)=>{

    const [loading,setLoading] = useState(true)
    const navigator = useNavigate();
    const [blog,setBlog] = useState<Blog>({content:"",title:"",id:"",author:{email:""},createdAt:new Date()})
    if(!id){
        navigator("/blog")
    }
    useEffect(()=>{
        const token = localStorage.getItem("token")
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/blog/${id}`,{headers:{"Authorization":token}})
        .then((res)=>{setBlog(res.data.data);setLoading(false)})
        .catch(e=>console.log(e))
    },[id])
    return {loading,blog}
}