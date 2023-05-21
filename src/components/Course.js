import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import PieChart from "./PieChart";

const Course = ({ course, setSelectedCourse }) => {
  const [attendaceRateFilter, setAttendanceRateFilter] = useState(75);
  const allStudents = course?.students;
  const [shortStudents, setShortStudents] = useState([]);

  useEffect(() => {
    setShortStudents(
      course?.students.filter(
        (student) =>
          student.attended / course.totalClasses < attendaceRateFilter * 0.01
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendaceRateFilter]);

  return (
    <div>
      <BiArrowBack
        className="text-3xl mb-6 cursor-pointer"
        onClick={() => setSelectedCourse(null)}
      />
      <div className="flex justify-between mb-10 sm:mb-7">
        <h1 className="text-4xl font-semibold ">{course.name}</h1>
        <button className=" p-2 border border-blue-900 rounded-xl text-white font-semibold bg-blue-500">
          Add Attendance
        </button>
      </div>
      {course.totalClasses === 0 ? (
        <div className="flex items-center justify-center h-96">
          <h1 className="text-5xl text-gray-500">No classes occured</h1>
        </div>
      ) : (
        <>
          <h1 className="text-2xl mb-10 sm:mb-7">
            Total Classes: {course.totalClasses}
          </h1>
          <div className="flex justify-end gap-3 items-center mb-10">
            <h1 className="text-xl">Attendance Percentage</h1>
            <select
              className="text-xl px-3 py-2 border border-black rounded-lg"
              value={attendaceRateFilter}
              onChange={(e) => setAttendanceRateFilter(e.target.value)}>
              {Array.from({ length: 6 }, (v, k) => 50 + k * 5).map((val) => (
                <option value={val}>{val}</option>
              ))}
            </select>
          </div>
          <div id="chartComponent" className="text-center mb-16">
            <PieChart
              shortStudents={shortStudents.length}
              totalStudents={allStudents.length}
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-5">Students</h1>
            <table className="ml-auto mr-auto border border-black">
              <tr>
                <th className="w-96 bg-gray-300 p-2 text-xl">Name</th>
                <th className="w-96 bg-gray-300 p-2 text-xl">Attedance</th>
              </tr>
              {allStudents?.map((student) => (
                <tr key={student.rollid}>
                  <td
                    className={`p-2 border border-black border-r-0 font-semibold ${
                      student.attended / course.totalClasses <
                      attendaceRateFilter * 0.01
                        ? "bg-red-300"
                        : "bg-green-300"
                    }`}>
                    {student.name}
                  </td>
                  <td
                    className={`p-2 border border-black border-l-0 font-semibold ${
                      student.attended / course.totalClasses <
                      attendaceRateFilter * 0.01
                        ? "bg-red-300"
                        : "bg-green-300"
                    }`}>
                    {student.attended} (
                    {(student.attended / course.totalClasses) * 100}%)
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Course;
