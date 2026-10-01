export const Spinner = () => {
  return (
    <span
      role="status"
      aria-label="로딩 중"
      className={`inline-block size-10 animate-spin rounded-pill border-2 border-divider border-t-action`}
    />
  );
};
