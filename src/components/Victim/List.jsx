import React from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import Pagination from "../Table/Pagination/Pagination";

const List = ({ title = "", columns = [], data = [], actions = [] }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    usePagination
  );

  return (
    <section className="flex flex-col justify-center antialiased bg-white border border-slate-300 text-gray-600 px-4">
      <header className="pt-6 pb-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800 text-lg">{title}</h2>
      </header>
      <div className="mb-6">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      scope="col"
                      className="p-2 whitespace-nowrap"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <div className={`font-semibold text-${column.align}`}>
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " ▼"
                              : " ▲"
                            : ""}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="text-sm divide-y divide-gray-100">
              {page.map((page, i) => {
                prepareRow(page);
                return (
                  <tr {...page.getRowProps()}>
                    {page.cells.map((cell) => {
                      switch (cell.column.id) {
                        case "id_victim":
                          return (
                            <td
                            className="p-2 whitespace-nowrap w-fit"
                              {...cell.getCellProps()}
                            >
                              {actions.map(({ tooltip, icon, handler }) => {
                                return (
                                  <div
                                  className={`text-lg text-${cell.column.align}`}
                                    onClick={() => handler(cell.value, tooltip, null)}
                                  >
                                    {icon}
                                  </div>
                                );
                              })}
                            </td>
                          );

                        default:
                          return (
                            <td className="p-2 whitespace-nowrap">
                              <div className="flex items-center">
                                <div
                                  className="font-medium text-gray-800"
                                  {...cell.getCellProps()}
                                >
                                  {cell.render("Cell")}
                                </div>
                              </div>
                            </td>
                          );
                      }
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Paginacion */}
          <Pagination
            previousPage={previousPage}
            nextPage={nextPage}
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            state={state}
            pageOptions={pageOptions}
            setPageSize={setPageSize}
            gotoPage={gotoPage}
            pageCount={pageCount}
          />
        </div>
      </div>
    </section>
  );
};

export default List;
