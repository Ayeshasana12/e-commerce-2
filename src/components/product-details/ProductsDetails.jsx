import { Autocomplete, Box, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import "../../components/product-details/ProductsDetails.css"

const ProductsDetails = () => {
  const [productsDetails, setProductsDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const param = useParams();
  console.log(productsDetails, 'productsDetails');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const products = await
          axios.get(`https://fakestoreapi.com/products/${param?.product_id}`);

        if (products.status === 200) {
          setIsLoading(false);
          setProductsDetails(products?.data);
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
      {isLoading ? (
        <Box className="text-center mt-5">
          <CircularProgress color="inherit" />
        </Box>
        
      ) :
      
        <Grid container className='container  my-5 
        
        d-flex justify-content-center'>
          
          <Grid item md={6}>
            {
              <Box className='mt-2' >
                <img style={{border: "1px solid #0AAD0A", cursor: "pointer"}}
                 className=' p-5 rounded-4 shadow products mt-5'
                width={"320px"} height={"360px"} src={productsDetails?.image} alt="" />
              </Box>
            }
          </Grid>
          <Grid item md={6} className='text-center mt-5 ' >
            <Typography style={{cursor: "pointer"}} variant='h3'
            className='fw-semibold' sx={{color: "#0AAD0A"}}>
              {productsDetails?.category}</Typography>
              <Typography style={{cursor: "pointer"}} variant='h5'
               className='pt-2 fw-semibold text-color'>
                <span className='mx-3'>Price:</span>
              {productsDetails?.price}</Typography>
            <Typography style={{cursor: "pointer"}} variant='h5'
             className='pt-3 fw-semibold text-color'>
              {productsDetails?.title}</Typography> 
              <Typography variant='body2' className='pt-3 fw-semibold text-color'>
              {productsDetails?.description}</Typography>
              <Box>
              <Button style={{backgroundColor: "#0AAD0A"}}
               className='fw-semibold text- mt-3 mx-3 w-50' variant="contained">Order Now</Button>
               <Button style={{backgroundColor: "#695A3B"}}
               className='fw-semibold text- mt-3 ' variant="contained">Contact Me!</Button>
              </Box>
            
              
          </Grid>

        </Grid>}
    </>
  )
}

export default ProductsDetails;