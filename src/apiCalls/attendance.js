import cookie from "js-cookie";
import axios from "axios";

export const addAttendance = async (formData) => {
  try {
    const response = await axios.post("/api/attendance", formData, {
      headers: { Authorization: `Bearer ${cookie.get("token")}` },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAttendance = async (courseid) => {
  try {
    const response = await axios.get(`/api/attendance/course/${courseid}`, {
      headers: { Authorization: `Bearer ${cookie.get("token")}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
