import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import { useState } from "react";
import Checkout from "./Checkout";
import { deleteAll } from "../../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../Firebase/FirebaseConfig";

const BuyNow = ({ total }) => {
  const cartItems = useSelector((store) => store.cart);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("users"));

  const handleOpen = () => setOpen(!open);

  const [address, setaddress] = useState({
    name: "",
    address: "",
    pincode: "",
    mobile: "",
    date: new Date().toLocaleString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }),
  });

  const buyNow = () => {
    if (
      address.name === "" ||
      address.address === "" ||
      address.pincode === "" ||
      address.mobile === ""
    ) {
      return toast.error("Please fill all the shipping details");
      
    }

    // const orderInfo = {
    //   cartItems,
    //   address,
    //   email: user.email,
    //   userid: user.uid,
    //   status: "confirmed",
    //   // time: Timestamp.now(),
    //   date: new Date().toLocaleString("en-US", {
    //     month: "short",
    //     day: "2-digit",
    //     year: "numeric",
    //     hour: "numeric",
    //     minute: "numeric",
    //   }),
    // };

    // try {
    //   const orderRef = collection(fireDB, "order");
    //   addDoc(orderRef, orderInfo);
    //   setaddress({
    //     name: "",
    //     address: "",
    //     pincode: "",
    //     mobile: "",
    //   });
    //   toast.success("Order Placed Successfully buy");
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const handleSucess = () => {
    if (
      address.name === "" ||
      address.address === "" ||
      address.pincode === "" ||
      address.mobile === ""
    ) {
      return toast.error("Order not placed , Fill all Shipping details");
    }
    const orderInfo = {
      cartItems,
      address,
      email: user.email,
      userid: user.uid,
      status: "confirmed",
      // time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    };

    try {
      const orderRef = collection(fireDB, "order");
      addDoc(orderRef, orderInfo);
      setaddress({
        name: "",
        address: "",
        pincode: "",
        mobile: "",
      });
      toast.success("Orders Placed Successfully");
    } catch (error) {
      console.log(error);
    }

    dispatch(deleteAll());
    setOpen(false);
    //toast.success("Time to buy more items...");
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleOpen}
        className=" w-full px-4 py-3 text-center text-gray-100 bg-green-600 border border-transparent dark:border-gray-700 hover:border-green-500 hover:text-black-700 hover:bg-green-100 rounded-xl"
      >
        Buy now
      </Button>
      <Dialog open={open} handler={handleOpen} className=" bg-green-50">
        <DialogBody className="">
          <div className="mb-3">
            <input
              type="text"
              value={address.name}
              onChange={(e) => {
                setaddress({
                  ...address,
                  name: e.target.value,
                });
              }}
              name="name"
              placeholder="Enter your name"
              className="bg-green-50 border border-green-200 px-2 py-2 w-full rounded-md outline-none text-black-600 placeholder-black-300"
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address.address}
              onChange={(e) => {
                setaddress({
                  ...address,
                  address: e.target.value,
                });
              }}
              name="address"
              placeholder="Enter your address"
              className="bg-green-50 border border-green-200 px-2 py-2 w-full rounded-md outline-none text-black-600 placeholder-black-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="number"
              value={address.pincode}
              onChange={(e) => {
                setaddress({
                  ...address,
                  pincode: e.target.value,
                });
              }}
              name="pincode"
              placeholder="Enter your pincode"
              className="bg-green-50 border border-green-200 px-2 py-2 w-full rounded-md outline-none text-black-600 placeholder-black-300"
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="mobileNumber"
              value={address.mobile}
              onChange={(e) => {
                setaddress({
                  ...address,
                  mobile: e.target.value,
                });
              }}
              placeholder="Enter your mobileNumber"
              className="bg-green-50 border border-green-200 px-2 py-2 w-full rounded-md outline-none text-black-600 placeholder-black-300"
            />
          </div>

          <div className="">
            {/* <button
              type="button"
              onClick={() => {
                buyNow();
                handleOpen();
              }}
              className="w-full px-4 py-3 text-center text-gray-100 bg-green-600 border border-transparent dark:border-gray-700 rounded-lg mb-5"
            >
              Buy now
            </button> */}
            <Checkout
              handleOpen={handleOpen}
              buyNow={buyNow}
              total={total}
              handleSucess={handleSucess}
            />
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default BuyNow;
