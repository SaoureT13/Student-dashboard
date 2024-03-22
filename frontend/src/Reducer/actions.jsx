import axios from "axios";

export const add_student = (dispatch) => async (studentData) => {
  try {
    const jsonValid = JSON.stringify(studentData);
    const response = await axios.post(
      "http://localhost:8000/students/",
      jsonValid,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "ADD_STUDENT_SUCCESS", student: response.data });
  } catch (error) {
    dispatch({ type: "ADD_STUDENT_FAILURE", error: error.message });
    throw error;
  }
};

export const update_student = (dispatch) => async (studentData, studentId) => {
  try {
    const jsonValid = JSON.stringify(studentData);
    const response = await axios.put(
      `http://localhost:8000/student/${studentId}`,
      jsonValid,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "UPDATE_STUDENT_SUCCES",
      student: response.data,
      student_id: studentId,
    });
  } catch (error) {
    dispatch({ type: "UPDATE_STUDENT_FAILURE", error: error.message });
    throw error;
  }
};

export const delete_student = (dispatch) => async (studentId) => {
  try {
    await axios.delete(`http://localhost:8000/student/${studentId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch({
      type: "DELETE_STUDENT_SUCCESS",
      student_id: studentId,
    });
  } catch (error) {
    dispatch({ type: "DELETE_STUDENT_FAILURE", error: error.message });
    throw error;
  }
};
