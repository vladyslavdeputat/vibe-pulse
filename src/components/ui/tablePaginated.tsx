"use client";

import { useState, useMemo, useEffect, ReactNode } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TableHeaderItem } from "@/types";

type TablePaginatedProps<T> = {
  title: string;
  description?: string;
  headItemsArray: TableHeaderItem[];
  data: T[];
  renderRow: (item: T, index: number) => ReactNode;
  itemsPerPage?: number;
  isLoading?: boolean;
  emptyMessage?: string;
  error?: string | null;
  getItemKey?: (item: T, index: number) => string | number;
};

const TablePaginated = <T,>({
  title,
  description,
  headItemsArray,
  data,
  renderRow,
  itemsPerPage = 10,
  isLoading = false,
  emptyMessage = "No items found.",
  error = null,
  getItemKey,
}: TablePaginatedProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get paginated data
  const paginatedData = useMemo(() => {
    return data.slice(startIndex, endIndex);
  }, [data, startIndex, endIndex]);

  // Reset to page 1 when data changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [data.length, currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of table
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const defaultGetItemKey = (item: T, index: number) => {
    if (getItemKey) {
      return getItemKey(item, index);
    }
    // Try to get id from item if it exists
    if (typeof item === "object" && item !== null && "id" in item) {
      return (item as { id: string | number }).id;
    }
    return index;
  };

  return (
    <section className="rounded-2xl border border-border/60 bg-card/80 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/40 px-6 py-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border/60 text-sm">
          <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              {headItemsArray.map((header, index) => (
                <th
                  key={index}
                  className={`px-6 py-3 text-left font-medium ${
                    header.className || ""
                  }`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40 bg-card/60 text-foreground">
            {isLoading ? (
              <tr>
                <td
                  colSpan={headItemsArray.length}
                  className="px-6 py-12 text-center"
                >
                  <Loader2
                    className="size-16 animate-spin mx-auto"
                    aria-hidden
                  />
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan={headItemsArray.length}
                  className="px-6 py-12 text-center text-destructive"
                >
                  {error}
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={headItemsArray.length}
                  className="px-6 py-12 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((item, index) => (
                <tr
                  key={defaultGetItemKey(item, startIndex + index)}
                  className="hover:bg-muted/30"
                >
                  {renderRow(item, startIndex + index)}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {!isLoading && data.length > itemsPerPage && (
        <div className="flex items-center justify-between border-t border-border/40 px-6 py-4">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of{" "}
            {data.length} entries
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className="min-w-[2.5rem]"
                      >
                        {page}
                      </Button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="px-2 text-muted-foreground">
                        ...
                      </span>
                    );
                  }
                  return null;
                }
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default TablePaginated;
