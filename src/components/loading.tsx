export default function Loading() {
  return (
    <div
      id="loading"
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black opacity-50"
    >
      <span className="w-12 h-12 border-8 border-white border-b-transparent rounded-full inline-block box-border animate-spin"></span>
    </div>
  );
}
