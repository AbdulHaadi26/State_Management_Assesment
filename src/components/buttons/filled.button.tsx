const FilledButton = ({
  onClick,
  children,
}: {
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      className="bg-black text-white px-8 py-2 rounded"
      type="button"
      onClick={() => onClick && onClick()}
    >
      {children}
    </button>
  );
};

export default FilledButton;
