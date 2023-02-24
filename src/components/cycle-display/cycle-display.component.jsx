import { useSelector } from "react-redux";
import { selectCycle } from "../../store/slices/timer/timer.selector";

const CycleDisplay = () => {
  const cycle = useSelector(selectCycle);

  return <div className="text-xl mb-4">Cycle: {cycle}</div>;
};

export default CycleDisplay;
