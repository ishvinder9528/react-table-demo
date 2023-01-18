import React,{useState} from 'react'
import { useAsyncDebounce } from "react-table";

export const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column
    const [value,setValue] = useState(filterValue)
    const onChange = useAsyncDebounce((value) =>{
        setFilter(value||undefined)
    },1000)
  return (
    <span>
        Search:{' '}
        <br/>
      <input style={{backgroundColor:'grey', color:'white'}}
      placeholder='Type to search...'
        value={value || ''}
        onChange={e => {
            setValue(e.target.value)
            onChange(e.target.value)
        }}
      />
    </span>
  )
}