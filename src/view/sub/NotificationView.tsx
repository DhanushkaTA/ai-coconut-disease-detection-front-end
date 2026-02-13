import {
  CalendarMonthFilled,
  CalendarMonthRegular,
  bundleIcon,
} from "@fluentui/react-icons";
import CustomBreadcrumb from "../../component/Breadcrumb";

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const breadcrumbItems = [
  // { text: "Home", link: "/" },
  { text: "Dashboard", link: "/dashboard" },
  { text: "Notification", icon: <CalendarMonth /> }, // last item (no link)
];

const NotificationView = () => {
  return (
    <>
    <section>
        <CustomBreadcrumb items={breadcrumbItems} />
    </section>
      
     <div className="">
        Notification Manager
     </div>
    </>
  );
};

export default NotificationView;
