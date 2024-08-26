type IFluidContainer = {
  children: React.ReactNode;
  className?: string;
};

const FluidContainer = (props: IFluidContainer) => {
  return (
    <div className={`w-screen h-screen ${props.className}`}>
      {props.children}
    </div>
  );
};

export default FluidContainer;
