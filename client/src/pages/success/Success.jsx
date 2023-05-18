import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useLocation, useNavigate, useParams } from "react-router";
import { publicRequest, userRequest } from "../../makeRequest";
import { resetCart } from "../../redux/cartReducer";
import { runFireworks } from "../../components/Fireworks/RunFireWorks";
import { BatteryChargingFull, Done, DoneAll } from "@mui/icons-material";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const cart = useSelector(state => state.cart)

  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
const dispatch = useDispatch()
  const id = useParams()

  useEffect(() => {
    runFireworks()
    const createOrder = async () => {
console.log(cart.items.map(i => i));
      try {
        const res = await publicRequest.post("/orders", {
          userId: id.id,
          items: cart.items.map((item) => ({
            itemId: item._id,
            quantity: item.quantity,
          })),

          amount: cart.bill,
          // address: data.address,
        });
        console.log(res.data);
        setOrderId(res.data._id);
        dispatch(resetCart())
      } catch(err) {
        console.log(err);
      }
    };

    createOrder();

  }, [currentUser]);

  const handleGoToHomepage = () => {
    navigate("/");
  };

  return (
    <div className="w-[500px]  h-[100vh] m-auto text-center  flex flex-col text-[black] gap-10  px-[5%] py-[10%] justify-center">
      {/* <DoneAll/> */}
      <p className="text-2xl">
      {orderId ? (
        `Order has been created successfully. Your order number is ${orderId}`
      ) : (
        `Successful. Your order is being prepared...`
      )}
      </p>
  
      <p>If you have any questions, email at   <a className="email" href="mailto:order@mjcollections.com">
            order@mjcollections.com
          </a></p>
      <button className="p-2 bg-black text-[white]" onClick={handleGoToHomepage}>
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;
