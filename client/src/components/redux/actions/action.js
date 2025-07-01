export const getProducts = () => async (dispatch) => {
  try {
    const response = await fetch("https://amazon-clone-project-u1p8.onrender.com/getproducts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include",
    });

    const data = await response.json();

    if (response.ok) {
      dispatch({
        type: "SUCCESS_GET_PRODUCTS",
        payload: data,
      });
    } else {
      dispatch({
        type: "FAIL_GET_PRODUCTS",
        payload: { message: data.message || "Failed to fetch products." },
      });
    }
  } catch (error) {
    dispatch({
      type: "FAIL_GET_PRODUCTS",
      payload: { message: error.message || "Network Error" },
    });
  }
};
