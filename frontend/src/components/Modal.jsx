import { useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { CircleX } from "lucide-react";
import { add_student, update_student } from "../Reducer/actions";
import {
  BatchsContextPaymentStatusContext,
  CurrentStudentContext,
  useStudentsDispatch,
  // useToast,
} from "../Reducer/reducers";

const schema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    phone_number: yup
      .string()
      .required()
      .min(10, "Phone number must be have 10 numbers"),
    course: yup.string().required(),
    batch: yup.number().required(),
    payment_status: yup.number().required(),
  })
  .required();

export function ModalAdd({ active, onClick }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted, isSubmitting, isSubmitSuccessful },
  } = useForm({ resolver: yupResolver(schema) });

  // console.log(isSubmitSuccessful, isSubmitted, errors);

  const dispatch = useStudentsDispatch();
  const { currentStudent } = useContext(CurrentStudentContext);

  const { batchs, paymentStatus } = useContext(
    BatchsContextPaymentStatusContext
  );
  // const { pushToast } = useToast();

  useEffect(() => {
    if (currentStudent) {
      reset(currentStudent);
    }
    if (isSubmitSuccessful && !currentStudent) {
      reset();
    }
  }, [reset, currentStudent, isSubmitSuccessful]);

  const onSubmit = async (data) => {
    // console.log(data);

    try {
      if (currentStudent) {
        await update_student(dispatch)(data, currentStudent.id);
        onClick()
      } else {
        await add_student(dispatch)(data);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Student name..."
            autoComplete="off"
            {...register("name")}
          />
          <input
            type="email"
            placeholder="Student email..."
            {...register("email")}
          />
          <input
            type="text"
            placeholder="Student phone number..."
            {...register("phone_number")}
          />
          {errors.phone_number && <span>{errors.phone_number?.message}</span>}
          <input
            type="text"
            placeholder="Student course..."
            {...register("course")}
          />
          <select {...register("batch")}>
            <option value="">Select Batch</option>
            {batchs.map((batch) => (
              <option key={batch.id} value={batch.id}>
                {batch.name}
              </option>
            ))}
          </select>
          <select {...register("payment_status")}>
            <option value="">Select Payment Status</option>
            {paymentStatus.map((p) => (
              <option key={p.id} value={p.id}>
                {p.status}
              </option>
            ))}
          </select>
          <button type="submit" disabled={isSubmitting}>
            Add
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
