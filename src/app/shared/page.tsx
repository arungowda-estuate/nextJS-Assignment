"use client";

import React, { useState } from "react";
import AppHeader from "@/components/header";
import DropdownComponent from "@/components/shared/dropdown";
import InputWithBrowse from "@/components/shared/inputwithbutton";
import i18n from "@/i18n";
import CustumDataTable from "@/components/shared/custumDataTable";

import "./shared.scss";

export default function SharedPage() {
  const [isAwake, setIsAwake] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const toggleMode = () => {
    setIsAwake((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleBrowseClick = () => {
    if (inputValue.trim() !== "") {
      setShowDropdown(true);
    }
  };

  const handleDropdownChange = (value: string) => {
    setSelectedOption(value);
  };

  const row = [
    {
      id: "a",
      first_name: "Kevin",
      last_name: "Johnson",
      email: "kevin.johnson@example.com",
    },
    {
      id: "b",
      first_name: "Maureen",
      last_name: "Smith",
      email: "maureen.smith@example.com",
    },
    {
      id: "c",
      first_name: "Andrew",
      last_name: "Brown",
      email: "andrew.brown@example.com",
    },
    {
      id: "d",
      first_name: "Marc",
      last_name: "Turner",
      email: "marc.turner@example.com",
    },
    {
      id: "e",
      first_name: "Mel",
      last_name: "Davis",
      email: "mel.davis@example.com",
    },
    {
      id: "f",
      first_name: "Ronja",
      last_name: "Clark",
      email: "ronja.clark@example.com",
    },
    {
      id: "g",
      first_name: "Jill",
      last_name: "Harris",
      email: "jill.harris@example.com",
    },
  ];

  const headers = [
    { header: "First Name", key: "first_name" },
    { header: "Last Name", key: "last_name" },
    { header: "Email ID", key: "email" },
  ];

  const options = [
    {
      text: "Table 1",
    },
    {
      text: "Table 2",
    },
    {
      text: "Table 3",
    },
    {
      text: "Table 4",
    },
    {
      text: "Table 5",
    },
    {
      text: "Table 6",
    },
    {
      text: "Table 7",
    },
    {
      text: "Table 8",
    },
  ];

  return (
    <div>
      <AppHeader
        isAwake={isAwake}
        toggleMode={toggleMode}
        handleChangeLanguage={handleChangeLanguage}
      />

      <div className="div-body">
        <div className="div-input-container">
          <div className="input-with-browse">
            <InputWithBrowse
              labelText="Input Field"
              placeholder="Enter something..."
              onInputChange={handleInputChange}
              onButtonClick={handleBrowseClick}
              isButtonVisible
              styleforInput="input-field"
            />
          </div>

          {showDropdown && (
            <div className="dropdown-container">
              <DropdownComponent
                onChange={handleDropdownChange}
                items={options}
                labelText="Select Option"
                titleText={""}
                selectedItem={""}
                disabled={false}
              />
            </div>
          )}
        </div>

        {selectedOption && (
          <>
            <div className="dropdown-content">
              <p>You selected: {selectedOption}</p>
            </div>

            <CustumDataTable headers={headers} rows={row} size={"lg"} />
          </>
        )}
      </div>
    </div>
  );
}
