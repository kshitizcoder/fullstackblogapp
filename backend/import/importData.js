// import mongoose from "mongoose";
// import fs from "fs";
// import blog from "../model/Blog.js";

// // Connect to MongoDB
// mongoose
//   .connect(
//     "mongodb+srv://kshitiz:12345@cluster0.qsfhb.mongodb.net/blogsweb",
//     {}
//   )
//   .then(() => console.log("DB connection successful!"))
//   .catch((err) => console.error("DB connection error:", err));

// // READ JSON FILE
// const res = JSON.parse(
//   fs.readFileSync(new URL("./data.json", import.meta.url), "utf-8")
// );
// console.log(res); // Add this to check the contents of the file

// const importData = async () => {
//   try {
//     await blog.create(res);
//     console.log("Data successfully loaded!");
//   } catch (err) {
//     console.error("Error importing data:", err);
//   }
//   process.exit();
// };

// // DELETE ALL DATA FROM DB
// const deleteData = async () => {
//   try {
//     await blog.deleteMany();
//     console.log("Data successfully deleted!");
//   } catch (err) {
//     console.error("Error deleting data:", err);
//   }
//   process.exit();
// };

// // Process command-line arguments
// const args = process.argv[2];
// if (args === "--import") {
//   importData();
// } else if (args === "--delete") {
//   deleteData();
// }

// import mongoose from "mongoose";
// import fs from "fs";
// import blog from "../model/Blog.js";

// // Connect to MongoDB
// mongoose
//   .connect(
//     " mongodb+srv://kshitiz:12345@cluster0.qsfhb.mongodb.net/blogsweb",
//     {}
//   )
//   .then(() => console.log("DB connection successful!"))
//   .catch((err) => console.error("DB connection error:", err));

// // READ JSON FILE
// const res = JSON.parse(
//   fs.readFileSync(new URL("./data.json", import.meta.url), "utf-8")
// );

// const importData = async () => {
//   try {
//     await blog.create(res);
//     console.log("Data successfully loaded!");
//   } catch (err) {
//     console.error("Error importing data:", err);
//   }
//   process.exit();
// };

// // DELETE ALL DATA FROM DB
// const deleteData = async () => {
//   try {
//     await blo.deleteMany();
//     console.log("Data successfully deleted!");
//   } catch (err) {
//     console.error("Error deleting data:", err);
//   }
//   process.exit();
// };

// // Process command-line arguments
// const args = process.argv[2];
// if (args === "--import") {
//   importData();
// } else if (args === "--delete") {
//   deleteData();
// }

// Convert `$oid` values to `ObjectId`
// const transformedData = res.map((item) => {
//   // Convert _id
//   if (item._id && item._id.$oid) {
//     item._id = new mongoose.Types.ObjectId(item._id.$oid);
//   }
//   // Convert `user` field if it exists and has `$oid`
//   if (item.user && item.user.$oid) {
//     item.user = new mongoose.Types.ObjectId(item.user.$oid);
//   }
//   return item;
// });

// IMPORT DATA INTO DB

// import fs from "fs";
// import mongoose from "mongoose";

// import User from "../model/User.js";

// mongoose
//   .connect("mongodb+srv://kshitiz:12345@cluster0.ccv28.mongodb.net/", {
//     // useNewUrlParser: true,
//     // useCreateIndex: true,
//     // useFindAndModify: false,
//   })
//   .then(() => console.log("DB connection successful!"));

// const res = fs.readFileSync(new URL("./data.json", import.meta.url), "utf-8");

// const importData = async () => {
//   try {
//     await blog.create(res);
//     console.log("Data successfully loaded!");
//   } catch (err) {
//     console.error(err);
//   }
//   process.exit();
// };

// // DELETE ALL DATA FROM DB
// const deleteData = async () => {
//   try {
//     await blog.deleteMany();
//     console.log("Data successfully deleted!");
//   } catch (err) {
//     console.error(err);
//   }
//   process.exit();
// };

// const args = process.argv[2];
// if (args === "--import") {
//   importData();
// } else if (args === "--delete") {
//   deleteData();
// }

import fs from "fs";
import mongoose from "mongoose";
import Blog from "../model/Blog.js"; // Make sure this import is correct

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://kshitiz:12345@cluster0.qsfhb.mongodb.net/blogsweb", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => console.error("DB connection error:", err));

// READ and PARSE JSON FILE
const res = JSON.parse(
  fs.readFileSync(new URL("./data.json", import.meta.url), "utf-8")
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Blog.create(res); // Assuming 'blog' is the correct Mongoose model
    console.log("Data successfully loaded!");
  } catch (err) {
    console.error("Error importing data:", err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Blog.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.error("Error deleting data:", err);
  }
  process.exit();
};

// Process command-line arguments
const args = process.argv[2];
if (args === "--import") {
  importData();
} else if (args === "--delete") {
  deleteData();
}
