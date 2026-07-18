import { useCartStore } from "../store/cartStore";
import { RiDeleteBin6Line } from "react-icons/ri";

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

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
        </div>
      </div>

      {cart.length === 0 ? (
        <p>No products in cart</p>
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
      p-6
      flex
      items-center
      gap-6
      "
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-36 h-36 rounded-xl object-cover shrink-0"
                />

                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{product.title}</h2>

                  <p className="text-gray-500 mt-2">{product.brand}</p>

                  <p className="text-[#aa3bff] text-2xl font-bold mt-3">
                    ${product.price}
                  </p>

                  <p className="text-gray-500 mt-2">
                    Total:
                    <span className="font-semibold text-gray-800 ml-2">
                      ${(product.price * product.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>

                <div className="flex items-center border rounded-xl overflow-hidden">
                  <button
                    onClick={() => decreaseQuantity(product.id)}
                    className="
    w-10
    h-10
    hover:bg-gray-100
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
    text-[#aa3bff]
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
  transition
  "
                >
                  <RiDeleteBin6Line size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="sticky top-24">
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
