export default function WishlistSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-5">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="
          bg-white
          rounded-2xl
          shadow-sm
          p-6
          flex
          flex-col
          sm:flex-row
          items-start
          gap-6
          animate-pulse
          "
        >
          {/* Image */}
          <div
            className="
            w-36
            h-36
            bg-gray-200
            rounded-xl
            shrink-0
            "
          />

          {/* Details */}
          <div className="flex-1 space-y-4 w-full">
            {/* Title */}
            <div
              className="
              h-6
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
              w-28
              "
            />

            {/* Rating + Stock */}
            <div className="flex gap-5">
              <div
                className="
                h-8
                w-20
                bg-gray-200
                rounded-xl
                "
              />

              <div
                className="
                h-8
                w-32
                bg-gray-200
                rounded-xl
                "
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <div
              className="
              h-12
              w-36
              bg-gray-200
              rounded-xl
              "
            />

            <div
              className="
              h-12
              w-28
              bg-gray-200
              rounded-xl
              "
            />
          </div>
        </div>
      ))}
    </div>
  );
}
