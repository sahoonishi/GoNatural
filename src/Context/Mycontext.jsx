import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { fireDB } from "../Firebase/FirebaseConfig";
import toast from "react-hot-toast";
export const UserContext = createContext();

const Mycontext = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [getAllProduct, setGetAllProduct] = useState([]);

  const getAllProductFunction = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("date"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllProduct(productArray);

        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // =========================ORDER STATE =======================

  const [getAllOrder, setgetAllOrder] = useState([]);

  // =======================GET ALL ORDER FUNCTION ======================

  const getAllOrderFunction = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "order"), orderBy("date"),"desc");

      const data = onSnapshot(q, (QuerySnapshot) => {
        let orderarray = [];
        QuerySnapshot.forEach((doc) => {
          orderarray.push({ ...doc.data(), id: doc.id });
        });
        setgetAllOrder(orderarray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //=====================DELETE ORDER FUNCTIONS====================

  const deleteProduct = async (id) => {
    setLoading(true);
    console.log(id);
    try {
      await deleteDoc(doc(fireDB, "order", id));
      toast.success("Order Deleted successfully");
      getAllOrderFunction();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // user State
  const [getAllUser, setGetAllUser] = useState([]);

  /**========================================================================
   *========================================================================**/

  const getAllUserFunction = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "user"), orderBy("date"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let userArray = [];
        QuerySnapshot.forEach((doc) => {
          userArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllUser(userArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    //console.log(id);
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "user", id));
      toast.success("User Deleted successfully");
      getAllUserFunction();
      setLoading(false);
    } catch (error) {
      //console.log(error.message, "..............");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProductFunction();
    getAllOrderFunction();
    getAllUserFunction();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        getAllProduct,
        getAllProductFunction,
        getAllOrder,
        deleteProduct,
        getAllUser,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Mycontext;
