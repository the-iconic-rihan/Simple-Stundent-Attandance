import React, { useState, useEffect } from "react";
import "./attandance.css";
const Attandance = () => {
  // State to store the list of students present
  const [students, setStudents] = useState([]);
  const [count, setCount] = useState(0);
  //   handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(e.target.rollNumber.value, e.target.name.value);
    e.target.rollNumber.value = "";
    e.target.name.value = "";
  };
  // Function to add a student to the list
  const addStudent = (rollNumber, name) => {
    setStudents(students.concat({ rollNumber, name, checkInTime: new Date() }));
    setCount(count + 1);
  };

  // Function to check out a student
  const checkOutStudent = (rollNumber) => {
    const updatedStudents = students.map((student) => {
      if (student.rollNumber === rollNumber) {
        return {
          ...student,
          checkOutTime: new Date(),
        };
      }
      return student;
    });
    setStudents(updatedStudents);
    setCount(count - 1);
  };

  // Use effect to update the number of students present
  useEffect(() => {
    const numStudents = students.filter(
      (student) => !student.checkOutTime
    ).length;
    console.log(`There are ${numStudents} students present.`);
  }, [students]);

  return (
    <>
      <h1 className="text-center">Student Attandance </h1>

      <div className="center">
        <div className="center-div">
          <form onSubmit={handleSubmit}>
            <div className="m-auto">
              <label className="w-100">
                <b> Roll Number : </b>
                <input
                  type="text"
                  name="rollNumber"
                  className="form-control input"
                  required
                />
              </label>
            </div>
            <br />

            <div className="m-auto">
              <label className="w-100">
                <b>Name : </b>
                <input
                  type="text"
                  name="name"
                  className="form-control input"
                  required
                />
              </label>
            </div>
            <br />
            <button type="submit" className="btn btn-success w-100">
              Check In
            </button>
          </form>
          <hr></hr>
          <p>
            <b>No Of Students </b>: {count}
          </p>
          {students.map((student) => (
            <div key={student.rollNumber}>
              <p>
                <b>Student Name </b>: <span>{student.name}</span>
              </p>
              <p>
                <b>Roll Number</b> :<span> {student.rollNumber}</span>
              </p>
              <p>
                <b>Check-In Time </b>:{student.checkInTime.toString()}
              </p>
              <p>
                {student.checkOutTime ? (
                  <p>
                    <b>Check-Out Time </b>: &nbsp;
                    <span>{student.checkOutTime.toString()}</span>
                  </p>
                ) : (
                  <p>
                    <b>Check-Out Time </b>: &nbsp;
                    <span>
                      <button
                        className="btn btn-danger"
                        onClick={() => checkOutStudent(student.rollNumber)}
                      >
                        Check Out
                      </button>
                    </span>
                  </p>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Attandance;
