import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid2,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "../layout/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  fetchSingleProduct,
} from "../redux/products/productsAction";
import { toast } from "react-toastify";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

function UpdateProduct() {
  const { productsList, isProductsLoading, productsError } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [product, setProduct] = useState({
    product: "",
    category: "",
    price: 0,
    quantity: "",
    description: "",
    stock: 0,
  });

  useEffect(() => {
    dispatch(fetchSingleProduct(params.id)).then((res) => {
      console.log("res", res);
      setProduct({
        ...product,
        product: res?.payload?.product,
        category: res?.payload?.category,
        price: res?.payload?.price,
        quantity: res?.payload?.quantity,
        description: res?.payload?.description,
        stock: res?.payload?.stock,
      });
      setPreview(res?.payload?.image);
      setImage(res?.payload?.image);
    });
  }, [dispatch]);

  // Handle file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // image delete handler
  const handleDestroy = async (e) => {
    setImage(null);
    setPreview(null);
  };

  const readValue = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Image doesn't exists.");

    const data = { id: params.id, data: { ...product, image } };
    try {
      dispatch(editProduct(data));
      toast.success("Product Updated succesfully");
      navigate("/products");
    } catch (error) {
      toast.error("Product Updated failed");
    }
  };
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container sx={{ pt: "50px", pb: "100px" }}>
      {isProductsLoading && <Loading />}
      <Button
        onClick={handleBack}
        variant="outlined"
        startIcon={<KeyboardArrowLeftIcon />}
      >
        Go Back
      </Button>
      <Typography variant="h4" align="center" sx={{ py: 3 }}>
        Update Product
      </Typography>
      <Grid2 container spacing={3}>
        <Grid2 item size={{ xs: 12, sm: 6 }}>
          <Card>
            <CardContent>
              <TextField
                variant="filled"
                type="file"
                name="productImg"
                onChange={handleImageChange}
                required
                style={{
                  border: "2px solid #726f6f",
                  padding: "10px",
                  borderRadius: "5px",
                  width: "90%",
                }}
              />
            </CardContent>
            {image !== null && (
              <CardActions>
                <Box>
                  <img
                    src={preview !== null ? preview : ""}
                    width={"100%"}
                    alt=""
                  />
                  <Box onClick={handleDestroy}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#f4474a",
                        ":hover": { backgroundColor: "#f4474a" },
                      }}
                      endIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              </CardActions>
            )}
          </Card>
        </Grid2>
        <Grid2 item size={{ xs: 12, sm: 6 }}>
          <Card>
            <CardContent>
              <Box component={"form"} onSubmit={submitHandler}>
                <TextField
                  variant="outlined"
                  fullWidth
                  type="text"
                  name="product"
                  id="title"
                  value={product.product}
                  onChange={readValue}
                  required
                  label="Title"
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  type="number"
                  name="price"
                  id="price"
                  value={product.price}
                  onChange={readValue}
                  required
                  label="Price"
                  sx={{ marginTop: 2 }}
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  type="text"
                  name="description"
                  id="desc"
                  value={product.description}
                  onChange={readValue}
                  required
                  label="Dish"
                  sx={{ marginTop: 2 }}
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  type="text"
                  name="quantity"
                  id="qnty"
                  value={product.quantity}
                  onChange={readValue}
                  required
                  label="Quantity"
                  sx={{ marginTop: 2 }}
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  type="number"
                  name="stock"
                  id="stock"
                  value={product.stock}
                  onChange={readValue}
                  required
                  label="Stock"
                  sx={{ marginTop: 2 }}
                />
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    marginTop: 2,
                    background: `linear-gradient(to right, #f12711, #f5af19)`,
                  }}
                >
                  Update
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default UpdateProduct;
