import React, { useState, useEffect } from "react";
import { fetchCourses } from "../apiCalls/courses";
import { toast } from "react-hot-toast";
import CourseCard from "./CourseCard";
import Course from "./Course";
import AddCourse from "./AddCourse";
import { FiLogOut } from "react-icons/fi";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [addCourse, setAddCourse] = useState(false);
  const navigate = useNavigate();
  // const [editCourse, setEditCourse] = useState(null);

  const getCourses = async () => {
    try {
      const response = await fetchCourses();
      if (response.success) {
        setCourses(response.data);
      } else toast.error(response.message);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div>
      <div className="h-20 bg-gray-300 flex justify-between items-center p-5">
        <h1 className="text-3xl font-semibold"> Attendance Tracker</h1>
        <h1
          className="text-xl bg-white flex gap-3 items-center p-3 rounded-lg cursor-pointer"
          onClick={() => {
            cookie.remove("token");
            navigate("/login");
          }}>
          Logout
          <FiLogOut />
        </h1>
      </div>
      <div className="p-8 sm:p-16">
        {selectedCourse ? (
          <Course
            course={selectedCourse}
            setSelectedCourse={setSelectedCourse}
            setCourses={setCourses}
          />
        ) : addCourse ? (
          <AddCourse setAddCourse={setAddCourse} setCourses={setCourses} />
        ) : (
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-4xl mb-10">Courses</h1>
              <button
                className="text-xl bg-green-400 p-3 rounded-xl"
                onClick={() => setAddCourse(true)}>
                Add Course
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
              {courses.length > 0 &&
                courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    setSelectedCourse={setSelectedCourse}
                    setCourses={setCourses}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
