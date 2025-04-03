"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Grid, Row, Column, Tile, Button } from "@carbon/react";
import { useRouter } from "next/navigation";

import AppHeader from "@/components/header";
import i18n from "@/i18n";

interface Product {
  id: number;
  thumbnail: string;
  title: string;
}

const Browse = () => {
  const [isAwake, setIsAwake] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [rows, setRows] = useState<Product[][]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const newRows: Product[][] = [];
    for (let i = 0; i < products.length; i += 4) {
      newRows.push(products.slice(i, i + 4));
    }
    setRows(newRows);
  }, [products]);

  const handleImageClick = (productId: number) => {
    router.push(`/dashboard/products/${productId}`);
  };

  const toggleMode = () => {
    setIsAwake(!isAwake);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", isAwake ? "light" : "dark");
  }, [isAwake]);

  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <>
      <AppHeader
        isAwake={isAwake}
        toggleMode={toggleMode}
        handleChangeLanguage={handleChangeLanguage}
      />
      <div className="main-div">
        <Grid className="products-grid">
          <Row>
            <Column>
              <h1
                className={`products-heading ${isAwake ? "body-light" : "body-dark"}`}
              >
                Browse Products
              </h1>
            </Column>
          </Row>
        </Grid>

        <Grid className="products-grid">
          {rows.map((row) => (

            <Row key={`row-${row[0]?.id}`} className="products-row">
              {row.map((product) => (
                <Column key={product.id} lg={3} md={4} sm={6}>
                  <Tile
                    className={`product-tile ${isAwake ? "body-light" : "body-dark"}`}
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
                      <h3 className={`product-title ${isAwake ? "body-light" : "body-dark"}`}>
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
