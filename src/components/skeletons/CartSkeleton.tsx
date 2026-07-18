export default function CartSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid lg:grid-cols-[2fr_380px] gap-8 items-start">
      {/* Cart Items Skeleton */}
      <div className="space-y-5">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="
            bg-white
            rounded-2xl
            shadow-sm
            p-4
            flex
            flex-col
            sm:flex-row
            items-start
            gap-5
            animate-pulse
            "
          >
            {/* Product Image */}
            <div
              className="
              w-36
              h-36
              rounded-xl
              bg-gray-200
              shrink-0
              "
            />

            {/* Product Details */}
            <div className="flex-1 space-y-4 w-full">
              {/* Title */}
              <div
                className="
                h-5
                bg-gray-200
                rounded
                w-2/3
                "
              />

              {/* Brand */}
              <div
                className="
                h-4
                bg-gray-200
                rounded
                w-1/3
                "
              />

              {/* Price */}
              <div
                className="
                h-7
                bg-gray-200
                rounded
                w-24
                "
              />

              {/* Total */}
              <div
                className="
                h-4
                bg-gray-200
                rounded
                w-40
                "
              />
            </div>

            {/* Quantity + Delete */}
            <div className="flex items-center gap-5">
              {/* Quantity box */}
              <div
                className="
                h-10
                w-32
                bg-gray-200
                rounded-xl
                "
              />

              {/* Delete button */}
              <div
                className="
                h-10
                w-10
                bg-gray-200
                rounded-xl
                "
              />
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary Skeleton */}
      <div
        className="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
        animate-pulse
        "
      >
        {/* Heading */}
        <div
          className="
          h-7
          bg-gray-200
          rounded
          w-48
          mb-8
          "
        />

        <div className="space-y-5">
          {/* Summary rows */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="
              flex
              justify-between
              "
            >
              <div
                className="
                h-4
                bg-gray-200
                rounded
                w-28
                "
              />

              <div
                className="
                h-4
                bg-gray-200
                rounded
                w-20
                "
              />
            </div>
          ))}

          {/* Free shipping text */}
          <div
            className="
            h-4
            bg-gray-200
            rounded
            w-56
            "
          />

          {/* Divider */}
          <div
            className="
            h-px
            bg-gray-200
            "
          />

          {/* Total */}
          <div className="flex justify-between">
            <div
              className="
              h-7
              bg-gray-200
              rounded
              w-20
              "
            />

            <div
              className="
              h-7
              bg-gray-200
              rounded
              w-28
              "
            />
          </div>

          {/* Checkout button */}
          <div
            className="
            h-14
            bg-gray-200
            rounded-xl
            mt-5
            "
          />
        </div>
      </div>
    </div>
  );
}
