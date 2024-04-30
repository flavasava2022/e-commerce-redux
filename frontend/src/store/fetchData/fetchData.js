// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import axios from "axios";

// // Define a service using a base URL and expected endpoints
// export const productApi = createApi({
//   reducerPath: 'productApi',
//   baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
//   endpoints: (builder) => ({
//     getProductByName: builder.query({
//       query: (name) => `${name}`,
//     }),
//   }),
// })

// // Export hooks for usage in functional components, which are
// // auto-generated based on the defined endpoints
// export const { useGetProductByNameQuery } = productApi

export const addToBasket = async (name, price, description) => {
  const data = {
    name: name,
    description: description,
    userId:"4"
  };
  const jwt = localStorage.getItem("jwt");
  try {
    const response = await axios.post(
      "http://localhost:1337/api/carts",
      { data: data },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    // Handle success.

    console.log(response);
  } catch (error) {
    // Handle error.
    throw error;
  }
};
export const getBasketData = async () => {

  const jwt = localStorage.getItem("jwt");
  try {
    const response = await axios.get(
      "http://localhost:1337/api/carts?filters[userId][$eq]=4&populate=*",

      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    // Handle success.

    console.log(response);
  } catch (error) {
    // Handle error.
    throw error;
  }
};