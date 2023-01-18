import React,{useState} from "react";
import { useAsyncDebounce } from "react-table";

export default function GlobalFilter({ filter, setFilter }) {
    const [value, setValue] = useState(filter)
    const onChange = useAsyncDebounce(value=>{
        setFilter(value || undefined)
    },1000)
  return (
    <div
      className="center"
      style={{ backgroundColor: "#565656", color: "white" }}
    >
      Gloabal Search:{" "}
      <input
        style={{ backgroundColor: "grey", color: "white" }}
        placeholder="Type to search..."
        value={value || ""}
        onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
        }}
      />
       
    </div>
  );
}
