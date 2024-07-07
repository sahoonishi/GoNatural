const categoryList = [
  {
    name: "fashion",
  },
  {
    name: "shirt",
  },
  {
    name: "jacket",
  },
  {
    name: "mobile",
  },
  {
    name: "laptop",
  },
  {
    name: "shoes",
  },
  {
    name: "home",
  },
  {
    name: "books",
  },
];
const AddProduct = () => {
  return (
    <div>
       <div className="flex justify-center items-center h-screen">

        {/* Login Form  */}

        <div className="login_Form bg-pink-50 px-8 py-6 border border-pink-100 rounded-2xl shadow-md">

          {/* Top Heading  */}

          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-pink-500 ">
              Add Product
            </h2>
          </div>
          


          {/* Input One  */}


          <div className="mb-3">
            <input
              type="text"
              name="title"
              placeholder="Product Title"
              className="bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>



          {/* Input Two  */}


          <div className="mb-3">
            <input
              type="number"
              placeholder="Product Price"
              className="bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>



          {/* Input Three  */}


          <div className="mb-3">
            <input
              type="text"
              placeholder="Product Image Url"
              className="bg-pink-50 text-pink-300 border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-pink-300"
            />
          </div>



          {/* Input Four  */}


          <div className="mb-3">
            <select className="w-full px-1 py-2 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none  ">
              <option disabled>Select Category</option>
              {categoryList.map((value, index) => {
                const { name } = value;
                return (
                  <option
                    className=" first-letter:capitalize"
                    key={index}
                    value={name}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </div>




          {/* Input Five  */}



          <div className="mb-3">
            <textarea
              name="description"
              placeholder="Product Description"
              rows="5"
              cols="5"
              className=" w-full px-2 py-1 text-pink-300 bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-pink-300 "
            ></textarea>
          </div>





          {/* Add Product Button  */}





          <div className="mb-3">
            <button
              type="button"
              className="bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md "
            >
              Add Product
            </button>
          </div>



          
        </div>
      </div> 
    </div>
  );
};

export default AddProduct;
