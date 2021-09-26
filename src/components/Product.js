import {
  TextField,
  Button,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

export default function Product({ item, setCart, cart }) {
  const [selected, setSelected] = useState(false);
  const [name, setName] = useState();
  const [allergy, setAllergy] = useState();

  const [subscription, setSubscription] = useState(false);

  const [formData, setFormData] = useState({
    id: item["id"],
    item_name: item["name"],
    price: item["price"],
    name: "",
    allergy: "",
    subscription: "false",
  });

  const handleClick = (e) => {
    e.preventDefault();
    if (selected) {
      let currentCart = { ...cart };
      let curCart = currentCart[0];
      let curPrice = currentCart[1];
      let newCart = [];

      curCart.forEach((element) => {
        if (element.id !== item["id"]) {
          newCart.push(element);
        }
      });

      setCart([newCart, curPrice - parseInt(item["price"])]);

      console.log("Item was removed from your cart!");
      setSelected(!selected);
    } else {
      let currentCart = { ...cart };
      let curCart = currentCart[0];
      let curPrice = currentCart[1];
      let newCart = [];

      if (curCart.length !== 0) {
        curCart.forEach((element) => {
          newCart.push(element);
        });
      }

      newCart.push(formData);

      setCart([newCart, curPrice + parseInt(item["price"])]);
      console.log("Item was added to your cart!");
      setSelected(!selected);
    }
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e) => {
    setSubscription(e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="Product">
      <div className="product-title">
        <h1>{item["name"]}</h1>
        <h2>CAD {item["price"]}</h2>
      </div>
      <div className="product-body">
        <div className="product-info">
          <div className="product-description">{item["meta_description"]}</div>
          <form className="product-form" onSubmit={(e) => handleClick(e)}>
            <Box
              sx={{
                "& > :not(style)": { m: 1, width: "50ch" },
              }}
            >
              <TextField
                label="Who's it for?"
                variant="outlined"
                value={name}
                name="name"
                required={true}
                onChange={(e) => onChange(e)}
                className="text-name"
              />
              <TextField
                label="Do you have any allergies?"
                variant="outlined"
                value={allergy}
                name="allergy"
                required={true}
                onChange={(e) => onChange(e)}
                className="text-allergy"
              />
              <FormControl component="fieldset" className="product-form-radio">
                <FormLabel component="legend">Subscription</FormLabel>
                <RadioGroup
                  row
                  aria-label="subscription"
                  name="subscription"
                  value={subscription}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="One-Time"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Monthly (Save 10%)"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </FormControl>
              {selected ? (
                <Button variant="contained" type="submit" value="remove">
                  Remove
                </Button>
              ) : (
                <Button variant="contained" type="submit" value="add">
                  Add
                </Button>
              )}
            </Box>
          </form>
        </div>
        <img
          className="product-image"
          src={item["primary_image"]["url_standard"]}
          alt={item["primary_image"]["description"]}
        />
      </div>
    </div>
  );
}

// A different approach earlier.
// const addItemToCart = () => {
//   let currentCart = { ...cart };
//   let curCart = currentCart[0];
//   let curPrice = currentCart[1];
//   let newCart = [];

//   let found = false;

//   if (curCart.length === 0) {
//     newCart.push({
//       id: item["id"],
//       name: item["name"],
//       price: item["price"],
//       occurrences: 1,
//     });
//   } else {
//     curCart.forEach((element) => {
//       let newItem = {
//         id: element.id,
//         name: element.name,
//         price: element.price,
//         occurrences: element.occurrences,
//       };
//       if (element.id === item["id"]) {
//         newItem = {
//           id: element.id,
//           name: element.name,
//           price: element.price,
//           occurrences: element.occurrences + 1,
//         };
//         found = true;
//       }
//       newCart.push(newItem);
//     });
//     if (!found) {
//       newCart.push({
//         id: item["id"],
//         name: item["name"],
//         price: item["price"],
//         occurrences: 1,
//       });
//     }
//   }

//   curPrice = curPrice + parseInt(item["price"]);
//   setCart([newCart, curPrice]);
// };

// const removeItemFromCart = () => {
//   let currentCart = { ...cart };
//   let curCart = currentCart[0];
//   let curPrice = currentCart[1];
//   let newCart = [];

//   if (curCart.length !== 0) {
//     curCart.forEach((element) => {
//       let newItem = {};
//       if (element.id === item["id"]) {
//         if (element.occurrences > 1) {
//           newItem = {
//             id: element.id,
//             name: element.name,
//             price: element.price,
//             occurrences: element.occurrences - 1,
//           };
//           newCart.push(newItem);
//         }
//       } else {
//         newCart.push({
//           id: element.id,
//           name: element.name,
//           price: element.price,
//           occurrences: element.occurrences,
//         });
//       }
//     });
//   }

//   curPrice = curPrice - parseInt(item["price"]);
//   setCart([newCart, curPrice]);
// };
