// import { useGetAllAlertsQuery } from "../../service/alertsApi";
// import AlertHeader from "../../component/alerts/AlertHeader";
// import TodayAlerts from "../../component/alerts/TodayAlerts";
// import AlertList from "../../component/alerts/AlertList";
import AlertHeader from "../../component/Alerts/AlertHeader";
import AlertList from "../../component/Alerts/AlertList";
import TodayAlerts from "../../component/Alerts/TodayAlerts";
import {
  useGetAllAlertsQuery,
  useGetTodayAlertsQuery,
} from "../../service/alertApi";

const AlertPage = () => {
  const { data, isLoading } = useGetAllAlertsQuery({
    page: 1,
    limit: 20,
    search: "",
  });

  const { data: todayAlertsData, isLoading: todayLoading } =
    useGetTodayAlertsQuery();

  const alerts = data?.data || [];

  // 🔥 Filter today alerts
  const today = new Date().toDateString();
  //   const todayAlerts = alerts.filter(
  //     (a) => new Date(a.createdAt).toDateString() === today
  //   );

  const otherAlerts = alerts.filter(
    (a) => new Date(a.createdAt).toDateString() !== today,
  );

  return (
    <div className="flex justify-center w-full bg-gray-100 min-h-screen">
      <div className="w-full md:w-[70%] bg-white relative">
        {/* <AlertHeader /> */}

        <div className="pt-20 px-4 space-y-6 w-full">
          {todayAlertsData?.data.length && todayAlertsData.data.length > 0 && (
            <TodayAlerts alerts={todayAlertsData.data} />
          )}

          <AlertList alerts={otherAlerts} />
        </div>
      </div>
    </div>
  );
};

export default AlertPage;
