import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const StudentsContext = createContext(null);
const StudentsDispatchContext = createContext(null);
export const CurrentStudentContext = createContext(null);
export const BatchsContextPaymentStatusContext = createContext(null);

export function StudentsProvider({ children }) {
  const [students, dispatch] = useReducer(studentsReducer, []);
  const [currentStudent, setCurrentStudent] = useState(null);

  const [batchs, setBatchs] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState([]);

  //Je me demandais si je ne devrais recuperer les données simplement et inialisé mon reducer avec au lieu de faire ça
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/students/");
        const studentData = response.data;
        dispatch({ type: "INITIALIZE_DATA", students: studentData });
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [students]);

  useEffect(() => {
    const fetchData = async (url, setter) => {
      try {
        const response = await axios.get(url);
        setter(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData("http://localhost:8000/batchs/", setBatchs);
    fetchData("http://localhost:8000/paymentStatus/", setPaymentStatus);
  }, []);

  return (
    <StudentsContext.Provider value={students}>
      <StudentsDispatchContext.Provider value={dispatch}>
        <CurrentStudentContext.Provider
          value={{ currentStudent, setCurrentStudent }}
        >
          <BatchsContextPaymentStatusContext.Provider
            value={{ batchs, paymentStatus }}
          >
            {children}
          </BatchsContextPaymentStatusContext.Provider>
        </CurrentStudentContext.Provider>
      </StudentsDispatchContext.Provider>
    </StudentsContext.Provider>
  );
}

export function useStudents() {
  return useContext(StudentsContext);
}

export function useStudentsDispatch() {
  return useContext(StudentsDispatchContext);
}

function studentsReducer(students, action) {
  switch (action.type) {
    case "INITIALIZE_DATA": {
      return action.students;
    }
    case "ADD_STUDENT_SUCCESS": {
      return [...students, action.student];
    }
    case "ADD_STUDENT_FAILURE": {
      return { ...students, student: null };
    }
    case "UPDATE_STUDENT_SUCCESS": {
      // const updatedStudents = students.map((student) =>
      //   student.id === action.student_id ? action.student : student
      // );

      // return updatedStudents;
      return {
        ...students,
        students: students.map((student) =>
          student.id === action.student_id ? action.student : student
        ),
      };
    }

    case "DELETE_STUDENT_SUCCESS": {
      const updatedStudents = students.filter(
        (student) => student.id !== student
      );
      return updatedStudents;
    }

    default: {
      return students;
    }
  }
}
