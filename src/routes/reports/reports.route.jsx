import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/slices/user/user.selector";

const Reports = () => {
  const currentUser = useSelector(selectCurrentUser);

  return currentUser ? <div>Reports</div> : <div>Sign in first</div>;
};

export default Reports;
