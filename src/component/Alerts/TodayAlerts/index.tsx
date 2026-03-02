interface Props {
  alerts: any[];
}

const TodayAlerts = ({ alerts }: Props) => {
  return (
    <div>
      <h3 className="font-semibold mb-3">Today</h3>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide min-w-[200px]">
        {alerts.map((alert) => (
          <div
            key={alert._id}
            // className="min-w-[250px] bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
            className="min-w-[250px] flex-shrink-0 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
          >
            <img
              src={alert.image}
              alt={alert.title}
              className="h-40 w-full! object-cover"
            />
            <div className="p-3">
              <h4 className="font-semibold text-sm line-clamp-2">
                {alert.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodayAlerts;
