// "use client";

// // import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { useRouter, useParams } from "next/navigation";
// import { Grid, Row, Column, Button, Loading, Tile, Header, HeaderGlobalBar, HeaderName, HeaderGlobalAction } from "@carbon/react";
// import { AsleepFilled, Awake, NotificationFilled, NotificationNew, Phone, PhoneFilled, UserAvatar, UserAvatarFilled } from "@carbon/icons-react";
// import { useEffect, useState } from "react";


// export default function ProductDetails() {
//   interface Product {
//     thumbnail: string;
//     title: string;
//     description: string;
//     price: number;
//     category: string;
//   }

//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [isAwake, setIsAwake] = useState(true);
//   const router = useRouter();
//   const { id } = useParams();

//   useEffect(() => {

    
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`https://dummyjson.com/products/${id}`);
//         const data = await response.json();
//         setProduct(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (loading) {
//     return <Loading description="Loading product details..." />;
//   }

//   if (!product) {
//     return <p>Product not found.</p>;
//   }
//    const toggleMode = () => {
//       setIsAwake(!isAwake);
//     };
  


//   const headerClass = isAwake ? "header-awake" : "header-asleep";

//   useEffect(() => {
//     if (isAwake) {
//       document.body.setAttribute("data-theme", "light");
//     } else {
//       document.body.setAttribute("data-theme", "dark");
//     }
//   }, [isAwake]);

//   return (
//     <><Header aria-label="IBM Platform Name" className={headerClass}>
//     <HeaderName href="#" prefix="IBM" className="icons">
//       IntelliSphere
//     </HeaderName>
//     <HeaderGlobalBar>
//       <HeaderGlobalAction aria-label="User Profile">
//         {isAwake ? (
//           <NotificationFilled />
//         ) : (
//           <NotificationNew className="icons" />
//         )}
//       </HeaderGlobalAction>
//       <HeaderGlobalAction aria-label="User Contact">
//         {isAwake ? <PhoneFilled /> : <Phone className="icons" />}
//       </HeaderGlobalAction>
//       <HeaderGlobalAction aria-label="Settings">
//         {isAwake ? <UserAvatarFilled /> : <UserAvatar className="icons" />}
//       </HeaderGlobalAction>
//       <HeaderGlobalAction aria-label="Mode Toggle" onClick={toggleMode}>
//         {isAwake ? <Awake /> : <AsleepFilled />}
//       </HeaderGlobalAction>
//     </HeaderGlobalBar>
//   </Header>
    
//     <div className="product-details-container">
//       <Grid>
//         <Row className="product-details-row">
//           <Column lg={6} md={6} sm={12} className="product-details-left">
//             <Tile>
//               <div className="product-image-wrapper">
//                 <Image
//                   src={product.thumbnail}
//                   alt={product.title}
//                   className="product-details-image"
//                   width={500}
//                   height={500}
//                   priority
//                 />
//               </div>
//             </Tile>
//           </Column>
//           <Column lg={6} md={6} sm={12} className="product-details-right">
//             <Tile>
//               <div className="product-details-content">
//                 <h1 className="product-details-title">{product.title}</h1>
//                 <p className="product-details-description">{product.description}</p>
//                 <p className="product-details-price">Price: ${product.price}</p>
//                 <p className="product-details-category">
//                   Category: {product.category}
//                 </p>
//               </div>
//             </Tile>
//           </Column>
//         </Row>
//         <Row>
//           <Column lg={12} md={12} sm={12} className="back-to-products-button">
//             <Button kind="secondary" onClick={() => router.push("/products")}>
//               Back to Products
//             </Button>
//           </Column>
//         </Row>
//       </Grid>
//     </div>
//     </>
//   );
// }




"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { Grid, Row, Column, Button, Loading, Header, HeaderGlobalBar, HeaderName, HeaderGlobalAction, Dropdown } from "@carbon/react";
import { AsleepFilled, Awake, NotificationFilled, NotificationNew, Phone, PhoneFilled, UserAvatar, UserAvatarFilled } from "@carbon/icons-react";

export default function ProductDetails() {
  interface Product {
    thumbnail: string;
    title: string;
    description: string;
    price: number;
    category: string;
  }

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAwake, setIsAwake] = useState(true);
  const [selectedOption, setSelectedOption] = useState<string>('English'); // Toggles between light and dark mode
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const handleSelection = (selectedItem: { text: string }) => {
    setSelectedOption(selectedItem.text); // Update the selected option text
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    };

    fetchProduct();

    // Apply the theme to the entire page
    if (isAwake) {
      document.body.setAttribute("data-theme", "light");
    } else {
      document.body.setAttribute("data-theme", "dark");
    }
  }, [id, isAwake]);

  const toggleMode = () => {
    setIsAwake(!isAwake);
  };

  if (loading) {
    return <Loading description="Loading product details..." />;
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <>
      <Header aria-label="IBM Platform Name" className={isAwake ? "header-light" : "header-dark"}>
      <HeaderName href="#" prefix="IBM" className="icons">
        IntelliSphere
      </HeaderName>
      <HeaderGlobalBar>
        <HeaderGlobalAction aria-label="Dropdown" className="dropdown-language">
          <div>
            {/* Dropdown for changing the text */}
            <Dropdown
                id="default"
                invalidText="invalid selection"
                items={[
                  { text: 'English' },
                  { text: 'Option 1' },
                  { text: 'Option 2' }
                  
                ]}
                label={selectedOption}
                type="default"
                warnText="Please notice the warning"
                // titleText={selectedOption} // Show the selected option in the title text
                onChange={({ selectedItem }) => handleSelection(selectedItem)} // Update the selected option on change
                style={{ width: '100px' }} // Custom width for dropdown
                titleText=""            />
          </div>
        </HeaderGlobalAction>

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

      <div className="grid-div">
        <Grid className="product-details-container">
          <Row className="product-details-row">
            <Column lg={6} md={6} sm={6} className="product-details-left">
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
          </Row>
          <Row className="product-details-row">
            <Column lg={12} md={12} sm={12} className="product-details-right">
              <div className="product-tile">
                <div className="product-details-content">
                  <h1 className="product-details-title">{product.title}</h1>
                  <p className="product-details-description">{product.description}</p>
                  <p className="product-details-price">Price: ${product.price}</p>
                  <p className="product-details-category">Category: {product.category}</p>
                </div>
              </div>
            </Column>
          </Row>
        </Grid>

        <div className="back-to-products-button">
          <Button kind="secondary" onClick={() => router.push("/products")}>
            Back to Products
          </Button>
        </div>
      </div>
    </>
  );
}





