import {
  CalendarMonthFilled,
  CalendarMonthRegular,
  bundleIcon,
} from "@fluentui/react-icons";
import CustomBreadcrumb from "../../component/Breadcrumb";
import NotificationTable from "../../component/table/notificationTable";
import { useGetAllAlertsQuery } from "../../service/alertApi";

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const breadcrumbItems = [
  // { text: "Home", link: "/" },
  { text: "Dashboard", link: "/dashboard" },
  { text: "Notification", icon: <CalendarMonth /> }, // last item (no link)
];

const NotificationView = () => {
  const { data, isLoading, isError, error } = useGetAllAlertsQuery();

  return (
    <>
      <section className="flex flex-col gap-3">
        <CustomBreadcrumb items={breadcrumbItems} />

        <div className="text-[#3d5306] text-[30px] md:text-[35px] ml-1">
          Notification Manager
        </div>

        {/* main containt in here */}
        <div className="bg-white mt-9 w-full overflow-auto">
          <NotificationTable items={data ? data : []} />
        </div>
      </section>
    </>
  );
};

export default NotificationView;
