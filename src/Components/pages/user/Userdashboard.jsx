import { useContext } from "react";
import Layout from "../../Layout/Layout";
import { UserContext } from "../../../Context/Mycontext";

const products = [
    {
        id: 1,
        name: 'Aroma Magic facewash',
        imageSrc:
            'https://rukminim2.flixcart.com/image/612/612/xif0q/face-wash/7/9/0/200-neem-tea-tree-face-wash-acne-control-aroma-magic-original-imaghexzapbye9fd.jpeg?q=70',
        href: '#',
        price: '₹200',
        color: 'Green',
        imageAlt: 'facewash',
        quantity: 1,
    },
]

const Userdashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const {getAllOrder , loading}=useContext(UserContext);


    return (
        <Layout>
            <div className="font-DM container mx-auto px-4 py-5 lg:py-8">
                {/* Top  */}
                <div className="top ">
                    {/* main  */}
                    <div className=" bg-green-50 py-5 rounded-xl border border-green-100">
                        {/* image  */}
                        <div className="flex justify-center">
                            <img className="w-24" src="public/image/programmer.png" alt="" />
                        </div>
                        {/* text  */}
                        <div className="">
                            <h1 className=" text-center text-lg font-DM"><span className=" font-extrabold font-DM">Welcome </span>{user?.name}</h1>
                            <h1 className=" text-center text-lg"><span className=" font-bold">Email : </span>{user?.email}</h1>
                            <h1 className=" text-center text-lg"><span className=" font-bold">Date joined : </span>{user?.date}</h1>
                        </div>
                    </div>
                </div>

                {/* bottom  */}
                <div className="bottom font-DM">
                    {/* main 1 */}
                    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
                        {/* text  */}
                        <h2 className=" text-2xl lg:text-3xl font-bold">Order Details</h2>

                        {/* main 2 */}
                        {getAllOrder.filter((obj)=> obj.userid === user.uid).map}

                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Userdashboard;