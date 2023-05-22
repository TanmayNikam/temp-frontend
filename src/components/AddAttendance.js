import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { addAttendance } from "../apiCalls/attendance";
import { toast } from "react-hot-toast";

const AddAttendance = ({ course, setAddAttendance }) => {
  const [record, setRecord] = useState({
    name: "",
    file: "",
    courseid: course?._id,
  });

  const handleAdd = async () => {
    try {
      const formData = new FormData();
      Object.keys(record).forEach((key) => formData.append(key, record[key]));
      const response = await addAttendance(formData);
      if (response.success) toast.success("Attendance Added");
      else toast.error(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <BiArrowBack
        className="text-3xl mb-6 cursor-pointer"
        onClick={() => {
          setAddAttendance(false);
        }}
      />
      <div className="flex flex-col w-96 mt-5">
        <div>
          <label className="mt-10 text-xl">Upload Attendance Sheet</label>
          <input
            type="file"
            className="mt-5"
            onChange={(e) => setRecord({ ...record, file: e.target.files[0] })}
          />
          <input
            className="border border-black w-96 rounded-lg p-2 mt-5"
            placeholder="Name"
            value={record.name}
            onChange={(e) => setRecord({ ...record, name: e.target.value })}
          />
          {record.img && (
            <div className="mt-10">
              <img src={record.img} alt="uploaded-img" />
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <button
            className="mt-5 py-2 px-6 border border-blue-900 bg-blue-500 text-white rounded-full"
            onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAttendance;
