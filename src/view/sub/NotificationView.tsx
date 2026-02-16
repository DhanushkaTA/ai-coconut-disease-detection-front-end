import {
  CalendarMonthFilled,
  CalendarMonthRegular,
  bundleIcon,
} from "@fluentui/react-icons";
import CustomBreadcrumb from "../../component/breadcrumb";
import NotificationTable from "../../component/table/notificationTable";
import {
  useCreateAlertMutation,
  useGetAllAlertsQuery,
} from "../../service/alertApi";
import { Button } from "@fluentui/react-components";
import React, { useState } from "react";
import AppDrawer from "../../component/drawer/appDarwer";
import Input from "../../component/input";
import CustomTextarea from "../../component/textArea";

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const breadcrumbItems = [
  // { text: "Home", link: "/" },
  { text: "Dashboard", link: "/dashboard" },
  { text: "Notification", icon: <CalendarMonth /> }, // last item (no link)
];

const NotificationView = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data, isLoading, isError, error } = useGetAllAlertsQuery();
  const [createAlert, { isLoading: isCreating, error: createError }] = useCreateAlertMutation();

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ): void => {
    const { id, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await createAlert(formData).unwrap();

      // Clear form
      setFormData({
        title: "",
        description: "",
        image: "",
      });

      console.log("Alert Created Successfully ✅");
    } catch (err) {
      alert("Failed to create alert. Please try again.");
      console.error("Failed:", err);
    }
  };

  return (
    <>
      <section className="flex flex-col gap-3">
        <CustomBreadcrumb items={breadcrumbItems} />

        <div className="text-[#3d5306] text-[30px] md:text-[35px] ml-1">
          Notification Manager
        </div>

        <div className="text-[#3d5306] text-[30px] md:text-[35px] ml-1 flex flex-row justify-between">
          {/* filters here */}
          <div></div>
          <Button
            appearance="primary"
            className="bg-[#2E7D32]! hover:bg-[#66BB6A]!"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            Add New
          </Button>
        </div>

        {/* new altert form from drawer */}

        <AppDrawer
          open={drawerOpen}
          setOpen={setDrawerOpen}
          title="Create New Alert"
        >
          <div className="space-y-4">
            <div>
              <Input
                id="title"
                type="text"
                placeholder="Title here"
                value={formData.title}
                label="Title"
                message="Title can't be empty"
                borderRequired={true}
                callBack={handleInput}
                required={true}
                validate={true}
              />
            </div>

            <div>
              <CustomTextarea
                id="description"
                label="Description"
                placeholder="Enter alert description"
                value={formData.description}
                required
                validate={true}
                message="Description is required"
                callBack={handleInput}
              />
            </div>

            <div>
              <Button
                appearance="primary"
                className="bg-[#2E7D32]! hover:bg-[#66BB6A]! w-full"
                onClick={() => handleSubmit()}
              >
                Save
              </Button>
            </div>

            <div>
              <Button
                appearance="primary"
                className="bg-white! hover:bg-[#66BB6A]! w-full text-black! border border-gray-300! hover:bg-gray-50!"
                onClick={() => setDrawerOpen(false)}
              >
                Cancel
              </Button>
            </div>

            {/* <p>This is inside drawer</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Example Button
            </button> */}
          </div>
        </AppDrawer>

        {/* main containt in here */}
        <div className="bg-white mt-9 w-full overflow-auto">
          <NotificationTable items={data ? data : []} />
        </div>
      </section>
    </>
  );
};

export default NotificationView;
