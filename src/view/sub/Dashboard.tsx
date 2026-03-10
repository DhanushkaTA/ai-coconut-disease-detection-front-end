import { useTranslation } from "react-i18next";
import CustomBreadcrumb from "../../component/breadcrumb";
import { ContentViewColor } from "@fluentui/react-icons";
import DashboardMiddleSection from "../../component/dashbord-cards/DashboardMiddleSection";

const breadcrumbItems = [
  // { text: "Home", link: "/" },
  { text: "Dashboard", icon: <ContentViewColor />, link: "/dashboard" },
  // { text: "Notification", icon: <ContentViewColor /> }, // last item (no link)
];

const cards = [
  {
    titleTop: "Total",
    titleMain: "Users",
    value: "24",
    subText: "Registered",
    gradient: "from-emerald-400 via-green-400 to-teal-400",
    icon: "👥",
  },
  {
    titleTop: "Total",
    titleMain: "Posts",
    value: "12",
    subText: "Total",
    gradient: "from-blue-500 via-sky-400 to-cyan-400",
    icon: "📅",
  },
  {
    titleTop: "New",
    titleMain: "Alerts",
    value: "15",
    subText: "Today",
    gradient: "from-orange-400 via-amber-400 to-orange-500",
    icon: "👨‍⚕️",
  },
  {
    titleTop: "Total",
    titleMain: "prediction",
    value: "14",
    subText: "By Today",
    gradient: "from-purple-500 via-violet-400 to-indigo-400",
    icon: "👥",
  },
];

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="flex flex-col gap-3 px-3!">
        <CustomBreadcrumb items={breadcrumbItems} />

        <div className="text-[#3d5306] text-[30px] md:text-[40px] ml-1 mb-5">
          {t("welcome")}!{/* - {currentUserEmail} - {currentUserId} */}
        </div>

        {/* Card section here */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-r ${card.gradient} p-6 text-white shadow-lg min-h-[170px] transition-all duration-300 hover:scale-[1.05] hover:shadow-2xl hover:-translate-y-1`}
            >
              {/* Glow overlay */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition duration-300"></div>

              {/* decorative circles */}
              <div className="absolute -right-6 top-6 h-24 w-24 rounded-full bg-white/10 group-hover:scale-125 transition duration-500" />
              <div className="absolute right-6 bottom-4 h-16 w-16 rounded-full bg-white/10 group-hover:scale-125 transition duration-500" />

              {/* content */}
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-semibold opacity-95">
                      {card.titleTop}
                    </p>

                    <h3 className="text-3xl font-bold leading-tight">
                      {card.titleMain}
                    </h3>
                  </div>

                  {/* icon */}
                  <span className="text-3xl opacity-90 transition-transform duration-300 group-hover:scale-125">
                    {card.icon}
                  </span>
                </div>

                {/* bottom section */}
                <div className="mt-6 border-t border-white/40 pt-4 flex items-end justify-between">
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-bold leading-none">
                      {card.value}
                    </span>

                    <span className="pb-1 text-lg font-medium opacity-90">
                      {card.subText}
                    </span>
                  </div>

                  <div className="rounded-full border border-white/30 px-3 py-1 text-sm font-medium bg-white/10 transition group-hover:bg-white/20">
                    ↗
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* middle section here  max-w-7xl*/}
        <div className="mx-auto w-full  space-y-6">
          {/* <DashboardStatCards /> */}
          <DashboardMiddleSection />
        </div>
      </section>
    </>
  );
};

export default Dashboard;
