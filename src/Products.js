import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import data from "./Data";
import { useContext } from "react";
import { UserContext } from "./MyContext";
import "./Products.css";

const Products = () => {
  const [open, setOpen] = React.useState(false);
  const [items, setitmes] = React.useState([]);
  const [src, setsrc] = React.useState();
  const obj = useContext(UserContext);

  const handleClickOpen = (event) => {
    setsrc(event.target.id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen1 = () => {
    obj.setOpen(true);
  };

  // Add to Cart
  const addToCart = (event) => {
    let event1 = event.target;
    let id = parseInt(event.target.id);
    var flag = false;
    obj.cartItems.map((i) => {
      if (i.id === id) {
        flag = true;
      }
      return null;
    });
    if (flag === true) {
      event1.style.display = "block";
      event1.innerHTML = "Added";
      event1.parentElement.firstChild.style = "block";
      data.map((i) => {
        if (i.id === id) {
          i.quantity = i.quantity + 1;
          i.total = i.quantity * i.price;
          obj.setCartitems([...obj.cartItems]);
        }
        return null;
      });
      const intervalID = setTimeout(() => {
        event1.innerHTML = "Add to Cart";
        event1.parentElement.firstChild.style.display = "none";
      }, 400);
      return () => clearInterval(intervalID);
    } else {
      data.map((i) => {
        if (i.id === id) {
          obj.setCartitems([...obj.cartItems, i]);
          event1.style.display = "block";
          event1.innerHTML = "Added";
          event1.parentElement.firstChild.style = "block";

          const intervalID = setTimeout(() => {
            event1.innerHTML = "Add to Cart";
            event1.parentElement.firstChild.style.display = "none";
          }, 400);
          return () => clearInterval(intervalID);
        }
        return null;
      });
    }
  };

  // Search Items
  const searchItems = () => {
    var text = document.getElementById("text").value;
    let txt = text.toLowerCase();
    var temp = [];
    data.map((i) => {
      var name = i.name.toLowerCase();
      if (name.includes(txt)) {
        temp.push(i);
        setitmes(temp);
      }
      return null;
    });
  };

  // Search by Low-High-Rating
  const selectbylowhighrating = (event) => {
    console.log(items);
    let text = event.target.value;
    if (text === "low") {
      var low = data.sort(function (a, b) {
        return a.price - b.price;
      });
      setitmes([...low]);
    } else if (text === "high") {
      var high = data.sort(function (a, b) {
        return b.price - a.price;
      });
      setitmes([...high]);
    } else if (text === "rating") {
      var rating = data.sort(function (a, b) {
        return b.rating - a.rating;
      });
      setitmes([...rating]);
    }
  };

  // Select from Category
  const selectfromcategory = (event) => {
    let category = event.target.value;
    var temp = [];
    if (category !== "all") {
      data.map((i) => {
        var name = i.name.toLowerCase();
        if (name.includes(category)) {
          temp.push(i);
          setitmes(temp);
        }
        return null;
      });
    } else {
      setitmes(data);
    }
  };
  React.useEffect(() => {
    setitmes([...data]);
  }, []);

  return (
    <>
      <div className="searchBar">
        <FormControl variant="standard" sx={{ minWidth: 250 }}>
          <InputLabel
            id="demo-simple-select-standard-label"
            sx={{ fontWeight: "bold", color: "#411508", fontSize: "2vw" }}
          >
            Select from Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={selectfromcategory}
            label="Category"
          >
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"ladoo"}>Ladoo</MenuItem>
            <MenuItem value={"burfi"}>Burfi</MenuItem>
            <MenuItem value={"peda"}>Peda</MenuItem>
            <MenuItem value={"gujiya"}>Gujiya</MenuItem>
            <MenuItem value={"combo"}>Combo Pack</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ minWidth: 250 }}>
          <InputLabel
            id="demo-simple-select-standard-label"
            sx={{ fontWeight: "bold", color: "#411508", fontSize: "2vw" }}
          >
            Sort By:{" "}
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            onChange={selectbylowhighrating}
            label="Category"
            sx={{ fontWeight: "bold" }}
          >
            <MenuItem value={"low"}>Price : Low to High</MenuItem>
            <MenuItem value={"high"}>Price : High to Low</MenuItem>
            <MenuItem value={"rating"}>Rating</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="text"
          label="Search by Product Name"
          variant="standard"
          sx={{ fontWeight: "bold", color: "#411508" }}
          onChange={searchItems}
        />
        <div style={{ marginTop: "2vh" }}>
          <Button onClick={handleClickOpen1}>
            <Badge
              id="bg"
              badgeContent={obj.cartItems.length}
              color="primary"
              sx={{ fontSize: "4vh" }}
              style={{ fontSize: "20px", padding: "4%" }}
            >
              <ShoppingCartOutlinedIcon
                sx={{ fontSize: "5vh", color: "#411508" }}
                onClick={handleClickOpen1}
              />
            </Badge>
          </Button>
        </div>
      </div>

      <div className="CardDiv">
        {items.map((i, index) => {
          return (
            <div class="card">
              <div className="veg_logo">
                <img src="./sweets/veg.jpg" alt="veg" />
              </div>
              <img src={i.image} alt="Avatar" className="img" id="myImg" />
              <div class="container">
                <h4 className="product_rating">
                  <span className="name_span" style={{ fontSize: "2vh" }}>
                    <b>{i.name}</b>
                  </span>
                  <span className="star_rating">
                    {Array(i.rating)
                      .fill()
                      .map(() => (
                        <i
                          className="fa-solid fa-star"
                          style={{ color: "#FFA41C" }}
                        ></i>
                      ))}
                  </span>
                </h4>
                <p className="add_div" style={{ fontSize: "2vh" }}>
                  {" "}
                  &#8377;{i.price} / Kg
                  <del>
                    <sub> &#8377;{i.discount_price} / Kg</sub>
                  </del>
                  <span>
                    <Button>
                      <i
                        class="fa fa-eye"
                        aria-hidden="true"
                        onClick={handleClickOpen}
                        id={i.image}
                        style={{ fontSize: "2vh" }}
                      ></i>
                    </Button>
                  </span>
                </p>
                <div className="add_div">
                  <span class="loader" style={{ display: "none" }}></span>
                  <span
                    className="add_to_cart"
                    id={i.id}
                    onClick={addToCart}
                    style={{ fontSize: "2vh" }}
                  >
                    Add to Cart
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{ width: "100vw" }}
      >
        <DialogContent>
          <DialogContentText>
            <img src={src} alt="img" style={{ width: "35vw" }} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            autoFocus
            sx={{ fontSize: "2vh", fontWeight: "bold" }}
          >
            X Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default Products;
