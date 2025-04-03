import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@carbon/react";
import React from "react";

interface DataTableProps {
  headers: {
    header: string;
    key: string;
  }[];
  rows: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  }[];
  size: "sm" | "md" | "lg";
}

const CustumDataTable = ({ headers, rows, size }: DataTableProps) => {
  return (
    <Table aria-label="Sample Table" size={size}>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableHeader key={header.key}>{header.header}</TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {headers.map((header) => (
              <TableCell key={header.key}>
                {row[header.key as keyof typeof row]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustumDataTable;
