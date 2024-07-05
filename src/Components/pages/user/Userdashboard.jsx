import Layout from "../../Layout/Layout";

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
                            <h1 className=" text-center text-lg"><span className=" font-bold">Name :</span> Nishi</h1>
                            <h1 className=" text-center text-lg"><span className=" font-bold">Email :</span> Nishi@gmail.com</h1>
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
                        <div className="mt-5 flex flex-col overflow-hidden rounded-xl border border-pink-100 md:flex-row">
                            {/* main 3  */}
                            <div className="w-full border-r border-green-100 bg-green-50 md:max-w-xs">
                                {/* left  */}
                                <div className="p-8">
                                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-1 font-DM">
                                        <div className="mb-4">
                                            <div className="text-sm font-semibold text-black">Order Id</div>
                                            <div className="text-sm font-medium text-gray-900">#74557994327</div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="text-sm font-semibold">Date</div>
                                            <div className="text-sm font-medium text-gray-900">4 March, 2024</div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="text-sm font-semibold">Total Amount</div>
                                            <div className="text-sm font-medium text-gray-900">₹200</div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="text-sm font-semibold">Order Status</div>
                                            <div className="text-sm font-medium text-green-800">Confirmed</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* right  */}
                            <div className="flex-1">
                                <div className="p-8">
                                    <ul className="-my-7 divide-y divide-gray-200">
                                        {products.map((product) => (
                                            <li
                                                key={product.id}
                                                className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                                            >
                                                <div className="flex flex-1 items-stretch">
                                                    <div className="flex-shrink-0">
                                                        <img
                                                            className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
                                                            src={product.imageSrc}
                                                            alt={product.imageSrc}
                                                        />
                                                    </div>

                                                    <div className="ml-5 flex flex-col justify-between">
                                                        <div className="flex-1">
                                                            <p className="text-sm font-bold text-gray-900">{product.name}</p>
                                                            <p className="mt-1.5 text-sm font-medium text-gray-500">{product.color}</p>
                                                        </div>

                                                        <p className="mt-4 text-sm font-medium text-gray-500">x {product.quantity}</p>
                                                    </div>
                                                </div>

                                                <div className="ml-auto flex flex-col items-end justify-between">
                                                    <p className="text-right text-sm font-bold text-gray-900">{product.price}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Userdashboard;