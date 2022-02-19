import React from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { MdOutlineFirstPage, MdOutlineLastPage, MdRemoveCircle } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import {ImProfile } from "react-icons/im";
import RolePill from "../Table/RolePill/RolePill";
import StatusPill from "./StatusPill/StatusPill";
import Actions from "./Actions/Actions";

const getCellType = (cell) => {
  const actionsOptions = [
    {
      path: "profile",
      param: "id_user",
      icon: <ImProfile />,
      color: "gray",
    },
    {
      path: "updateUser",
      param: "id_user",
      icon: <BiEdit />,
      color: "gray",
    },
    {
      path: "deleteUser",
      param: "id_user",
      icon: <MdRemoveCircle />,
      color: "red",
    },
  ];

  console.log(cell);
  switch (cell.column.id) {
    case "url_image":
      return (
        <td {...cell.getCellProps()}>
          <img
            className="rounded-full w-8 h-8 max-h-8 border-2 border-slate-200 object-cover m-auto"
            src={cell.value}
            alt="user avatar"
          />
        </td>
      );
    case "role":
      return (
        <td {...cell.getCellProps()}>
          <RolePill value={cell.value} />
        </td>
      );
    case "status":
      return (
        <td {...cell.getCellProps()}>
          <StatusPill value={cell.value} />
        </td>
      );
    case "id_user":
      return (
        <td {...cell.getCellProps()}>
          <Actions value={cell.value} options={actionsOptions} />
        </td>
      );

    default:
      return (
        <td
          className="mx-auto py-4 text-center whitespace-nowrap"
          {...cell.getCellProps()}
        >
          {cell.render("Cell")}
        </td>
      );
  }
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function Button({ children, className, ...rest }) {
  return (
    <button
      type="button"
      className={classNames(
        "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export function PageButton({ children, className, ...rest }) {
  return (
    <button
      type="button"
      className={classNames(
        "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

function Table({ columns, data, options }) {
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
    <div className="mt-4 mb-4 flex flex-col">
      <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table
              {...getTableProps()}
              className="min-w-full divide-y divide-gray-200"
            >
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        scope="col"
                        className="mx-auto py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " ▼"
                              : " ▲"
                            : ""}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                className="bg-white divide-y divide-gray-200"
                {...getTableBodyProps()}
              >
                {page.map((page, i) => {
                  prepareRow(page);
                  return (
                    <tr {...page.getRowProps()}>
                      {page.cells.map((cell) => getCellType(cell))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* Paginacion */}
            <div className="py-3 px-4 flex items-center justify-between">
              <div className="flex-1 flex justify-between sm:hidden">
                <Button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Previous
                </Button>
                <Button onClick={() => nextPage()} disabled={!canNextPage}>
                  Next
                </Button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div className="flex gap-x-2">
                  <span className="text-sm text-gray-700">
                    Page{" "}
                    <span className="font-medium">{state.pageIndex + 1}</span>{" "}
                    of <span className="font-medium">{pageOptions.length}</span>
                  </span>
                  <select
                    value={state.pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                    }}
                  >
                    {[5, 10, 20].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <PageButton
                      className="rounded-l-md"
                      onClick={() => gotoPage(0)}
                      disabled={!canPreviousPage}
                    >
                      <span className="sr-only">First</span>
                      <MdOutlineFirstPage
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </PageButton>
                    <PageButton
                      onClick={() => previousPage()}
                      disabled={!canPreviousPage}
                    >
                      <span className="sr-only">Previous</span>
                      <RiArrowLeftSLine
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </PageButton>
                    <PageButton
                      onClick={() => nextPage()}
                      disabled={!canNextPage}
                    >
                      <span className="sr-only">Next</span>
                      <RiArrowRightSLine
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </PageButton>
                    <PageButton
                      className="rounded-r-md"
                      onClick={() => gotoPage(pageCount - 1)}
                      disabled={!canNextPage}
                    >
                      <span className="sr-only">Last</span>
                      <MdOutlineLastPage
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </PageButton>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
