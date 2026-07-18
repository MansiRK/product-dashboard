import Skeleton from "react-loading-skeleton";

interface Props {
  view: "grid" | "list";
}

export default function ProductSkeleton({ view }: Props) {
  return (
    <div
      className={
        view === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
          : "space-y-5"
      }
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className={`
bg-white
rounded-2xl
border
shadow-sm
p-5

${view === "list" ? "flex gap-6" : ""}
`}
        >
          <Skeleton
            height={view === "list" ? 160 : 220}
            width={view === "list" ? 220 : "100%"}
          />

          <div className="flex-1 mt-4">
            <Skeleton width="40%" />

            <Skeleton className="mt-3" />

            <Skeleton width="60%" />

            <div className="mt-5">
              <Skeleton width={100} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
