import { useState } from "react";
import "./App.css";
import { Addnew } from "./components/Addnew";
import Header from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { StudentContent } from "./components/StudentContent";
import { ModalAdd } from "./components/Modal";

function App() {
  const [active, setActive] = useState("");

  const [selectedBatch, setSelectedBatch] = useState(null);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(null);

  const handleBatchFilter = (event) => {
    setSelectedBatch(event.target.value);
  };

  const handlePaymentStatusFilter = (event) => {
    setSelectedPaymentStatus(event.target.value);
  };

  const handleModal = () => {
    setActive((v) => (v == "" ? "active" : ""));
  };

  return (
    <div className="container">
      <Header />
      <div className="sub_header">
        <SearchBar
          handlePaymentStatusFilter={handlePaymentStatusFilter}
          handleBatchFilter={handleBatchFilter}
        />
        <Addnew onClick={handleModal} />
      </div>
      <StudentContent
        onClick={handleModal}
        active={active}
        selectedBatch={selectedBatch}
        selectedPaymentStatus={selectedPaymentStatus}
      />
      {active == "active" && <ModalAdd active={active} onClick={handleModal} />}
    </div>
  );
}

export default App;
