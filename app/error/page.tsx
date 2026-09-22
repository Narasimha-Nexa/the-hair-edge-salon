// @ts-nocheck
import ErrorClient from "./ErrorClient";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <ErrorClient error={error} reset={reset} />;
}