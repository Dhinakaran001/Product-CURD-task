import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts } from "../redux/products/productsAction";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Typography,
  Grid2,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Box,
  Chip,
  IconButton,
  Button,
  Modal,
  Icon,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import StarIcon from "@mui/icons-material/Star";
import Loading from "../layout/Loading";
import { toast } from "react-toastify";

const noImage =
  "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg";

function Products() {
  const { productsList, isProductsLoading, productsError } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("productsList", productsList);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const handleOpen = (id, name) => {
    setOpen(true);
    setSelectedId(id);
    setSelectedName(name);
  };
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    try {
      dispatch(deleteProduct(selectedId));
      toast.success("Product Deleted succesfully");
      handleClose();
    } catch (error) {
      toast.error("Product Deleted failed");
    }
  };

  const handleCreate = () => {
    navigate("/product/create");
  };
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Box sx={{ p: { xs: "10px 10px 60px 10px", sm: "0px 0px 100px 0xp" } }}>
      {isProductsLoading && <Loading />}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" sx={{ py: 3 }}>
          Products
        </Typography>
        <Box sx={{ my: "auto" }}>
          <Button
            variant="contained"
            sx={{
              background: `linear-gradient(to right, #f12711, #f5af19)`,
            }}
            onClick={handleCreate}
          >
            Create product
          </Button>
        </Box>
      </Box>
      <Grid2 container spacing={2}>
        {productsList.length > 0 &&
          productsList?.map((item, index) => (
            <Grid2 item size={{ xs: 12, sm: 4 }} sx={{ mt: 2 }} key={index}>
              <Card className="menuCard" sx={{ position: "relative" }}>
                <Chip
                  sx={{
                    fontSize: "1.3rem",
                    position: "absolute",
                    border: "none",
                    zIndex: 10,
                    left: 0,
                  }}
                  variant="outlined"
                  icon={<StarIcon style={{ color: "#ffcf3f" }} />}
                />
                {item?.image ? (
                  <Box
                    className="menu_Card_Media"
                    sx={{
                      overflow: "hidden",
                      height: 270,
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      className="menu_CardMedia_img"
                      src={item?.image}
                      height={"100%"}
                      alt={item?.product}
                      style={{ transition: "0.7s" }}
                    />
                  </Box>
                ) : (
                  <Box className="menu_Card_Media" sx={{ overflow: "hidden" }}>
                    <CardMedia
                      className="menu_CardMedia_img"
                      component="img"
                      image={noImage}
                      alt={"No Image Found"}
                      sx={{ transition: "0.7s" }}
                    />
                  </Box>
                )}
                <CardContent style={{ backgroundColor: "#f5f6fb" }}>
                  <Typography align="center" variant="h6">
                    {item?.product}
                  </Typography>
                  <Typography align="center" color={"#ffcf3f"} fontWeight={600}>
                    &#8377; {item?.price}
                  </Typography>
                </CardContent>
                <CardActions
                  style={{ backgroundColor: "#f5f6fb" }}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <NavLink
                    to={`/product/${item?.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <IconButton color="secondary">
                      <EditIcon />
                    </IconButton>
                  </NavLink>
                  <IconButton
                    color="error"
                    onClick={() => handleOpen(item?.id, item?.product)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid2>
          ))}
      </Grid2>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            width: { xs: "80%", sm: "auto" },
            boxShadow: 24,
            p: { xs: 1, sm: 4 },
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <DeleteOutlineIcon color="error" sx={{ fontSize: 80 }} />
          </Box>

          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
            sx={{ my: 1 }}
          >
            Are you sure you want delete this {selectedName} product?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button onClick={handleClose} variant="contained">
              No
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default Products;
