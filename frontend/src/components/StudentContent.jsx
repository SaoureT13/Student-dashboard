import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import {
  CurrentStudentContext,
  useStudents,
  useStudentsDispatch,
  useToast,
} from "../Reducer/reducers";
import { useContext, useEffect, useState } from "react";
import { delete_student } from "../Reducer/actions";

export function StudentContent({
  onClick,
  selectedBatch,
  selectedPaymentStatus,
  valueSearch,
}) {
  const students = useStudents();
  const [studentsFiltered, setStudentsFiltered] = useState([]);
  const dispatch = useStudentsDispatch();
  const { setCurrentStudent } = useContext(CurrentStudentContext);
  const { pushToast } = useToast();

  const updateCurrentStudent = (objet) => {
    setCurrentStudent(objet);
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await delete_student(dispatch)(studentId);
      // console.log("Student successfully deleted")
      // pushToast({ title: "Student successfully deleted" });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      students.length > 0 &&
      selectedBatch == 0 &&
      selectedPaymentStatus == 0 &&
      valueSearch.length == 0
    ) {
      setStudentsFiltered(students);
    }

    if(students.length == 0){
      setStudentsFiltered([])
    }
  }, [selectedBatch, selectedPaymentStatus, valueSearch, students]);

  useEffect(() => {
    if (selectedBatch != 0 || selectedPaymentStatus != 0) {
      if (!isNaN(selectedBatch) || !isNaN(selectedPaymentStatus)) {
        setStudentsFiltered(
          students.filter((student) => {
            if (
              student.batch == parseInt(selectedBatch) ||
              student.payment_status == parseInt(selectedPaymentStatus)
            ) {
              return true;
            }

            // if (
            //   valueSearch &&
            // ) {
            //   return true;
            // }

            return false;
          })
        );
      }
    }
  }, [selectedBatch, selectedPaymentStatus, students, valueSearch]);

  useEffect(() => {
    if (valueSearch) {
      setStudentsFiltered(
        studentsFiltered.filter(
          (student) =>
            student.name.toLowerCase().includes(valueSearch.toLowerCase()) ||
            student.email.toLowerCase().includes(valueSearch.toLowerCase()) ||
            student.phone_number.includes(valueSearch) ||
            student.course.toLowerCase().includes(valueSearch.toLowerCase())
        )
      );
    }
  }, [valueSearch, studentsFiltered]);

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
          {studentsFiltered.length == 0 ? (
            <tr>
              <td>Chargement</td>
            </tr>
          ) : (
            studentsFiltered.map((student) => (
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
          )}
        </tbody>
      </table>
    </main>
  );
}
