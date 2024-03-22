import { CircleX } from "lucide-react";
import { createPortal } from "react-dom";

export function DeleteModal({ active, onClick }) {
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
        <p>You confirm delete ?</p>
        <div className="response">
          <button className="yes_delete">Yes</button>
          <button className="no_delete">No</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
