"use client";

import React, { useState } from "react";
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableSelectRow,
  TableSelectAll,
  TableBatchActions,
  TableBatchAction,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableContainer,
  Button,
  Modal,
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Dropdown,
} from "@carbon/react";
import {
  TrashCan,
  Awake,
  AsleepFilled,
  NotificationFilled,
  NotificationNew,
  PhoneFilled,
  Phone,
} from "@carbon/icons-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import "../../styles/archive.scss";

const initialHeaders = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
];
const initialRows = [
  { id: "1", name: "John Doe", email: "john.doe@example.com" },
  { id: "2", name: "Jane Smith", email: "jane.smith@example.com" },
  { id: "3", name: "Sam Wilson", email: "sam.wilson@example.com" },
  { id: "4", name: "Alice Johnson", email: "alice.johnson@example.com" },
  { id: "5", name: "Bob Brown", email: "bob.brown@example.com" },
];

const ResponsiveContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="responsive-container">{children}</div>
);

const HeaderComponent = ({
  isAwake,
  toggleAwake,
  handleChangeLanguage,
}: {
  isAwake: boolean;
  toggleAwake: () => void;
  handleChangeLanguage: (language: string) => void;
}) => {
  const { t } = useTranslation();
  return (
    <Header
      aria-label={t("Archive Page")}
      className={isAwake ? "header-awake" : "header-asleep"}
    >
      <HeaderName href="#" prefix="" className="icons">
        {t("Archive")}
      </HeaderName>
      <HeaderGlobalBar>
        <Dropdown
          id="language-dropdown"
          label={t("Select Language")}
          items={[
            { id: "en", text: t("English") },
            { id: "fr", text: t("Français") },
            { id: "ja", text: t("日本語") },
          ]}
          itemToString={(item) => (item ? item.text : "")}
          onChange={({ selectedItem }) =>
            selectedItem && handleChangeLanguage(selectedItem.id)
          }
          titleText={undefined}
        />
        <HeaderGlobalAction aria-label={t("User Profile")}>
          {isAwake ? <NotificationFilled /> : <NotificationNew />}
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label={t("User Contact")}>
          {isAwake ? <PhoneFilled /> : <Phone />}
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label={t("Mode Toggle")} onClick={toggleAwake}>
          {isAwake ? <Awake /> : <AsleepFilled />}
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
};

const ArchiveModel = () => {
  const [rows, setRows] = useState(initialRows);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAwake, setIsAwake] = useState(true);
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const handleBatchDelete = () => {
    setRows(rows.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    setIsModalOpen(false);
  };

  const handleInputChange = (
    event: "" | React.ChangeEvent<HTMLInputElement>,
    value?: string
  ) => {
    const searchValue = value?.toLowerCase() || "";
    setRows(
      initialRows.filter(
        (row) =>
          row.name.toLowerCase().includes(searchValue) ||
          row.email.toLowerCase().includes(searchValue)
      )
    );
  };

  const handleChangeLanguage = (language: string) =>
    i18n.changeLanguage(language);

  return (
    <>
      <HeaderComponent
        isAwake={isAwake}
        toggleAwake={() => setIsAwake(!isAwake)}
        handleChangeLanguage={handleChangeLanguage}
      />
      <ResponsiveContainer>
        <TableContainer
          title={t("Archive Data Table")}
          description={t("Manage your archive")}
          className="table-container"
        >
          <DataTable rows={rows} headers={initialHeaders}>
            {({
              rows,
              headers,
              getHeaderProps,
              getRowProps,
              getSelectionProps,
              getBatchActionProps,
            }) => (
              <>
                <TableToolbar>
                  <TableBatchActions {...getBatchActionProps()}>
                    <TableBatchAction
                      renderIcon={TrashCan}
                      onClick={() => setIsModalOpen(true)}
                    >
                      {t("Archive")}
                    </TableBatchAction>
                  </TableBatchActions>
                  <TableToolbarContent>
                    <TableToolbarSearch
                      onChange={handleInputChange}
                      placeholder={t("Search")}
                    />
                    <Button
                      onClick={() => alert(t("Add new row"))}
                      kind="primary"
                    >
                      {t("Add new")}
                    </Button>
                  </TableToolbarContent>
                </TableToolbar>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableSelectAll {...getSelectionProps()} />
                      {headers.map((header) => (
                        <TableHeader
                          key={header.key}
                          {...getHeaderProps({ header })}
                        >
                          {t(header.header)}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id} {...getRowProps({ row })}>
                        <TableSelectRow {...getSelectionProps({ row })} />
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Modal
                  open={isModalOpen}
                  modalHeading={t("Delete Confirmation")}
                  primaryButtonText={t("Confirm")}
                  secondaryButtonText={t("Cancel")}
                  onRequestClose={() => setIsModalOpen(false)}
                  onRequestSubmit={handleBatchDelete}
                >
                  <p>
                    {t(
                      "Are you sure you want to archive the selected rows? This action cannot be undone."
                    )}
                  </p>
                </Modal>
              </>
            )}
          </DataTable>
        </TableContainer>
        <div className="centered-button">
          <Button onClick={() => router.push("/dashboard")} kind="secondary">
            {t("Back to Dashboard")}
          </Button>
        </div>
      </ResponsiveContainer>
    </>
  );
};

export default ArchiveModel;
