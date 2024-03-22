import { Plus } from "lucide-react";
import { useContext } from "react";
import { CurrentStudentContext } from "../Reducer/reducers";
export function Addnew({ onClick }) {
  const { setCurrentStudent } = useContext(
    CurrentStudentContext
  );

  const updateCurrentStudent = (objet) => {
    setCurrentStudent(objet);
  };

  return (
    <button
      className="btn_add"
      onClick={() => {
        onClick(), updateCurrentStudent();
      }}
    >
      <Plus />
      Add new
    </button>
  );
}
