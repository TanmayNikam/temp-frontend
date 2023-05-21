import cookie from "js-cookie";
import axios from "axios";
export const fetchCourses = async () => {
  try {
    const response = await axios.get("/api/courses", {
      headers: { Authorization: `Bearer ${cookie.get("token")}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addCourse = async (courseName) => {
  try {
    const response = await axios.post(
      "/api/courses",
      { courseName },
      { headers: { Authorization: `Bearer ${cookie.get("token")}` } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCourse = async (courseid) => {
  try {
    const response = await axios.delete("/api/courses/course", {
      headers: { Authorization: `Bearer ${cookie.get("token")}` },
      data: {
        courseid,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
