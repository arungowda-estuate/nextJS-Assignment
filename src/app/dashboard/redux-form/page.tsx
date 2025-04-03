"use client";
import { store } from "@/app/redux/store";
import Form from "@/components/Form";
import AppHeader from "@/components/header";
import i18n from "@/i18n";
import React, { useCallback, useState } from "react";
import { Provider } from "react-redux";
const FormPage: React.FC = () => {
  const [isAwake, setIsAwake] = useState(true);
const toggleMode = () => setIsAwake(!isAwake);

  const handleChangeLanguage = useCallback(
    (language: string) => i18n.changeLanguage(language),
    []
  );

  return (
    <div>
      <Provider store={store}>
        <AppHeader
                isAwake={isAwake}
                toggleMode={toggleMode}
                handleChangeLanguage={handleChangeLanguage}
              />
        <Form/>
      </Provider>
    </div>
  );
};

export default FormPage;
