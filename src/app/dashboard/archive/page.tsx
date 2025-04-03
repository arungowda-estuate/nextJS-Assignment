"use client";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  TableBatchActions,
  TableBatchAction,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  TableSelectAll,
  TableSelectRow,
  Button,
  Modal,
} from "@carbon/react";
import { TrashCan, Save, Download } from "@carbon/icons-react";
import { useCallback, useState } from "react";
import "./archivePage.scss";
import AppHeader from "@/components/header";
import i18n from "@/i18n";

export default function Archive() {
  const [isAwake, setIsAwake] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowsForDeletion, setSelectedRowsForDeletion] = useState<
    Array<{ id: string; [key: string]: unknown }>
  >([]);
  const [rows, setRows] = useState([
    { id: "1", userid: "user001", name: "Kiran", email: "kiran@example.com" },
    { id: "2", userid: "user002", name: "Harsha", email: "harsha@example.com" },
    { id: "3", userid: "user003", name: "Arun", email: "arun@example.com" },
    { id: "4", userid: "user004", name: "Divya", email: "divya@example.com" },
    { id: "5", userid: "user005", name: "Tunga", email: "tunga@example.com" },
  ]);

  const headers = [
    { key: "userid", header: "User ID" },
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
  ];

  const handleDelete = () => {
    const remainingRows = rows.filter(
      (row) =>
        !selectedRowsForDeletion.some(
          (selectedRow) => selectedRow.id === row.id
        )
    );
    setRows(remainingRows);
    setSelectedRowsForDeletion([]);
    setIsModalOpen(false);
  };

  const toggleMode = () => setIsAwake(!isAwake);

  const handleChangeLanguage = useCallback(
    (language: string) => i18n.changeLanguage(language),
    []
  );

  const handleBatchActionClick = (selectedRows) => {
    const selectedRowsData = selectedRows.map((row) => ({
      id: row.id,
      ...row.cells.reduce((acc, cell) => {
        (acc as Record<string, unknown>)[cell.info.header] = cell.value;
        return acc;
      }, {}),
    }));
    setSelectedRowsForDeletion(selectedRowsData);
    setIsModalOpen(true);
  };

  const handleSearchChange =
    (onInputChange) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event && "target" in event) {
        onInputChange(event);
      }
    };

  const renderTableRow = (row, getSelectionProps) => {
    const rowProps = row.getRowProps ? row.getRowProps() : {};

    return (
      <TableRow key={row.id} {...rowProps}>
        <TableSelectRow {...getSelectionProps({ row })} />
        {row.cells.map((cell) => (
          <TableCell key={cell.id}>{cell.value}</TableCell>
        ))}
      </TableRow>
    );
  };

  return (
    <>
      <AppHeader
        isAwake={isAwake}
        toggleMode={toggleMode}
        handleChangeLanguage={handleChangeLanguage}
      />
      <div className="archive-container">
        <DataTable rows={rows} headers={headers}>
          {({
            rows,
            headers,
            getHeaderProps,

            getSelectionProps,
            getToolbarProps,
            getBatchActionProps,
            onInputChange,
            selectedRows,
            getTableProps,
            getTableContainerProps,
          }) => {
            const batchActionProps = getBatchActionProps();
            return (
              <TableContainer
                title="DataTable"
                description="With batch actions"
                {...getTableContainerProps()}
              >
                <TableToolbar {...getToolbarProps()}>
                  <TableBatchActions {...batchActionProps}>
                    <TableBatchAction
                      renderIcon={TrashCan}
                      onClick={() => handleBatchActionClick(selectedRows)}
                    >
                      Archive
                    </TableBatchAction>
                    <TableBatchAction
                      renderIcon={Save}
                      onClick={() => console.log("Save clicked")}
                    />
                    <TableBatchAction
                      renderIcon={Download}
                      onClick={() => console.log("Download clicked")}
                    />
                  </TableBatchActions>
                  <TableToolbarContent
                    aria-hidden={batchActionProps.shouldShowBatchActions}
                  >
                    <TableToolbarSearch
                      onChange={handleSearchChange(onInputChange)}
                    />
                    <TableToolbarMenu>
                      <TableToolbarAction onClick={() => alert("Action 1")}>
                        Action 1
                      </TableToolbarAction>
                      <TableToolbarAction onClick={() => alert("Action 2")}>
                        Action 2
                      </TableToolbarAction>
                      <TableToolbarAction onClick={() => alert("Action 3")}>
                        Action 3
                      </TableToolbarAction>
                    </TableToolbarMenu>
                    <Button
                      onClick={() => console.log("Add new row")}
                      kind="primary"
                    >
                      Add new
                    </Button>
                  </TableToolbarContent>
                </TableToolbar>
                <Table {...getTableProps()} aria-label="sample table">
                  <TableHead>
                    <TableRow>
                      <TableSelectAll {...getSelectionProps()} />
                      {headers.map((header) => {
                        const { key, ...headerProps } = getHeaderProps({
                          header,
                        });
                        return (
                          <TableHeader key={key} {...headerProps}>
                            {header.header}
                          </TableHeader>
                        );
                      })}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => renderTableRow(row, getSelectionProps))}
                  </TableBody>
                </Table>
              </TableContainer>
            );
          }}
        </DataTable>

        <Modal
          open={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          danger
          modalHeading="Are you sure you want to Archive the selected rows?"
          modalLabel="Archive Confirmation"
          primaryButtonText="Archive"
          secondaryButtonText="Cancel"
          onSecondarySubmit={() => setIsModalOpen(false)}
          onRequestSubmit={handleDelete}
        />
      </div>
    </>
  );
}
