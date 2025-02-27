import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/Mycontext";
import Loader from "../Loader/Loader"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../Firebase/FirebaseConfig";
import toast from "react-hot-toast";


const Productdetail = () => {
  const context = useContext(UserContext);
  const { loading, getAllProduct , setLoading , getAllProductFunction } = context;
  const navigate = useNavigate();
  // console.log(getAllProduct)
  const deleteProduct = async (id) => {
    setLoading(true)
    try {
        await deleteDoc(doc(fireDB, 'products', id))
        toast.success('Product Deleted successfully')
        getAllProductFunction();
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}


  return (
    <div>
      <div className="py-5 flex justify-between items-center">
        {/* text  */}
        <h1 className=" text-xl text-green font-bold ">All Product</h1>
        {/* Add Product Button  */}
        <Link to={"/addproduct"}>
          <button className="px-5 py-2 bg-green-800 hover:scale-105 hover:bg-green-500 transition-all border border-green-100 text-white rounded-full font-bold">
            Add Product
          </button>
        </Link>
      </div>

      {/* Loading  */}
      <div className="flex justify-center relative -top-20">
        {loading && <Loader />}
      </div>

      {/* table  */}
      <div className="w-full overflow-x-auto mb-5">
        <table className="w-full  text-left border-[5px] outline-none sm:border-separate  rounded-3xl text-green-400">
          <tbody >
            <tr>
              <th
                scope="col"
                className="h-12 px-6 text-md border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100 font-bold fontPara"
              >
                S.No.
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100 font-bold fontPara"
              >
                Image
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100"
              >
                Title
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100"
              >
                Price
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100"
              >
                Category
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100"
              >
                {" "}
                Date
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100"
              >
                Action
              </th>
              <th
                scope="col"
                className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100"
              >
                Action
              </th>
            </tr>

            {getAllProduct.map((item, index) => {
              const { id, title, category, image, date, price } = item;
              return (
                <tr key={index} className="text-green">
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 ">
                    {index+1}
                  </td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    <div className="flex justify-center w-40 h-40 p-2">
                      <img className="rounded-lg object-contain w-full h-full " src={image} alt="" />
                    </div>
                  </td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    {title}
                  </td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    ₹{price}
                  </td>
                  <td  className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    {category}
                  </td>
                  <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                    {date}
                  </td>

                   {/*=========== WHILE WRITING ID ONLY WRITE/${ID} NO : ==============*/} 
                  <td onClick={()=>navigate(`/updateproduct/${id}`)} className=" text h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 cursor-pointer hover:text-blue-500 ">
                    <FaEdit  type="button" className="bg-green-700 text-white p-1.5 rounded-lg hover:bg-green-400 hover:scale-105 text-3xl mx-auto"/>
                  </td>
                  <td onClick={()=>deleteProduct(id)} className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100  cursor-pointer ">
                  <MdDelete  className="bg-red-700 text-white rounded-lg hover:bg-red-400 hover:scale-105 text-3xl mx-auto p-1"/>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Productdetail;
