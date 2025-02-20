import { useGetAdminStatsQuery } from "../../redux/admin/adminApi";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement, // Add this import
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
} from "chart.js";
export interface BlogCategory {
  category: string;
  count: number;
}

export interface MonthlyData {
  month: number;
  count: number;
}

export interface TopBlog {
  _id: string;
  title: string;
  likes?: number;
  comments?: number;
}

export interface TopAuthor {
  name: string;
  count: number;
}

export interface AdminStatsResponse {
  stats: {
    blogs: number;
    users: number;
    comments: number;
    likes: number;
  };
  blogCategories: BlogCategory[];
  blogsPerMonth: MonthlyData[];
  usersPerMonth: MonthlyData[];
  topLikedBlogs: TopBlog[];
  topCommentedBlogs: TopBlog[];
  topAuthors: TopAuthor[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement, // Register the LineElement here
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement
);

const AdminStats = () => {
  const { data, error, isLoading } = useGetAdminStatsQuery(0);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">Error fetching data</div>;

  // Prepare the data for charts
  // const blogCategoryData = {
  //   labels: data?.blogCategories.map((cat: BlogCategory) => cat.category),
  //   datasets: [
  //     {
  //       label: "Blog Categories Distribution",
  //       data: data?.blogCategories.map((cat: MonthlyData) => cat.count),
  //       backgroundColor: "rgba(75, 192, 192, 0.2)",
  //       borderColor: "rgba(75, 192, 192, 1)",
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  const blogsPerMonthData = {
    labels: data?.blogsPerMonth.map(
      (item: MonthlyData) => `Month ${item.month}`
    ),
    datasets: [
      {
        label: "Blogs Published Per Month",
        data: data?.blogsPerMonth.map((item: MonthlyData) => item.count),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const usersPerMonthData = {
    labels: data?.usersPerMonth.map(
      (item: MonthlyData) => `Month ${item.month}`
    ),
    datasets: [
      {
        label: "Users Registered Per Month",
        data: data?.usersPerMonth.map((item: MonthlyData) => item.count),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Admin Statistics</h2>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-medium">Blogs</h3>
          <p className="text-2xl">{data?.stats.blogs}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-medium">Users</h3>
          <p className="text-2xl">{data?.stats.users}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-medium">Comments</h3>
          <p className="text-2xl">{data?.stats.comments}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-medium">Likes</h3>
          <p className="text-2xl">{data?.stats.likes}</p>
        </div>
      </div>

      {/* <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-medium mb-4">
          Blog Categories Distribution
        </h3>
        <Pie data={blogCategoryData} />
      </div> */}

      {/* Blogs Published per Month Line Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-medium mb-4">Blogs Published per Month</h3>
        <Line data={blogsPerMonthData} />
      </div>

      {/* Users Registered per Month Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-medium mb-4">Users Registered per Month</h3>
        <Bar data={usersPerMonthData} />
      </div>

      {/* Display Top Liked Blogs */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-medium mb-4">Top Liked Blogs</h3>
        <ul>
          {data?.topLikedBlogs.map((blog: TopBlog) => (
            <li key={blog._id} className="mb-2">
              <span className="font-medium">{blog.title}</span> - {blog.likes}{" "}
              Likes
            </li>
          ))}
        </ul>
      </div>

      {/* Display Top Commented Blogs */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-medium mb-4">Top Commented Blogs</h3>
        <ul>
          {data?.topCommentedBlogs.map((blog: TopBlog) => (
            <li key={blog._id} className="mb-2">
              <span className="font-medium">{blog.title}</span> -{" "}
              {blog.comments} Comments
            </li>
          ))}
        </ul>
      </div>

      {/* Display Top Authors */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-medium mb-4">
          Top Authors by Number of Blogs
        </h3>
        <ul>
          {data?.topAuthors.map((author: TopAuthor) => (
            <li key={author.name} className="mb-2">
              <span className="font-medium">{author.name}</span> -{" "}
              {author.count} Blogs
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminStats;

// // components/AdminStats.tsx
// import { useGetAdminStatsQuery } from "../../redux/admin/adminApi";
// import { Bar, Line, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";
// // import { AdminStatsResponse } from "../types";
// export interface BlogCategory {
//   category: string;
//   count: number;
// }

// export interface MonthlyData {
//   month: number;
//   count: number;
// }

// export interface TopBlog {
//   _id: string;
//   title: string;
//   likes?: number;
//   comments?: number;
// }

// export interface TopAuthor {
//   name: string;
//   count: number;
// }

// export interface AdminStatsResponse {
//   stats: {
//     blogs: number;
//     users: number;
//     comments: number;
//     likes: number;
//   };
//   blogCategories: BlogCategory[];
//   blogsPerMonth: MonthlyData[];
//   usersPerMonth: MonthlyData[];
//   topLikedBlogs: TopBlog[];
//   topCommentedBlogs: TopBlog[];
//   topAuthors: TopAuthor[];
// }

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// const AdminStats = () => {
//   const { data, error, isLoading } = useGetAdminStatsQuery(0);

//   if (isLoading) return <div className="text-center">Loading...</div>;
//   if (error)
//     return <div className="text-center text-red-500">Error fetching data</div>;

//   // Prepare the data for charts
//   const blogCategoryData = {
//     labels: data?.blogCategories.map((cat: BlogCategory) => cat.category),
//     datasets: [
//       {
//         label: "Blog Categories Distribution",
//         data: data?.blogCategories.map((cat: MonthlyData) => cat.count),
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const blogsPerMonthData = {
//     labels: data?.blogsPerMonth.map(
//       (item: MonthlyData) => `Month ${item.month}`
//     ),
//     datasets: [
//       {
//         label: "Blogs Published Per Month",
//         data: data?.blogsPerMonth.map((item: MonthlyData) => item.count),
//         backgroundColor: "rgba(54, 162, 235, 0.2)",
//         borderColor: "rgba(54, 162, 235, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const usersPerMonthData = {
//     labels: data?.usersPerMonth.map(
//       (item: MonthlyData) => `Month ${item.month}`
//     ),
//     datasets: [
//       {
//         label: "Users Registered Per Month",
//         data: data?.usersPerMonth.map((item: MonthlyData) => item.count),
//         backgroundColor: "rgba(153, 102, 255, 0.2)",
//         borderColor: "rgba(153, 102, 255, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <h2 className="text-2xl font-semibold">Admin Statistics</h2>

//       {/* Stats overview */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <div className="bg-white p-4 rounded-lg shadow-md text-center">
//           <h3 className="text-xl font-medium">Blogs</h3>
//           <p className="text-2xl">{data?.stats.blogs}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-md text-center">
//           <h3 className="text-xl font-medium">Users</h3>
//           <p className="text-2xl">{data?.stats.users}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-md text-center">
//           <h3 className="text-xl font-medium">Comments</h3>
//           <p className="text-2xl">{data?.stats.comments}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-md text-center">
//           <h3 className="text-xl font-medium">Likes</h3>
//           <p className="text-2xl">{data?.stats.likes}</p>
//         </div>
//       </div>

//       {/* Blog Categories Pie Chart */}
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-xl font-medium mb-4">
//           Blog Categories Distribution
//         </h3>
//         <Pie data={blogCategoryData} />
//       </div>

//       {/* Blogs Published per Month Line Chart */}
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-xl font-medium mb-4">Blogs Published per Month</h3>
//         <Line data={blogsPerMonthData} />
//       </div>

//       {/* Users Registered per Month Bar Chart */}
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-xl font-medium mb-4">Users Registered per Month</h3>
//         <Bar data={usersPerMonthData} />
//       </div>

//       {/* Display Top Liked Blogs */}
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-xl font-medium mb-4">Top Liked Blogs</h3>
//         <ul>
//           {data?.topLikedBlogs.map((blog: TopBlog) => (
//             <li key={blog._id} className="mb-2">
//               <span className="font-medium">{blog.title}</span> - {blog.likes}{" "}
//               Likes
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Display Top Commented Blogs */}
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-xl font-medium mb-4">Top Commented Blogs</h3>
//         <ul>
//           {data?.topCommentedBlogs.map((blog: TopBlog) => (
//             <li key={blog._id} className="mb-2">
//               <span className="font-medium">{blog.title}</span> -{" "}
//               {blog.comments} Comments
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Display Top Authors */}
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-xl font-medium mb-4">
//           Top Authors by Number of Blogs
//         </h3>
//         <ul>
//           {data?.topAuthors.map((author: TopAuthor) => (
//             <li key={author.name} className="mb-2">
//               <span className="font-medium">{author.name}</span> -{" "}
//               {author.count} Blogs
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AdminStats;
