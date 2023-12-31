import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useEffect, useState } from "react";

const RecentBlogs = () => {

  const [allBlog, setAllBlog] = useState([]);


  useEffect(() => {
        const fetchData = async () => {
          const response = await fetch("https://tech-corner-project.vercel.app/allBlog");
          const result = await response.json();
          setAllBlog(result);
        };
        fetchData();
      }, []);
 
  const slicedBlog = allBlog.sort((a, b) => b.submitTime - a.submitTime).slice(0, 6);

  // console.log(slicedBlog);
  
  return (
    <div className="px-6 lg:px-24 min-h-screen mt-16">
      <div className="p-5 text-center pb-24">
        <p className="text-4xl font-bold text-blue-600">Recent Blogs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20 ">
          {slicedBlog.map((blog, index) => (
            <div key={index + 1} className="mb-10 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <PhotoProvider>
                <PhotoView src={blog.image}>
                  <img
                    src={blog.image}
                    alt="blog"
                    className="w-full h-[250px] bg-cover"
                  />
                </PhotoView>
              </PhotoProvider>
              <div className="h-[250px] flex flex-col justify-between p-5">
                <div>
                  <h2 className="card-title my-2 text-black">
                    {blog.blogTitle}
                  </h2>
                  <p className="text-gray-400 text-sm">Category: {blog.type}</p> 
                  
                  <p className="text-gray-500 pt-2 text-justify break-words ...">
                    {blog.shortDescription}
                  </p>
                </div>

                <div className="flex gap-5 justify-between">
                  <Link to={`/blogDetails/${blog._id}`} className="">
                    <p className="font-bold text-sm text-blue-500 hover:underline hover:decoration-solid hover:cursor-pointer">
                      View Details
                    </p>
                  </Link>
                  <p className="text-gray-400 text-sm">{blog.blogPostDateTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
};

export default RecentBlogs;

RecentBlogs.propTypes = {
  allBlog: PropTypes.array,
};
