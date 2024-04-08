import "../styles/toast.css";
// import { exclamation } from "../assets/exclamation.svg";

export function Toast({ title, content }) {
  return (
    <div className="toast">
      <div className="toast_content">
        <div className="icon">
          {/* <img src={check} /> */}
        </div>
        {title && (
          <p>
            <strong>{title}</strong>
          </p>
        )}
        <div className="message">{content}</div>
      </div>
    </div>
  );
}
