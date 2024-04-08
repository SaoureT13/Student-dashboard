import { useState } from "react";
import "./styles/App.css";
import { Addnew } from "./components/Addnew";
import Header from "./components/Header";
import { SearchBar } from "./components/SearchBar";
import { StudentContent } from "./components/StudentContent";
import { ModalAdd } from "./components/Modal";

function App() {
  const [active, setActive] = useState("");

  const [selectedBatch, setSelectedBatch] = useState(0);
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState(0);

  const [search, setSearch] = useState("");

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
          handleSearch={setSearch}
          value={search}
        />
        <Addnew onClick={handleModal} />
      </div>
      <StudentContent
        onClick={handleModal}
        active={active}
        selectedBatch={selectedBatch}
        selectedPaymentStatus={selectedPaymentStatus}
        valueSearch={search}
      />
      {active == "active" && <ModalAdd active={active} onClick={handleModal} />}
    </div>
  );
}

export default App;
