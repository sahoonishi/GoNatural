import { useContext } from "react";
import { UserContext } from "../../Context/Mycontext";
import { MdDelete } from "react-icons/md";

const UserDetail = () => {
  const { getAllUser , deleteUser } = useContext(UserContext);

  return (
    <div>
      <div>
        <div className="py-5 flex justify-between items-center">
          {/* text  */}
          <h1 className=" text-xl text-black font-bold">All User</h1>
        </div>

        {/* table  */}
        <div className="w-full overflow-x-auto">
          <table className="w-full  text-left border-[5px] sm:border-separate  rounded-3xl text-green-400 mb-5">
            <tbody>
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
                  Name
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100 font-bold fontPara"
                >
                  Email
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100 font-bold fontPara"
                >
                  Uid
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100 font-bold fontPara"
                >
                  Role
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100 font-bold fontPara"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100 font-bold fontPara"
                >
                  Remove User
                </th>
              </tr>
              {getAllUser.map((item, index) => {
                return (
                  <tr key={index} className="text-green-300">
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 ">
                      {index+1}
                    </td>

                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                      {item.name}
                    </td>

                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 cursor-pointer ">
                      {item.email}
                    </td>

                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 cursor-pointer ">
                      {item.uid}
                    </td>

                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 cursor-pointer ">
                      {item.role}
                    </td>

                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 cursor-pointer ">
                      {item.date}
                    </td>
                    <td className="h-12 transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-slate-500 cursor-pointer ">
                    <MdDelete onClick={()=>deleteUser(item.id)} className="bg-red-600 text-white rounded-lg hover:bg-red-400 hover:scale-105 text-2xl mx-auto p-1"/>
                      
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
