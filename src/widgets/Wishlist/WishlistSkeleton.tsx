import type { FC } from "react";

import Skeleton from "@/components/Skeleton";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";

import VirtualizedGrid from "../VirtualizedGrid";

interface WishlistSkeletonProps {
  guest?: boolean;
}

const WishlistSkeleton: FC<WishlistSkeletonProps> = ({ guest }) => (
  <div className="grid md:grid-cols-[320px_1fr] gap-x-4 gap-y-8">
    <div className="my-card flex flex-col gap-y-3">
      {!guest && <Skeleton className='h-5 w-20' />}
      <Skeleton className="h-7" />
      <div className="py-2 flex flex-col gap-y-3">
        <Skeleton asChild count={4} className="h-11" />
      </div>
      <Skeleton className="h-4 my-2" />
      <Field className="w-full block">
        <FieldLabel htmlFor="progress" className="mb-2">
          <Skeleton className="h-5 w-25" />
        </FieldLabel>
        <Progress value={0} id="progress" />
      </Field>
      <div className="flex flex-col gap-y-2">
        <Skeleton className="h-11" />
        {!guest && (
          <>
            <Skeleton className="h-11" />
            <Skeleton className="h-11" />
          </>
        )}
      </div>
    </div>
    <div className="flex flex-col gap-y-3">
      <Skeleton className="h-5" />
      <VirtualizedGrid items={[]} loading overscan={4} render={() => null} />
    </div>
  </div>
);

export default WishlistSkeleton;
