import React from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import {
  MdOutlineFirstPage,
  MdOutlineLastPage
} from "react-icons/md";

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

const Pagination = ({ previousPage, nextPage, canPreviousPage, canNextPage, state, pageOptions, setPageSize, gotoPage, pageCount }) => {
  
  return (
    <div className="py-3 px-4 flex items-center justify-between">
      <div className="flex-1 flex justify-between sm:hidden items-center">
        <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </Button>
        <Button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div className="flex gap-x-2 items-center justify-between text-base text-gray-700">
          <span>
            Page <span className="font-medium">{state.pageIndex + 1}</span> of{" "}
            <span className="font-medium">{pageOptions.length}</span>
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
              <MdOutlineFirstPage className="h-5 w-5" aria-hidden="true" />
            </PageButton>
            <PageButton
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <span className="sr-only">Previous</span>
              <RiArrowLeftSLine className="h-5 w-5" aria-hidden="true" />
            </PageButton>
            <PageButton onClick={() => nextPage()} disabled={!canNextPage}>
              <span className="sr-only">Next</span>
              <RiArrowRightSLine className="h-5 w-5" aria-hidden="true" />
            </PageButton>
            <PageButton
              className="rounded-r-md"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <span className="sr-only">Last</span>
              <MdOutlineLastPage className="h-5 w-5" aria-hidden="true" />
            </PageButton>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
