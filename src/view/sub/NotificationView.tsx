import {
  CalendarMonthFilled,
  CalendarMonthRegular,
  SaveFilled,
  bundleIcon,
} from "@fluentui/react-icons";
import CustomBreadcrumb from "../../component/breadcrumb";
import NotificationTable from "../../component/table/notificationTable";
import {
  useCreateAlertMutation,
  useDeleteAlertMutation,
  useGetAllAlertsQuery,
  useUpdateAlertMutation,
} from "../../service/alertApi";
import { Button } from "@fluentui/react-components";
import React, { useEffect, useState } from "react";
import AppDrawer from "../../component/drawer/appDarwer";
import Input from "../../component/input";
import CustomTextarea from "../../component/textArea";
import type { NotificationTypes } from "../../utils/Types";
import Pagination from "../../component/pagination";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

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

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data, isLoading, isError, error } = useGetAllAlertsQuery({
    page,
    limit,
    search: debouncedSearch,
  });

  const [createAlert, { isLoading: isCreating, error: createError }] =
    useCreateAlertMutation();

  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);

  const [updateAlert, { isLoading: isUpdating }] = useUpdateAlertMutation();

  const [deleteAlert] = useDeleteAlertMutation();

  const currentUserId = useSelector((state: RootState) => state.auth.user?.id);

  const currentUserEmail = useSelector(
    (state: RootState) => state.auth.user?.email,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // reset page on new search
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

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
      if (mode === "create") {
        await createAlert(formData).unwrap();
      } else if (mode === "edit" && selectedAlertId) {
        await updateAlert({
          id: selectedAlertId,
          body: formData,
        }).unwrap();
      }

      setDrawerOpen(false);

      setFormData({
        title: "",
        description: "",
        image: "",
      });

      setMode("create");
      setSelectedAlertId(null);

      console.log("Alert Created Successfully ✅");
    } catch (err) {
      alert("Failed to create alert. Please try again.");
      console.error("Failed:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAlert(id).unwrap();
    } catch (err) {
      alert("Failed to delete alert");
    }
  };

  const handleCreateBtnAction = async () => {
    setMode("create");
    setSelectedAlertId(null);
    setFormData({
      title: "",
      description: "",
      image: "",
    });
    setDrawerOpen(true);
  };

  const handleUpdateBtnAction = async (item: NotificationTypes) => {
    setMode("edit");
    setSelectedAlertId(item._id);
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image || "",
    });
    setDrawerOpen(true);
  };

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <section className="flex flex-col gap-3 p-4!">
        <CustomBreadcrumb items={breadcrumbItems} />

        <div className="text-[#3d5306] text-[30px] md:text-[35px] ml-1">
          Notification Manager - {currentUserEmail} - {currentUserId}
        </div>

        <div className="text-[#3d5306] text-[30px] md:text-[35px] ml-1 flex flex-row justify-between items-center">
          {/* filters here */}
          <div className="w-[300px]">
            <Input
              type="text"
              placeholder="Search by title or description..."
              value={search}
              callBack={handleSearchChange}
              id={"search"}
              required={false}
              borderRequired={true}
              validate={true}
            />
          </div>

          <Button
            appearance="primary"
            className="bg-[#2E7D32]! hover:bg-[#66BB6A]!"
            // onClick={() => setDrawerOpen(!drawerOpen)}
            onClick={() => handleCreateBtnAction()}
          >
            Add New
          </Button>
        </div>

        {/* new altert form from drawer */}

        <AppDrawer
          open={drawerOpen}
          setOpen={setDrawerOpen}
          title={mode === "create" ? "Create New Alert" : "Update Alert"}
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
                className="bg-[#2E7D32]! gap-2 hover:bg-[#66BB6A]! w-full"
                onClick={() => handleSubmit()}
              >
                {<SaveFilled fontSize={20} />}
                {mode === "create" ? "Create Alert" : "Update Alert"}
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
          <NotificationTable
            items={data?.data || []}
            onEdit={handleUpdateBtnAction}
            onDelete={handleDelete}
          />

          <Pagination
            currentPage={page}
            totalPages={data?.totalPages || 1}
            limit={limit}
            onPageChange={(newPage) => setPage(newPage)}
            onLimitChange={(newLimit) => {
              setLimit(newLimit);
              setPage(1); // reset page when limit changes
            }}
          />
        </div>
      </section>
    </>
  );
};

export default NotificationView;
