import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-red-700/80 items-center text-slate-50">
      <Outlet />
    </div>
  );
}
