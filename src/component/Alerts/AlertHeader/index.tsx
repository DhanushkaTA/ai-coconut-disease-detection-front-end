// import { BellRegular } from "@fluentui/react-icons";

const AlertHeader = () => {
  return (
    <div className="fixed md:w-[70%] w-full bg-red-600 text-white z-50 shadow">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          {/* <BellRegular /> */}
          Alerts
        </h2>
      </div>
    </div>
  );
};

export default AlertHeader;