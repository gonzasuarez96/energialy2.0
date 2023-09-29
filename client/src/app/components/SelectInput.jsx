'use client'
import { Select, initTE } from "tw-elements";
import { useEffect } from "react";

function SelectInput({options}) {
    useEffect(() => {
      initTE({ Select });
    },[]);
  return (
    <div>
      <select
        data-te-select-init
        data-te-select-placeholder="Example placeholder"
        multiple
      >
        {options.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectInput