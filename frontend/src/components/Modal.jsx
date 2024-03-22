import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CircleX } from "lucide-react";
import { add_student, update_student } from "../Reducer/actions";
import {
  BatchsContextPaymentStatusContext,
  CurrentStudentContext,
  useStudentsDispatch,
} from "../Reducer/reducers";

export function ModalAdd({ active, onClick }) {
  const dispatch = useStudentsDispatch();
  const { currentStudent } = useContext(
    CurrentStudentContext
  );

  const { batchs, paymentStatus} = useContext(BatchsContextPaymentStatusContext)

  useEffect(() => {
    if(currentStudent){
      setFormData({
        name: currentStudent.name,
        email: currentStudent.email,
        phone_number: currentStudent.phone_number,
        course: currentStudent.course,
        batch: currentStudent.batch,
        payment_status: currentStudent.payment_status,
      });
    }
  }, [currentStudent]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    course: "",
    batch: "",
    payment_status: "",
  });

  const onChange = (e) => {
    const value =
      e.target.name === "batch" || e.target.name === "payment_status"
        ? parseInt(e.target.value)
        : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormData({
      name: "",
      email: "",
      phone_number: "",
      course: "",
      batch: "",
      payment_status: "",
    });

    onClick()

    try {
      if(currentStudent){
        await update_student(dispatch)(formData, currentStudent.id);
      }else{
        await add_student(dispatch)(formData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  return createPortal(
    <div className={`light-box ${active}`}>
      <div
        className="overlay"
        onClick={onClick}
        style={{ cursor: "pointer" }}
      ></div>
      <div className="modal">
        <span
          style={{ cursor: "pointer" }}
          onClick={onClick}
          className="close_modal"
        >
          <CircleX />
        </span>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            name="name"
            placeholder="Student name..."
            autoComplete="off"
            required
            value={formData.name}
            onChange={(e) => onChange(e)}
          />
          <input
            type="text"
            name="email"
            placeholder="Student email..."
            autoComplete="no-email"
            required
            value={formData.email}
            onChange={(e) => onChange(e)}
          />
          <input
            type="text"
            name="phone_number"
            placeholder="Student phone number..."
            autoComplete="no-number"
            required
            value={formData.phone_number}
            onChange={(e) => onChange(e)}
          />
          <input
            type="text"
            name="course"
            placeholder="Student course..."
            autoComplete="off"
            required
            value={formData.course}
            onChange={(e) => onChange(e)}
          />
          <select
            name="batch"
            required
            value={formData.batch}
            onChange={(e) => onChange(e)}
          >
            <option value="">Select Batch</option>
            {batchs.map((batch) => (
              <option key={batch.id} value={batch.id}>
                {batch.name}
              </option>
            ))}
          </select>
          <select
            name="payment_status"
            required
            value={formData.payment_status}
            onChange={(e) => onChange(e)}
          >
            <option value="">Select Payment Status</option>
            {paymentStatus.map((p) => (
              <option key={p.id} value={p.id}>
                {p.status}
              </option>
            ))}
          </select>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>,
    document.body
  );
}
