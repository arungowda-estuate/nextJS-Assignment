"use client";

import { useRouter } from "next/navigation";
import { Grid, Row, Column, ClickableTile } from "@carbon/react";
import {
  Archive,
  TrashCan,
  FolderDetailsReference,
  Folder,
} from "@carbon/icons-react";

import { useCallback, useState } from "react";
import AppHeader from "@/components/header";
import i18n from "@/i18n";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const [isAwake, setIsAwake] = useState(true);
  const router = useRouter();
  const { t } = useTranslation();
  const bodyClass = isAwake ? "body-light" : "body-dark";

  const toggleMode = () => setIsAwake(!isAwake);

  const handleChangeLanguage = useCallback(
    (language: string) => i18n.changeLanguage(language),
    []
  );

  const tiles = [
    {
      icon: TrashCan,
      label: t("dashboard.tiles.archive"),
      route: "/dashboard/archive",
    },
    {
      icon: Archive,
      label: t("dashboard.tiles.form"),
      route: "/dashboard/redux-form",
    },
    {
      icon: FolderDetailsReference,
      label: t("dashboard.tiles.shared"),
      route: "/shared",
    },
    {
      icon: Folder,
      label: t("dashboard.tiles.products"),
      route: "/dashboard/products",
    },
  ];

  return (
    <div className={`dashboard-container ${bodyClass}`}>
      <AppHeader
        isAwake={isAwake}
        toggleMode={toggleMode}
        handleChangeLanguage={handleChangeLanguage}
      />
      <h1 className={`dashboard-heading ${bodyClass}`}>
        {t("dashboard.heading")}
      </h1>
      <Grid className="dashboard-grid">
        <Row className="dashboard-row">
          {tiles.map(({ icon: Icon, label, route }) => (
            <Column key={route} lg={2} md={3} sm={12}>
              <ClickableTile
                className="dashboard-tile"
                onClick={route ? () => router.push(route) : undefined}
              >
                <Icon size={48} />
                <h3 className="dashboard-tile-text">{label}</h3>
              </ClickableTile>
            </Column>
          ))}
        </Row>
      </Grid>
    </div>
  );
}
