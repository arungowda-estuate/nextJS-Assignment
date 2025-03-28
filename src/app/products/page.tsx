"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Grid,
  Row,
  Column,
  Tile,
  HeaderGlobalAction,
  HeaderGlobalBar,
  Header,
  HeaderName,
  Button,
} from "@carbon/react";
import { useRouter } from "next/navigation";
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

const Browse = () => {
  const [isAwake, setIsAwake] = useState(true);
  const [products, setProducts] = useState<
    {
      id: number;
      thumbnail: string;
      title: string;
    }[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch data from the dummy JSON API
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleImageClick = (productId: number) => {
    router.push(`/products/${productId}`); // Navigate to the [id]/page.tsx page
  };

  const rows = [];
  for (let i = 0; i < products.length; i += 4) {
    rows.push(products.slice(i, i + 4));
  }

  const toggleMode = () => {
    setIsAwake(!isAwake);
  };

  useEffect(() => {
    if (isAwake) {
      document.body.setAttribute("data-theme", "light");
    } else {
      document.body.setAttribute("data-theme", "dark");
    }
  }, [isAwake]);

  const headerClass = isAwake ? "header-awake" : "header-asleep";

  return (
    <>
      <Header aria-label="IBM Platform Name" className={headerClass}>
        <HeaderName href="#" prefix="IBM" className="icons">
          IntelliSphere
        </HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="User Profile">
            {isAwake ? (
              <NotificationFilled />
            ) : (
              <NotificationNew className="icons" />
            )}
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="User Contact">
            {isAwake ? <PhoneFilled /> : <Phone className="icons" />}
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Settings">
            {isAwake ? <UserAvatarFilled /> : <UserAvatar className="icons" />}
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Mode Toggle" onClick={toggleMode}>
            {isAwake ? <Awake /> : <AsleepFilled />}
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>

      <div
        className={`products-container ${isAwake ? "body-light" : "body-dark"}`}
      >
        <Grid className="products-grid">
          <Row>
            <Column>
              <h1
                className={`products-heading ${
                  isAwake ? "body-light" : "body-dark"
                }`}
              >
                Browse Products
              </h1>
            </Column>
          </Row>
        </Grid>

        <Grid className="products-grid">
          {rows.map((row, rowIndex) => (
            <Row key={rowIndex} className="products-row">
              {row.map((product) => (
                <Column key={product.id} lg={3} md={4} sm={6}>
                  <Tile
                    className={`product-tile ${
                      isAwake ? "body-light" : "body-dark"
                    }`}
                    onClick={() => handleImageClick(product.id)}
                  >
                    <div className="product-image-container">
                      <Image
                        src={product.thumbnail}
                        alt={product.title}
                        className="product-image"
                        width={200}
                        height={200}
                        priority
                      />
                    </div>
                    <div className="product-title-container">
                      <h3
                        className={`product-title ${
                          isAwake ? "body-light" : "body-dark"
                        }`}
                      >
                        {product.title}
                      </h3>
                    </div>
                    <div className="product-button-container">
                      <Button kind="primary" className="product-button">
                        View Details
                      </Button>
                    </div>
                  </Tile>
                </Column>
              ))}
            </Row>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default Browse;
