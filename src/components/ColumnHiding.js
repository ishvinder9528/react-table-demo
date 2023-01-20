import React, { useMemo } from "react";
import { useTable , useColumnHiding} from "react-table/dist/react-table.development";
import MOCK_DATA from "./MOCK_DATA.json";
import { GROUPED_COLUMNS } from "./columns";
import "./table.css";
import { Checkbox } from "./CheckBox";

const ColumnHiding = () => {
  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const tableInstance = useTable({
    columns,
    data,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
    allColumns,
    getToggleHideAllColumnsProps,
  } = tableInstance;



  return (
    <>
    <div className="left_side">
    <div>
      <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle
      All
    </div>
    {allColumns.map(column => (
        <div key={column.id}>
        <label>
          <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
          {column.id}
        </label>
      </div>
    ))}
    <br />
  </div>
    <table {...getTableProps()}>
    <thead>
      {headerGroups.map(group => (
          <tr {...group.getHeaderGroupProps()}>
          {group.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map((row, i) => {
          prepareRow(row)
          return (
              <tr {...row.getRowProps()}>
            {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
            })}
          </tr>
        )
    })}
    </tbody>
    <tfoot>
      {footerGroups.map(group => (
          <tr {...group.getFooterGroupProps()}>
          {group.headers.map(column => (
              <td {...column.getFooterProps()}>{column.render('Footer')}</td>
              ))}
        </tr>
      ))}
    </tfoot>
  </table>
      </>
  );
};

export default ColumnHiding;
