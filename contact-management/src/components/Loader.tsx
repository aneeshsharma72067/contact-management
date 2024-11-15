type Props = {
  size: number;
};

function Loader({ size }: Props) {
  return (
    <div role="status">
      <div
        style={{ width: size, height: size }}
        className="bg-transparent rounded-full border-2 border-slate-800 border-b-transparent animate-spin"
      ></div>
    </div>
  );
}

export default Loader;
