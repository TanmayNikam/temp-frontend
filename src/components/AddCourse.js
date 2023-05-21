import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { addCourse } from "../apiCalls/courses";
import { toast } from "react-hot-toast";

const AddCourse = ({ course = null, setAddCourse = null, setCourses }) => {
  const [courseName, setCourseName] = useState(course ? course.name : "");

  const handleAdd = async () => {
    if (courseName === "") {
      toast.error("Course Name cannot be empty");
      return;
    }
    try {
      const response = await addCourse(courseName);
      if (response.success) {
        toast.success("Course Added Successfully");
        setCourses((prev) => [...prev, response.course]);
        setAddCourse(false);
      } else toast.error(response.message);
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <div>
      <BiArrowBack
        className="text-3xl mb-6 cursor-pointer"
        onClick={() => {
          if (setAddCourse) setAddCourse(false);
        }}
      />
      <h1 className="text-3xl font-semibold mb-10">
        {course ? "Edit Course" : "Add Course"}
      </h1>
      <div className="md:w-96">
        <div className="flex flex-col">
          <label className="mb-2 text-xl">Course Name</label>
          <input
            className="rounded-xl p-2 md:w-96 border border-black"
            placeholder="Enter Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
        <div className="text-right">
          <button
            className="p-2 rounded-xl mt-5 bg-green-500 border border-black w-1/5"
            onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
