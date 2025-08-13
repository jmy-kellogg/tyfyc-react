import { useSelector, useDispatch } from "react-redux";

import { removeAlert } from "@/reducers/alertsSlice";
import type { State } from "@/store";

const alertDict = {
  success: {
    color: "green",
    label: "Success",
    style: "bg-green-100 border border-green-400 text-green-700",
  },
  error: {
    color: "red",
    label: "Error",
    style: "bg-red-100 border border-red-400 text-red-700",
  },
  warning: {
    color: "yellow",
    label: "Warning",
    style: "bg-yellow-100 border border-yellow-400 text-yellow-700",
  },
  info: {
    color: "blue",
    label: "Info",
    style: "bg-blue-100 border border-blue-400 text-blue-700",
  },
};

function Alerts() {
  const dispatch = useDispatch();
  const alerts = useSelector((state: State) => state.alerts.list);
  const showAlerts = useSelector((state: State) => state.alerts.showAlerts);

  const handleRemove = (id: string) => {
    dispatch(removeAlert(id));
  };

  return (
    <>
      {showAlerts &&
        alerts.map((alert) => (
          <div
            className={`${alertDict[alert.type]?.style || "bg-white border border-gray-400 text-black-700"} p-2 m-2 rounded justify-between flex w-100 absolute right-0 bottom-0`}
            role="alert"
            key={alert.id}
          >
            <div>
              <strong className="font-bold">
                {alertDict[alert.type].label}:{" "}
              </strong>
              <span className="block sm:inline mx-2">{alert.message}</span>
            </div>
            <span className="top-0 bottom-0 right-0 p-1">
              <svg
                className="fill-current h-5 w-5 hover:cursor-pointer"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                onClick={() => handleRemove(alert.id)}
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        ))}
    </>
  );
}

export default Alerts;
