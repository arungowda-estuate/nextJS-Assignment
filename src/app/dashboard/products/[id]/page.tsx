"use client";
import  { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { Grid, Row, Column, Button, Loading } from "@carbon/react";
import AppHeader from "@/components/header";
import i18n from "@/i18n";

interface Product {
  thumbnail: string;
  title: string;
  description: string;
  price: number;
  category: string;
}

export default function ProductDetails() {
  const [isAwake, setIsAwake] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const toggleMode = () => {
    setIsAwake((prev) => !prev);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", isAwake ? "light" : "dark");
  }, [isAwake]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  const handleChangeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  if (loading) {
    return (
      <Loading description="Loading product details..." withOverlay={false} />
    );
  }

  if (!product) {
    return (
      <div>
        <p>Product not found.</p>
        <Button
          kind="secondary"
          onClick={() => router.push("/dashboard/products")}
        >
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <>
      <AppHeader
        isAwake={isAwake}
        toggleMode={toggleMode}
        handleChangeLanguage={handleChangeLanguage}
      />

      <div className="grid-div">
        <Grid className="product-details-container">
          <Row className="product-details-row">
            <Column lg={6} md={6} sm={12} className="product-details-left">
              <div className="product-tile">
                <div className="product-image-wrapper">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-details-image"
                    width={400}
                    height={400}
                    priority
                  />
                </div>
              </div>
            </Column>
            <Column lg={6} md={6} sm={12} className="product-details-right">
              <div className="product-tile">
                <div className="product-details-content">
                  <h1 className="product-details-title">{product.title}</h1>
                  <p className="product-details-description">
                    {product.description}
                  </p>
                  <p className="product-details-price">
                    Price: ${product.price}
                  </p>
                  <p className="product-details-category">
                    Category: {product.category}
                  </p>
                </div>
              </div>
            </Column>
          </Row>
        </Grid>

        <div className="back-to-products-button">
          <Button
            kind="secondary"
            onClick={() => router.push("/dashboard/products")}
          >
            Back to Products
          </Button>
        </div>
      </div>
    </>
  );
}
