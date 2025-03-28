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

export default function AppHeader({
  isAwake,
  toggleMode,
  handleChangeLanguage,
}: {
  isAwake: boolean;
  toggleMode: () => void;
  handleChangeLanguage: (language: string) => void;
}) {
  const { t } = useTranslation();
  const headerClass = isAwake ? "header-awake" : "header-asleep";

  return (
    <Header aria-label={t("IBM Platform Name")} className={headerClass}>
      <HeaderName href="#" prefix="" className="icons">
        {t("Intellisphere")}
      </HeaderName>
      <HeaderGlobalBar>
        <Dropdown
          id="language-dropdown"
          label={t("Select Language")}
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
        <HeaderGlobalAction
          aria-label={t("Mode Toggle")}
          onClick={toggleMode}
        >
          {isAwake ? <Awake /> : <AsleepFilled />}
        </HeaderGlobalAction>
      </HeaderGlobalBar>
    </Header>
  );
}
