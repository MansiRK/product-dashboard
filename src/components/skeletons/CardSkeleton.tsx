import Skeleton from "react-loading-skeleton";

export default function CardSkeleton() {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-sm
      border
      p-6
    "
    >
      <Skeleton width={80} height={15} />

      <div className="mt-4">
        <Skeleton width={120} height={35} />
      </div>
    </div>
  );
}
