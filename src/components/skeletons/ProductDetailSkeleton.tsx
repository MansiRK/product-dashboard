export default function ProductDetailSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 bg-gray-200 rounded-lg" />

        <div className="space-y-3">
          <div className="h-8 w-64 bg-gray-200 rounded-lg" />
          <div className="h-4 w-48 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Main Card */}
      <div
        className="
        bg-white
        rounded-3xl
        shadow-sm
        p-8
        grid
        lg:grid-cols-2
        gap-10
        "
      >
        {/* Image */}
        <div
          className="
           lg:w-full md:w-full w-[350px]
              lg:h-full md:h-full h-[350px]
          rounded-2xl
          bg-gray-200
          "
        />

        {/* Details */}
        <div className="space-y-6">
          {/* Category */}
          <div className="h-7 w-28 bg-gray-200 rounded-full" />

          {/* Title */}
          <div className="space-y-3">
            <div className="h-10 w-3/4 bg-gray-200 rounded-lg" />
            <div className="h-10 w-1/2 bg-gray-200 rounded-lg" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
          </div>

          {/* Price */}
          <div className="flex gap-6 items-center">
            <div className="h-12 w-36 bg-gray-200 rounded-lg" />

            <div className="h-7 w-20 bg-gray-200 rounded-full" />
          </div>

          {/* Quantity */}
          <div className="flex gap-8 items-center">
            <div className="h-5 w-20 bg-gray-200 rounded" />

            <div className="h-11 w-36 bg-gray-200 rounded-xl" />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <div
              className="
              flex-1
              h-14
              bg-gray-200
              rounded-2xl
              "
            />

            <div
              className="
              flex-1
              h-14
              bg-gray-200
              rounded-2xl
              "
            />
          </div>

          {/* Info cards */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="
                  h-20
                  bg-gray-200
                  rounded-xl
                  "
              />
            ))}
          </div>

          {/* Extra Information */}
          <div className="space-y-5 border-t pt-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex gap-3">
                <div className="w-6 h-6 bg-gray-200 rounded-full" />

                <div className="space-y-2">
                  <div className="h-3 w-20 bg-gray-200 rounded" />
                  <div className="h-4 w-52 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="border-t pt-6">
            <div className="h-6 w-20 bg-gray-200 rounded mb-4" />

            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="
                    h-9
                    w-20
                    bg-gray-200
                    rounded-full
                    "
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
