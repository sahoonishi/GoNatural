const getProductData = async () => {
  setLoading(true);
  try {
    const productTemp = await getDoc(doc(fireDB, "products", id));
    const singleProduct = productTemp.data();
    setProduct(singleProduct);
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

useEffect(() => {
  getProductData();
}, []);