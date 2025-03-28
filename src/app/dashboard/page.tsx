"use client";

import { useRouter } from "next/navigation";
import {
  Grid,
  Row,
  Column,
  ClickableTile,
  Header,
  HeaderName,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from "@carbon/react";
import {
  Archive,
  TrashCan,
  FolderDetailsReference,
  Download,
  Folder,
} from "@carbon/icons-react";
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
import { useState } from "react";

export default function Dashboard() {
  const [isAwake, setIsAwake] = useState(true); // Manage theme mode state
  const router = useRouter();
  const headerClass = isAwake ? "header-awake" : "header-asleep";
  const bodyClass = isAwake ? "body-light" : "body-dark"; // Body class for light/dark mode

  const toggleMode = () => {
    setIsAwake(!isAwake);
  };

  return (
    <div className={`dashboard-container ${bodyClass}`}>
      <Header aria-label="IBM Platform Name" className={headerClass}>
        <HeaderName href="#" prefix="IBM" className="icons">
          IntelliSphere
        </HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="User Profile">
            {isAwake ? <NotificationFilled /> : <NotificationNew />}
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="User Contact">
            {isAwake ? <PhoneFilled /> : <Phone />}
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Settings">
            {isAwake ? <UserAvatarFilled /> : <UserAvatar />}
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Mode Toggle" onClick={toggleMode}>
            {isAwake ? <Awake /> : <AsleepFilled />}
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
      <h1 className={`dashboard-heading ${bodyClass}`}>
        Intellisphere Dashboard
      </h1>{" "}
      {/* Apply mode-specific class */}
      <Grid className="dashboard-grid">
        <Row className="dashboard-row">
          <Column lg={2} md={3} sm={12}>
            <ClickableTile
              className="dashboard-tile"
              onClick={() => router.push("/archive")}
            >
              <Archive size={48} />
              <h3 className="dashboard-tile-text">Archive</h3>
            </ClickableTile>
          </Column>
          <Column lg={2} md={3} sm={12}>
          
            <ClickableTile
              className="dashboard-tile"
              onClick={() => router.push("/redux-form")}
            >
              <TrashCan size={48} />
              <h3 className="dashboard-tile-text">Form</h3>
            </ClickableTile>
          
          </Column>
          <Column lg={2} md={3} sm={12}>
            <ClickableTile
              className="dashboard-tile"
              onClick={() => router.push("/shared")}
            >
              <FolderDetailsReference size={48} />
              <h3 className="dashboard-tile-text">Shared</h3>
            </ClickableTile>
          </Column>
          <Column lg={2} md={3} sm={12}>
            <ClickableTile className="dashboard-tile">
              <Download size={48} />
              <h3 className="dashboard-tile-text">Products</h3>
            </ClickableTile>
          </Column>
          <Column lg={2} md={3} sm={12}>
            <ClickableTile
              className="dashboard-tile"
              onClick={() => router.push("/products")}
            >
              <Folder size={48} />
              <h3 className="dashboard-tile-text">Browse</h3>
            </ClickableTile>
          </Column>
        </Row>
      </Grid>
    </div>
  );
}
