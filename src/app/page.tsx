"use client"
import { useTranslation } from "react-i18next";
import {
  Button,
  Column,
  Grid,
  Modal,
  Row,
  TextInput,
  Tile,
} from "@carbon/react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/components/header";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [isAwake, setIsAwake] = useState(true);
  const router = useRouter();

  const handleChangeLanguage = useCallback(
    (language: string) => i18n.changeLanguage(language),
    [i18n]
  );

  const toggleMode = useCallback(() => {
    setIsAwake((prev) => !prev);
  }, []);

  const handleOnSubmit = useCallback(
    (values: { Username: string; Password: string }) => {
      console.log("Submitted values:", values);
      setModalOpen(true);
      setTimeout(() => {
        setModalOpen(false);
        router.push("/dashboard");
      }, 1000);
    },
    [router]
  );

  const validationSchema = Yup.object({
    Username: Yup.string().required(t("Username is required")),
    Password: Yup.string()
      .min(6, t("Password must contain at least 6 characters"))
      .required(t("Password is required")),
  });

  useEffect(() => {
    document.body.setAttribute("data-theme", isAwake ? "light" : "dark");
  }, [isAwake]);

  return (
    <>
      <AppHeader
        isAwake={isAwake}
        toggleMode={toggleMode}
        handleChangeLanguage={handleChangeLanguage}
      />
      <Grid fullWidth className="login-grid">
        <Row>
          <Column lg={6} md={8} sm={12}>
            <Tile className="login-tile">
              <h1 id="form-heading">{t("Welcome to Intellisphere")}</h1>
              <Formik
                initialValues={{ Username: "", Password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleOnSubmit}
              >
                {({ errors, touched, handleChange, handleBlur, values }) => (
                  <Form className="form">
                    <TextInput
                      id="username-input"
                      name="Username"
                      labelText={t("Username")}
                      placeholder={t("Enter your username")}
                      value={values.Username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={touched.Username && !!errors.Username}
                      invalidText={errors.Username}
                      size="lg"
                    />
                    <TextInput
                      id="password-input"
                      name="Password"
                      labelText={t("Password")}
                      placeholder={t("Enter your password")}
                      type="password"
                      value={values.Password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={touched.Password && !!errors.Password}
                      invalidText={errors.Password}
                      size="lg"
                    />
                    <Button type="submit" size="md" className="login-button">
                      {t("Login")}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Tile>
          </Column>
        </Row>
        <Modal open={modalOpen} modalHeading={t("Success")} passiveModal>
          <p>{t("Hi {{username}}, your login was successful.")}</p>
        </Modal>
      </Grid>
    </>
  );
}
