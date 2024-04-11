import * as React from "react";
import "./Header.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import SwipeRightAltIcon from "@mui/icons-material/SwipeRightAlt";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useRef } from "react";
import { UserContext } from "./MyContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Header = () => {
  const [openc, setOpenc] = React.useState(false);
  const [openCheck, setopenCheck] = React.useState(false);
  const [openerror, setopenerror] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const [idd, setidd] = React.useState(0);
  const [name1, setname1] = React.useState();
  const [email1, setemail1] = React.useState();
  const [openorder, setOpenorder] = React.useState(false);
  const [flag, setflag] = React.useState("none");
  const [disabled, setdisabled] = React.useState(false);
  const [totalAmount, settotalAmount] = React.useState(0);
  const [errortext, seterrortext] = React.useState();

  const handleCloseorder = () => {
    setOpenorder(false);
    setopenerror(false);
  };
  // Empty cart popover
  const openempty = Boolean(anchorEl1);
  const handleClickEmpty = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleCloseEmpty = () => {
    setAnchorEl1(null);
  };

  const handleClickOpenCheck = () => {
    setopenCheck(true);
  };

  const handleCloseCheck = () => {
    setopenCheck(false);
  };
  const obj = useContext(UserContext);

  // Coupon Modal
  const handleClickOpen1 = () => {
    setOpenc(true);
  };

  const handleClose1 = () => {
    setOpenc(false);
  };

  // Cart open/ close
  const handleClickOpen = () => {
    obj.setOpen(true);
  };

  const handleClose = () => {
    obj.setOpen(false);
  };

  // Total Amount total,settotal
  React.useEffect(() => {
    var temp = 0;
    obj.cartItems.map((data) => (temp += parseInt(data.total)));
    settotalAmount(temp);
  }, [obj.cartItems]);

  // Applying Coupon
  const coupon = useRef("");
  const applyCoupon = () => {
    setOpenc(false);
    let span = document.getElementById("span");
    let code = coupon.current.firstChild.firstChild.value;
    if (code === obj.coupon) {
      settotalAmount((totalAmount * 50) / 100);
      setflag("block");
      setdisabled(true);
      span.innerHTML = "Coupon Applied successfullly";
    } else {
      setflag("block");
      span.innerHTML = "Coupon code not valid..";
    }
  };
  const iddel = useRef("");
  // Delete Items
  const deleteItems = () => {
    let id = parseInt(idd);
    const items = obj.cartItems.filter((i) => i.id !== id);
    obj.cartItems.map((i) => {
      if (i.id === id) {
        i.quantity = 1;
        i.total = i.quantity * i.price;
        obj.setCartitems([...items]);
      }
      return null;
    });
    setAnchorEl(null);
  };

  // Empty cart
  const emptyCart = () => {
    obj.cartItems.map((i) => {
      i.quantity = 1;
      obj.setCartitems([]);
      return null;
    });
    setAnchorEl1(null);
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    obj.cartItems.map((i) => {
      if (i.id === id) {
        if (i.quantity > 1) {
          i.quantity = i.quantity - 1;
          i.total = i.quantity * i.price;
          obj.setCartitems([...obj.cartItems]);
        }
      }
      return null;
    });
  };

  // Increase Quantity
  const increaseQuantity = (id) => {
    obj.cartItems.map((i) => {
      if (i.id === id) {
        i.quantity = i.quantity + 1;
        i.total = i.quantity * i.price;
        obj.setCartitems([...obj.cartItems]);
      }
      return null;
    });
  };

  // Delete Confirm
  const handleClickDel = (event) => {
    setidd(event.target.parentElement.id);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDel = () => {
    setAnchorEl(null);
  };
  const opendel = Boolean(anchorEl);
  const id = opendel ? "simple-popover" : undefined;

  // Place Order
  const name = useRef("");
  const email = useRef("");
  const address = useRef("");
  const mobile = useRef("");
  const placeOrder = () => {
    let n = name.current.firstChild.nextElementSibling.firstChild.value;
    let e = email.current.firstChild.nextElementSibling.firstChild.value;
    let m = mobile.current.firstChild.nextElementSibling.firstChild.value;
    let a = address.current.value;

    if (n === "" || e === "" || a === "" || m === "") {
      seterrortext("All fields are mandatory!, Please provide input");
      setopenerror(true);
    } else if (!isNaN(n)) {
      seterrortext("Please enter valid name!");
      setopenerror(true);
    } else if (!isNaN(a)) {
      seterrortext("Please enter valid address");
      setopenerror(true);
    } else if (a.length < 8) {
      seterrortext("Address should be of minimum 8 characters");
      setopenerror(true);
    } else {
      setemail1(e);
      setname1(n);
      setOpenorder(true);
      setopenCheck(false);
      obj.setOpen(false);
      obj.setCartitems([]);
    }
  };
  return (
    <>
      <div className="topnav">
        <a href="/">
          <img src="./logo.png" alt="logo" className="logo" />
        </a>
        <div className="header_item"></div>
        <div className="search-container">
          <Button>
            <Badge
              badgeContent={obj.cartItems.length}
              color="primary"
              onClick={handleClickOpen}
            >
              <ShoppingCartOutlinedIcon
                sx={{ fontSize: "5vh" }}
                onClick={handleClickOpen}
              />
            </Badge>
          </Button>
          <Dialog
            fullScreen
            open={obj.open}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <AppBar sx={{ position: "sticky", backgroundColor: "#D0AC56" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{
                    ml: 2,
                    flex: 1,
                    fontWeight: "bold",
                    color: "#411508",
                    fontSize: "3vh",
                  }}
                  variant="h6"
                  component="div"
                >
                  Your Cart Items
                </Typography>
                {/* Empty cart */}
                <Button
                  id="basic-button"
                  aria-controls={openempty ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openempty ? "true" : undefined}
                  onClick={handleClickEmpty}
                  sx={{
                    fontWeight: "bold",
                    marginRight: "5vw",
                    color: "#411508",
                    fontSize: "2vh",
                  }}
                >
                  <ClearAllIcon />
                  Empty Carty
                </Button>

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl1}
                  open={openempty}
                  onClose={handleCloseEmpty}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem>Do You want to clear all items?</MenuItem>
                  <MenuItem onClick={emptyCart}>Yes</MenuItem>
                  <MenuItem onClick={handleCloseEmpty}>No</MenuItem>
                </Menu>

                <Button
                  autoFocus
                  sx={{ color: "#411508", fontSize: "2vh" }}
                  onClick={handleClose}
                >
                  <HomeIcon />
                </Button>
              </Toolbar>
            </AppBar>
            {obj.cartItems.length === 0 ? (
              <>
                <div style={{ marginLeft: "55vh" }}>
                  <img
                    src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/110cdeba-5d07-4fe8-bc0d-91f2001e110f/decdgm2-ecc9b0c0-c8f1-4c30-b1ff-1d31e6dcf94c.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzExMGNkZWJhLTVkMDctNGZlOC1iYzBkLTkxZjIwMDFlMTEwZlwvZGVjZGdtMi1lY2M5YjBjMC1jOGYxLTRjMzAtYjFmZi0xZDMxZTZkY2Y5NGMuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.aJfS2IOjJjjYv9iSctlbLOdqvjhcllGsSzLdbUqnGqI"
                    alt="Avatar"
                    style={{ width: "40vw" }}
                  />
                </div>
                <h1
                  style={{
                    textAlign: "center",
                    color: "#F89703",
                    fontSize: "4vh",
                  }}
                >
                  <i>Your Cart is Empty..</i>
                </h1>
              </>
            ) : (
              <List>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", fontSize: "2vh" }}>
                          ID
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", fontSize: "2vh" }}>
                          Image
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", fontSize: "2vh" }}>
                          Name
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", fontSize: "2vh" }}>
                          Price
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            fontSize: "2vh",
                            paddingLeft: "3%",
                          }}
                        >
                          Quantity
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", fontSize: "2vh" }}>
                          Total
                        </TableCell>
                        <TableCell sx={{ fontWeight: "bold", fontSize: "2vh" }}>
                          Delete
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {obj.cartItems.map((row, index) => {
                        var a = row.id;
                        return (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                            ref={iddel}
                            id={row.id}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{ fontSize: "2vh" }}
                            >
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              <img
                                src={row.image}
                                alt="img"
                                style={{ width: "10vh" }}
                              />
                            </TableCell>
                            <TableCell sx={{ fontSize: "2vh" }}>
                              {row.name}
                            </TableCell>
                            <TableCell sx={{ fontSize: "2vh" }}>
                              &#8377; {row.price}
                            </TableCell>
                            <TableCell sx={{ fontSize: "2vh" }}>
                              <Button onClick={() => decreaseQuantity(row.id)}>
                                <RemoveIcon />
                              </Button>
                              {row.quantity}
                              <Button onClick={() => increaseQuantity(row.id)}>
                                <AddIcon />
                              </Button>
                            </TableCell>
                            <TableCell sx={{ fontSize: "2vh" }}>
                              &#8377; {row.total}
                            </TableCell>
                            <TableCell>
                              <Button
                                aria-describedby={id}
                                onClick={handleClickDel}
                                id={a}
                              >
                                <DeleteIcon id={a} />
                              </Button>
                              {/* Delete single items */}
                              <Popover
                                open={opendel}
                                anchorEl={anchorEl}
                                onClose={handleCloseDel}
                                anchorOrigin={{
                                  vertical: "bottom",
                                }}
                              >
                                <Button
                                  onClick={deleteItems}
                                  sx={{ fontSize: "2vh" }}
                                >
                                  Delete
                                </Button>
                                <Button
                                  onClick={handleCloseDel}
                                  sx={{ fontSize: "2vh" }}
                                >
                                  Cancel
                                </Button>
                              </Popover>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Typography
                  sx={{
                    fontWeight: "bold",
                    marginTop: "2vh",
                    marginLeft: "2vw",
                    fontSize: "2vh",
                  }}
                >
                  Have Discount Coupon *?{" "}
                  <span
                    id="span"
                    style={{ color: "red", display: flag }}
                  ></span>
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleClickOpen1}
                  sx={{
                    fontWeight: "bold",
                    marginLeft: "2vw",
                    backgroundColor: "#6B8E23",
                    color: "white",
                    fontSize: "2vh",
                  }}
                  disabled={disabled}
                >
                  Apply
                </Button>
                <Dialog open={openc} onClose={handleClose1}>
                  <DialogTitle sx={{ fontSize: "2vh" }}>
                    Enter Coupon Code..
                  </DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      ref={coupon}
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose1} sx={{ fontSize: "2vh" }}>
                      Cancel
                    </Button>
                    <Button onClick={applyCoupon} sx={{ fontSize: "2vh" }}>
                      Apply
                    </Button>
                  </DialogActions>
                </Dialog>
                {/* Checkout dialog */}
                <Button
                  sx={{
                    float: "right",
                    marginRight: "4vw",
                    marginTop: "1vh",
                    backgroundColor: "#6B8E23",
                    fontSize: "2vh",
                  }}
                  variant="contained"
                  onClick={handleClickOpenCheck}
                >
                  Proceed to Checkout
                </Button>
                <Typography
                  sx={{
                    float: "right",
                    marginRight: "2vw",
                    marginTop: "1vh",
                    fontSize: "3vh",
                  }}
                >
                  Total: &#8377; {totalAmount}
                </Typography>
                <Dialog
                  fullWidth="fullWidth"
                  maxWidth="15vw"
                  open={openCheck}
                  onClose={handleClose}
                >
                  <DialogTitle
                    sx={{
                      backgroundColor: "#D0AC56",
                      textAlign: "center",
                      fontSize: "3vh",
                    }}
                  >
                    Confirm Your Order and checkout!
                    <Button
                      onClick={handleCloseCheck}
                      sx={{ fontSize: "3vh", float: "right", color: "black" }}
                    >
                      X
                    </Button>
                  </DialogTitle>
                  <DialogContent>
                    <TableContainer
                      component={Paper}
                      sx={{ backgroundColor: "whitesmoke" }}
                    >
                      <Table
                        sx={{ minWidth: 650, backgroundColor: "whitesmoke" }}
                        aria-label="simple table"
                      >
                        <TableHead sx={{ backgroundColor: "whitesmoke" }}>
                          <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>

                            <TableCell
                              sx={{ fontWeight: "bold", fontSize: "2vh" }}
                            >
                              Name
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: "bold", fontSize: "2vh" }}
                            >
                              Price
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: "bold", fontSize: "2vh" }}
                            >
                              Quantity
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: "bold", fontSize: "2vh" }}
                            >
                              Total
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {obj.cartItems.map((row, index) => (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {index + 1}
                              </TableCell>

                              <TableCell sx={{ fontSize: "2vh" }}>
                                {row.name}
                              </TableCell>
                              <TableCell sx={{ fontSize: "2vh" }}>
                                &#8377; {row.price}
                              </TableCell>
                              <TableCell sx={{ fontSize: "2vh" }}>
                                {row.quantity}
                              </TableCell>
                              <TableCell sx={{ fontSize: "2vh" }}>
                                &#8377; {row.total}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <h2 style={{ float: "right" }}>
                        Total Amount to Pay :{totalAmount}
                      </h2>
                    </TableContainer>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      <SwipeRightAltIcon
                        sx={{ paddingTop: "1%", fontSize: "3vh" }}
                      />{" "}
                      Enter Your Following Details:
                    </Typography>

                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableBody>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <TextField
                                ref={name}
                                id="name"
                                label="Name"
                                variant="filled"
                                required
                              />
                            </TableCell>
                            <TableCell component="th" scope="row">
                              <TextField
                                ref={email}
                                type="email"
                                id="email"
                                label="Email"
                                variant="filled"
                              />
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              <TextField
                                type="number"
                                ref={mobile}
                                id="mobile"
                                label="Mobile Number"
                                variant="filled"
                              />
                            </TableCell>
                            <TableCell component="th" scope="row">
                              <TextareaAutosize
                                ref={address}
                                aria-label="address"
                                placeholder="Address"
                                style={{ width: 200, padding: "2vw" }}
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Button
                      variant="contained"
                      sx={{
                        textAlign: "center",
                        backgroundColor: "#D0AC56",
                        fontSize: "2vh",
                        fontWeight: "bold",
                        color: "black",
                        marginTop: "1%",
                        float: "right",
                      }}
                      onClick={placeOrder}
                    >
                      Place Your Order
                    </Button>
                    <Box
                      noValidate
                      component="form"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        m: "auto",
                        width: "fit-content",
                      }}
                    ></Box>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseCheck} sx={{ fontSize: "2vh" }}>
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              </List>
            )}
          </Dialog>

          <Button>
            <HomeIcon sx={{ fontSize: "5vh" }} />
          </Button>
        </div>
      </div>
      <div>
        <img src="./Sweets.jpg" alt="logo" style={{ width: "100%" }} />
      </div>
      {/* Place order Modal */}
      <Modal
        open={openorder}
        onClose={handleCloseorder}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontSize: "2vh" }}
          >
            <h2 style={{ textDecoration: "underline" }}>Order Confirmation:</h2>
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, fontSize: "2vh" }}
          >
            <h3 sx={{ fontSize: "2vh" }}>Name : {name1}</h3>
            <h3 sx={{ fontSize: "2vh" }}>Email : {email1}</h3>
            Thank You ,Your order Has been placed!
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openerror}
        onClose={handleCloseorder}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, fontSize: "2vh" }}
          >
            <h5 sx={{ fontSize: "2vh" }}>{errortext}</h5>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
export default Header;
//
