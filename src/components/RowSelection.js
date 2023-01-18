import React, { useMemo } from "react";
import { useTable } from "react-table/dist/react-table.development";
import MOCK_DATA from "./MOCK_DATA.json";
import { GROUPED_COLUMNS } from "./columns";
import "./table.css";

const RowSelection = () => {
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
  } = tableInstance;

  return (
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
  );
};

export default RowSelection;
