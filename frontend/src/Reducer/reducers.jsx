import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toast } from "../components/Toast";

const StudentsContext = createContext(null);
const StudentsDispatchContext = createContext(null);
export const CurrentStudentContext = createContext(null);
export const BatchsContextPaymentStatusContext = createContext(null);

const defaultPush = (toast) => {};

const ToastContext = createContext({
  pushToastRef: { current: defaultPush },
});

export function StudentsProvider({ children }) {
  const [students, dispatch] = useReducer(studentsReducer, []);
  const [currentStudent, setCurrentStudent] = useState(null);

  const [batchs, setBatchs] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState([]);

  const isComponentMounted = useRef(false);

  const pushToastRef = useRef(defaultPush);

  useEffect(() => {
    const fetchDataStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/students/");
        const studentData = response.data;
        dispatch({ type: "INITIALIZE_DATA", students: studentData });
      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchData = async (url, setter) => {
      try {
        const response = await axios.get(url);
        setter(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (!isComponentMounted.current) {
      fetchDataStudents();
      fetchData("http://localhost:8000/batchs/", setBatchs);
      fetchData("http://localhost:8000/paymentStatus/", setPaymentStatus);
      isComponentMounted.current = true;
    }
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
            <ToastContext.Provider value={{ pushToastRef }}>
              <Toasts/>
              {children}
            </ToastContext.Provider>
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
      const updatedStudents = students.map((student) =>
        student.id === action.student_id ? action.student : student
      );
      return updatedStudents;
    }

    case "DELETE_STUDENT_SUCCESS": {
      const updatedStudents = students.filter(
        (student) => student.id !== action.student_id
      );
      return updatedStudents;
    }

    default: {
      return students;
    }
  }
}

export function Toasts() {
  const [toasts, setToasts] = useState([]);
  const { pushToastRef } = useContext(ToastContext);

  pushToastRef.current = ({ ...props }) => {
    const id = Date.now();

    const timer = setTimeout(() => {
      setToasts((v) => v.filter((t) => t.id !== id));
    }, 5 * 1000);

    const toast = { ...props, id, timer };
    setToasts((v) => [...v, toast]);
  };

  const onRemove = (toast) => {
    clearTimeout(toast.timer);
    setToasts((v) => v.filter((t) => t !== toast));
  };

  return (
    <div className="toast_container">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            onClick={() => onRemove(toast)}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opactity: 0, x: 30 }}
          >
            <Toast {...toast} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function useToast() {
  const { pushToastRef } = useContext(ToastContext);

  return {
    pushToast: useCallback(
      (toast) => {
        pushToastRef.current(toast);
      },
      [pushToastRef]
    ),
  };
}
