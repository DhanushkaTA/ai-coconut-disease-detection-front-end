import AlertListItem from "../AlertListItem/index";

const AlertList = ({ alerts }: any) => {
  return (
    <div className="space-y-6 w-full">
      {alerts.map((alert: any) => (
        <AlertListItem key={alert._id} alert={alert} />
      ))}
    </div>
  );
};

export default AlertList;
