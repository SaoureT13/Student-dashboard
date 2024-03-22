import { Search, ListFilter } from "lucide-react";
import { useContext } from "react";
import { BatchsContextPaymentStatusContext } from "../Reducer/reducers";

function Input({ value, onChange }) {
  return (
    <div className="search_box">
      <div className="search_icon">
        <Search />
      </div>
      <input
        type="text"
        placeholder="Search by name, email, or phone"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Select({ name, datas, onChange }) {
  const selectId = `${name}-select`;

  return (
    <div className="select_box">
      <label htmlFor={selectId}>{name}:</label>
      <select name={name} id={selectId} onChange={onChange}>
        <option value="">All</option>
        {datas.map((data) => (
          <option key={data.id} value={data.id}>
            {data.name ? data.name : data.status}
          </option>
        ))}
      </select>
    </div>
  );
}

export function SearchBar({ handleBatchFilter, handlePaymentStatusFilter }) {
  const { batchs, paymentStatus } = useContext(
    BatchsContextPaymentStatusContext
  );
  return (
    <div className="search_bar">
      <Input />
      <div className="filter">
        <ListFilter />
        <p>Filter</p>
      </div>
      <Select name="Batch" datas={batchs} onChange={handleBatchFilter} />
      <Select
        name="Fee status"
        datas={paymentStatus}
        onChange={handlePaymentStatusFilter}
      />
    </div>
  );
}
