"use client";

import { useTranslation } from "react-i18next";
import {
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Dropdown,
} from "@carbon/react";
import {
  Awake,
  AsleepFilled,
  UserAvatar,
  UserAvatarFilled,
  NotificationFilled,
  NotificationNew,
  Phone,
  PhoneFilled,
} from "@carbon/icons-react";
import { useEffect } from "react";
import { g10, g90 } from "@carbon/themes";

export default function AppHeader({
  isAwake,
  toggleMode,
  handleChangeLanguage,
}: Readonly<{
  isAwake: boolean;
  toggleMode: () => void;
  handleChangeLanguage: (language: string) => void;
}>) {
  const { t } = useTranslation();

  useEffect(() => {
    const theme = isAwake ? g10 : g90;
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
    document.body.setAttribute("data-theme", isAwake ? "light" : "dark");
  }, [isAwake]);

  return (
    <Header
      aria-label={t("IBM Platform Name")}
      className={isAwake ? "header-awake" : "header-asleep"}
      data-theme={isAwake ? "light" : "dark"}
    >
      <HeaderName href="#" prefix="" className="header-name">
        {t("Intellisphere")}
      </HeaderName>
      <HeaderGlobalBar className="header-global-bar">
        <Dropdown
          id="language-dropdown"
          label={t("Select Language")}
          className="dropdown-small"
          items={[
            { id: "en", text: "English" },
            { id: "fr", text: "Français" },
            { id: "ja", text: "日本語" },
          ]}
          itemToString={(item) => (item ? item.text : "")}
          onChange={({ selectedItem }) =>
            selectedItem && handleChangeLanguage(selectedItem.id)
          }
          titleText={undefined}
        />
        <HeaderGlobalAction aria-label={t("User Profile")}>
          {isAwake ? (
            <NotificationFilled />
          ) : (
            <NotificationNew className="icons" />
          )}
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label={t("User Contact")}>
          {isAwake ? <PhoneFilled /> : <Phone className="icons" />}
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label={t("Settings")}>
          {isAwake ? <UserAvatarFilled /> : <UserAvatar className="icons" />}
        </HeaderGlobalAction>
        <HeaderGlobalAction aria-label={t("Mode Toggle")} onClick={toggleMode}>
          {isAwake ? <Awake /> : <AsleepFilled />}
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
}
