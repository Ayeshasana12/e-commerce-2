import {
  Box,
  Card,
  CircularProgress,
  Divider,
  Grid,
  Snackbar,
  SnackbarContent, 
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "./AllProduct.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Visibility from '@mui/icons-material/Visibility';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AllProduct() {
  const [cartList, setCartList] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  console.log(isLoading, "isLoading");


  const cartHandler = (product) => {
    const isExist = cartList.find((cart) => cart.id === product.id);
    if (!isExist) {
      setCartList((prev) => [...prev, product]);
    } else {
      setOpenAlert(true);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };
  const searchHandler = (event) => {
    if (event.target.value === "") {
    } else {
      const filteredArr = products?.filter((product) =>
        product?.name.toLowerCase().includes(event?.target?.value.toLowerCase()));

      setProducts(filteredArr);
      console.log(filteredArr);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const products = await axios.get("https://fakestoreapi.com/products");

        if (products.status === 200) {
          setIsLoading(false);
          setProducts(products?.data);
        } else {
          setIsLoading(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);


  return (
    <>
  
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        
        <SnackbarContent
          style={{
            backgroundColor: "#bb2124",
          }}
          message={
            <Box>
              <span id="client-snackbar">Product Already Added to Cart List</span>
              <CloseIcon className="ms-5" onClick={handleClose} />
            </Box>
          }
        />
      </Snackbar>
      {isLoading ? (
        <Box className="text-center mt-5">
          <CircularProgress color="inherit" />
        </Box>
      ) : <Grid container className="container mt-5 ">
        {products?.map((product) => (
          <Grid item xs={12} md={3} mb={2}>
            <Card className=" shadow" key={product.id} sx={{ padding: "20px ", 
              width: "250px", border: "1px solid #0AAD0A"  }}>
              <Box>
                <Box className="text-center">
                  <img
                    style={{ maxHeight: "140px", minHeight: "140px" }}
                    className="product-img products" width={100}
                    src={product.image} alt={product.name} />
                </Box>
                <Tooltip title={product?.title} placement="top">
                  <Typography className="mt-3 fw-semibold" variant="body1">
                    {product?.title?.length
                      >= 22 ? `${product?.title?.slice(0, 18)}...`
                      : product?.title}
                  </Typography>
                  
                </Tooltip>
                <Divider className="mt-2 " sx={{ borderColor: "#0AAD0A" }}
                 variant="fullWidth" />
                <Box className="d-flex justify-content-between mt-2">
                  <Tooltip title="product details">
                    <Visibility sx={{color: "#0AAD0A"}} on onClick={()=>{
                      navigate(`/product-details/${product?.id}`)}} />
                  </Tooltip >
                  <Tooltip title="Add To Favorite">
                    <FavoriteIcon sx={{color: "#0AAD0A"}} />
                  </Tooltip>
                  <Tooltip title="Add To Cart">
                    <AddShoppingCartIcon sx={{color: "#0AAD0A"}} onClick={() => cartHandler(product)} />
                  </Tooltip>
                </Box>
              </Box>
            </Card>
          </Grid>
        )
        )};

      </Grid>}
    </>
  );
}

export default AllProduct;











