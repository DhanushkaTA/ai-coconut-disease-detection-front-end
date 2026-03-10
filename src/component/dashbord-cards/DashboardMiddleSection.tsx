import * as React from "react";
import { Calendar } from "@fluentui/react-calendar-compat";

type PatientItem = {
  id: number;
  name: string;
  subtitle: string;
  avatar: string;
  status: string;
  statusColor: string;
};

const recentPatients: PatientItem[] = [
  {
    id: 1,
    name: "Coconut Mite Attack Reported in Kurunegala",
    subtitle: "20m ago · ",
    // avatar: "https://i.pravatar.cc/80?img=12",
    avatar: "https://example.com/images/coconut-mite-kurunegala.jpg",
    status: "Likes 100",
    statusColor: "text-emerald-500",
  },
  {
    id: 2,
    name: "Coconut Harvest Season Begins in Puttalam...",
    subtitle: "20m ago · ",
    // avatar: "https://i.pravatar.cc/80?img=13",
    avatar: "https://i.pravatar.cc/80?img=13",
    status: "Likes 200",
    statusColor: "text-orange-400",
  },
  {
    id: 3,
    name: "කුළු බෝගයට බලපාන පොල් මයිට් ආක්‍රමණය",
    subtitle: "20m ago · ",
    // avatar: "https://i.pravatar.cc/80?img=32",
    avatar: "https://i.pravatar.cc/80?img=32",
    status: "Likes 20",
    statusColor: "text-emerald-500",
  },
  {
    id: 4,
    name: "වර්ෂාපතනය වැඩි වීමෙන් පොල් වගාවට වාසි",
    subtitle: "20m ago · Room 412",
    // avatar: "https://i.pravatar.cc/80?img=15",
    avatar: "https://i.pravatar.cc/80?img=15",
    status: "Likes 50",
    statusColor: "text-amber-500",
  },
];

const quickStatusList: PatientItem[] = [
  {
    id: 1,
    name: "Tharindu Dhanushka",
    subtitle: "20m ago · dhanu909ab@gamil.com",
    avatar:
      "https://res.cloudinary.com/dbqbeuvaw/image/upload/v1772346186/axvb52mldr9vt9jgjz1t.jpg",
    status: "",
    statusColor: "text-emerald-500",
  },
  {
    id: 2,
    name: "Ishara Herath",
    subtitle: "20m ago · ishara@gmail.com",
    avatar: "https://i.pravatar.cc/80?img=32",
    status: "",
    statusColor: "text-orange-400",
  },
  {
    id: 3,
    name: "Sawan Menuka",
    subtitle: "20m ago · menuka@gmail.com",
    avatar: "https://i.pravatar.cc/80?img=18",
    status: "",
    statusColor: "text-emerald-500",
  },
  {
    id: 4,
    name: "Sajith Bandara",
    subtitle: "20m ago · sajith101@gmail.com",
    avatar: "https://i.pravatar.cc/80?img=15",
    status: "",
    statusColor: "text-emerald-500",
  },
  {
    id: 5,
    name: "In Treatment",
    subtitle: "20m ago · Room 522",
    avatar: "https://i.pravatar.cc/80?img=20",
    status: "Log 10",
    statusColor: "text-orange-400",
  },
];

function SectionCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[28px] bg-white p-5 shadow-sm ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[28px] font-bold tracking-tight text-slate-800 md:text-xl">
          {title}
        </h3>
        <button className="text-sm text-slate-400 hover:text-slate-600">
          ⋯
        </button>
      </div>
      {children}
    </div>
  );
}

function PatientRow({ item }: { item: PatientItem }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-slate-100 py-4 last:border-b-0">
      <div className="flex min-w-0 items-center gap-3">
        <img
          src={item.avatar}
          alt={item.name}
          className="h-11 w-14 rounded-lg object-cover"
        />
        <div className="min-w-0">
          <p className="truncate text-[15px] font-semibold text-slate-800">
            {item.name}
          </p>
          <p className="truncate text-xs text-slate-400">{item.subtitle}</p>
        </div>
      </div>

      <span className={`shrink-0 text-sm font-semibold ${item.statusColor}`}>
        {item.status}
      </span>
    </div>
  );
}

const DashboardMiddleSection = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.1fr_1.4fr_1fr]">
      {/* Calendar */}
      <SectionCard title=" My Calendar">
        <div className="mini-green-calendar">
          <Calendar
            value={selectedDate}
            onSelectDate={(date) => date && setSelectedDate(date)}
            showGoToToday={false}
            highlightCurrentMonth
            isMonthPickerVisible={false}
          />
        </div>
      </SectionCard>

      {/* Middle list */}
      <SectionCard title="Recent Alerts">
        <div className="overflow-y-auto max-h-[400px] custom-scrollbar">
          {recentPatients.map((item) => (
            <PatientRow key={item.id} item={item} />
          ))}
        </div>
      </SectionCard>

      {/* Right list */}
      <SectionCard title="Recent Users">
        <div className="overflow-y-auto max-h-[420px] custom-scrollbar">
          {quickStatusList.map((item) => (
            <PatientRow key={item.id} item={item} />
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default DashboardMiddleSection;
