import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useFilters } from "react-table/dist/react-table.development";
import MOCK_DATA from "./MOCK_DATA.json";
import { GROUPED_COLUMNS } from "./columns";
import "./table.css";
import GlobalFilter from "./GlobalFilter";
import { ColumnFilter } from "./ColumnFilter";


const BasicTable = () => {
  const columns = useMemo(() => GROUPED_COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter
    }),
    []
  )

  const tableInstance = useTable({
    columns,
    data,
    defaultColumn
  },
  useFilters,
  useGlobalFilter,
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter }= state

  return (
    <>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
    <table {...getTableProps()}>
    <thead>
      {headerGroups.map(group => (
        <tr {...group.getHeaderGroupProps()}>
          {group.headers.map(column => (
            <th {...column.getHeaderProps()}>{column.render('Header')}
            <div>{column.canFilter ? column.render('Filter') : null}</div>
            </th>
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

export default BasicTable;
