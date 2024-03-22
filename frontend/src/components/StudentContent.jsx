import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import {
  CurrentStudentContext,
  useStudents,
  useStudentsDispatch,
} from "../Reducer/reducers";
import { useContext, useEffect, useState } from "react";
import { delete_student } from "../Reducer/actions";

export function StudentContent({
  onClick,
  selectedBatch,
  selectedPaymentStatus,
}) {
  const students = useStudents();
  const [studentsFiltered, setStudentsFiltered] = useState(students);

  
  useEffect(() => {
    if (!isNaN(selectedBatch) || !isNaN(selectedPaymentStatus)) {
      setStudentsFiltered(
        students.filter((student) => {
          if (
            (!isNaN(selectedBatch) && student.batch == selectedBatch) &&
            (!isNaN(selectedPaymentStatus) &&
              student.payment_status == selectedPaymentStatus)
          ) {
            return true;
          } else {
            return false;
          }
        })
      );
    }
  }, [selectedBatch, selectedPaymentStatus, students]);

  const dispatch = useStudentsDispatch();

  const { setCurrentStudent } = useContext(CurrentStudentContext);

  const updateCurrentStudent = (objet) => {
    setCurrentStudent(objet);
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await delete_student(dispatch)(studentId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="main">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone no.</th>
            <th>Course</th>
            <th>Batch</th>
            <th>Fee Status</th>
          </tr>
        </thead>
        <tbody>
          {studentsFiltered.length === 0
            ? students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone_number}</td>
                  <td>{student.course}</td>
                  <td>
                    Batch{" "}
                    {student.batch == 1 ? "A" : student.batch == 2 ? "B" : "C"}
                  </td>
                  <td
                    style={{
                      color: student.payment_status == 1 ? "orange" : "green",
                    }}
                  >
                    {student.payment_status == 1 ? "Pending" : "Completed"}
                    <div className="gestion_box">
                      <EllipsisVertical />
                      <div className="dropdown_box">
                        <button
                          className="btn_edit"
                          onClick={() => {
                            onClick(), updateCurrentStudent(student);
                          }}
                        >
                          <Pencil /> Edit
                        </button>
                        <button
                          className="btn_delete"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          <Trash2 /> Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            : studentsFiltered.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone_number}</td>
                  <td>{student.course}</td>
                  <td>
                    Batch{" "}
                    {student.batch == 1 ? "A" : student.batch == 2 ? "B" : "C"}
                  </td>
                  <td
                    style={{
                      color: student.payment_status == 1 ? "orange" : "green",
                    }}
                  >
                    {student.payment_status == 1 ? "Pending" : "Completed"}
                    <div className="gestion_box">
                      <EllipsisVertical />
                      <div className="dropdown_box">
                        <button
                          className="btn_edit"
                          onClick={() => {
                            onClick(), updateCurrentStudent(student);
                          }}
                        >
                          <Pencil /> Edit
                        </button>
                        <button
                          className="btn_delete"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          <Trash2 /> Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </main>
  );
}
