import { useCartStore } from "../store/cartStore";
import { RiDeleteBin6Line, RiShoppingCartLine } from "react-icons/ri";
import CartSkeleton from "../components/skeletons/CartSkeleton";
import EmptyState from "../components/EmptyState";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const cart = useCartStore((state) => state.cart);

  const increaseQuantity = useCartStore((state) => state.increaseQuantity);

  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const subtotal = totalAmount;

  const discount = cart.reduce(
    (sum, item) =>
      sum + ((item.price * item.discountPercentage) / 100) * item.quantity,
    0,
  );

  const shipping = subtotal > 100 ? 0 : 10;

  const total = subtotal - discount + shipping;

  const loading = useCartStore((state) => state.loading);

  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="lg:text-3xl md:text-2xl text-xl font-bold text-gray-800">
            Shopping Cart
          </h1>

          <p className="text-gray-500 lg:mt-3 mt-2 lg:text-[16px] md:text-[15px] text-[14px]">
            {totalItems} items in cart
          </p>
        </div>
      </div>

      {loading ? (
        <CartSkeleton count={3} />
      ) : cart.length === 0 ? (
        <EmptyState
          icon={<RiShoppingCartLine size={32} />}
          title="Your cart is empty"
          description="Looks like you haven't added any products to your cart yet."
          buttonText="Continue Shopping"
          onClick={() => navigate("/products")}
        />
      ) : (
        <div className="grid lg:grid-cols-[2fr_380px] gap-8 items-start">
          <div className="space-y-5">
            {cart.map((product) => (
              <div
                key={product.id}
                className="
      bg-white
  rounded-2xl
  shadow-sm
  p-4
  flex
  flex-col
  sm:flex-row
  lg:items-center md:items-center items-start
  gap-5
  relative
      "
              >
                <a href={`/products/${product.id}`}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-36 h-36 rounded-xl object-cover shrink-0"
                  />
                </a>

                <div className="flex-1">
                  <a
                    href={`/products/${product.id}`}
                    className="lg:text-[20px] md:text-[20px] text-[18px] leading-base font-semibold"
                  >
                    {product.title}
                  </a>

                  <p className="text-gray-500 mt-2 lg:text-[16px] md:text-[15px] text-[14px]">
                    {product.brand}
                  </p>

                  <p className="text-[#aa3bff] lg:text-[20px] md:text-[20px] text-[18px] font-bold mt-3">
                    ${product.price}
                  </p>

                  <p className="text-gray-500 mt-2">
                    Total:
                    <span className="font-semibold text-gray-800 ml-2">
                      ${(product.price * product.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>

                <div className="lg:flex md:flex flex items-center justify-between lg:w-auto md:w-auto w-full">
                  <div className="flex items-center border rounded-xl overflow-hidden">
                    <button
                      onClick={() => decreaseQuantity(product.id)}
                      className="
    w-10
    h-10
    hover:bg-gray-100 hover:cursor-pointer
    "
                    >
                      −
                    </button>

                    <span className="w-12 text-center font-semibold">
                      {product.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(product.id)}
                      className="
    w-10
    h-10
    hover:bg-purple-50
    text-[#aa3bff] hover:cursor-pointer
    "
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="
  ml-6
  p-3
  rounded-xl
  border
  border-gray-200
  hover:bg-gray-100
  transition hover:cursor-pointer
  "
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="stickylg:top-24">
            <div
              className="
      w-full
      bg-white
      rounded-2xl
      shadow-sm
      p-6
    "
            >
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Total Items</span>

                  <span className="font-semibold">{totalItems}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>

                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>

                  <span className="text-green-600 font-semibold">
                    -${discount.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>

                  <span className="font-semibold">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <p className="text-sm text-green-600">
                  {shipping === 0
                    ? "🎉 Free Shipping Applied"
                    : "Free Shipping on orders above $100"}
                </p>

                <hr />

                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>

                  <span className="text-[#aa3bff]">${total.toFixed(2)}</span>
                </div>

                <button
                  disabled={cart.length === 0}
                  className={`
          mt-6
          w-full
          py-4
          rounded-xl
          font-semibold
          transition
 hover:cursor-pointer
          ${
            cart.length === 0
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-[#aa3bff] text-white hover:bg-purple-700"
          }
        `}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
