import { useMemo } from "react";

export function useMyRef<T>(initValue: T | null) {
  const refObj = useMemo(() => {return {current: initValue}},[]);
  return refObj;
}
