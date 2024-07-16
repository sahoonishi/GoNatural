
import StripeCheckout from "react-stripe-checkout";


const Checkout = ({ total, handleSucess, buyNow , handleOpen }) => {
  
  
  const handleToken = (token) => {
    handleSucess();
  };


  return (
    <StripeCheckout
      token={handleToken}
      stripeKey="pk_test_51PcLpXF6VBPPxXkhMzjlTyGlQx2V80a5tJU8UdXKcZnNm1YMdCHdVnpbcyw0BBmDk6E5wehVBuzE8KhccsoKQUNh00Mv3x2oyJ"
      amount={total * 100}
      name="GoNatural"
      email="gonatural@gmail.com"
      description="payment using stripe"
    >
      <button
        type="button"
        onClick={() => {
          buyNow();
          //handleOpen();
        
          //dispatch(deleteAll());
        }}
        className="w-full bg-gradient-to-r from-green-900 to-green-500 rounded-full font-medium text-white text-xl font-DM tracking-wider"
      >
        Pay Rs. {total}
      </button>
    </StripeCheckout>
  );
};

export default Checkout;
