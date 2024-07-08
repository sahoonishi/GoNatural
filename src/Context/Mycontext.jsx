import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fireDB } from "../Firebase/FirebaseConfig";
export const UserContext = createContext();

const Mycontext = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [getAllProduct, setGetAllProduct] = useState([]);

  const getAllProductFunction = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setGetAllProduct(productArray);
        console.log(getAllProduct);
        
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProductFunction();
  }, []);

  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
        getAllProduct,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Mycontext;
