import React from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { deleteCourse } from "../apiCalls/courses";
import { toast } from "react-hot-toast";

const CourseCard = ({ course, setSelectedCourse, setCourses }) => {
  const handleDelete = async () => {
    try {
      const response = await deleteCourse(course._id);
      if (response.success) {
        toast.success(response.message);
        setCourses((prev) => prev.filter((item) => item._id !== course._id));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <>
      {course && (
        <div className="border border-gray-600 sm:h-56 md:h-52 rounded-xl cursor-pointer">
          <div onClick={() => setSelectedCourse(course)}>
            <div className="bg-blue-400 h-24 rounded-tr-xl rounded-tl-xl p-4 overflow-auto">
              <h1 className="text-2xl font-bold text-white">{course.name}</h1>
            </div>
            <div className="p-4">
              <h1 className="text-xl">Total Classes: {course.totalClasses}</h1>
              {/* <h1 className="text-xl">Intructor Name: {course.instructor.name}</h1> */}
            </div>
          </div>
          <div className="border border-t-2 border-b-0 flex p-3 justify-end rounded-br-xl rounded-bl-xl">
            <RiDeleteBinLine className="text-2xl" onClick={handleDelete} />
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCard;
