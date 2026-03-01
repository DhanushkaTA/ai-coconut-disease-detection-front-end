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
import React, { useEffect, useRef, useState } from "react";
import AppDrawer from "../../component/drawer/appDarwer";
import Input from "../../component/input";
import CustomTextarea from "../../component/textArea";
import type { NotificationTypes } from "../../utils/Types";
import Pagination from "../../component/pagination";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

import pic from "../../assets/y9DpT.jpg";

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);

const breadcrumbItems = [
  // { text: "Home", link: "/" },
  { text: "Dashboard", link: "/dashboard" },
  { text: "Notification", icon: <CalendarMonth /> }, // last item (no link)
];

const NotificationView = () => {
  const fileChooser: any = useRef(null);
  const imageRef: any = useRef(null);
  const [productImage, setProductImage] = useState<any>(null);
  const [imgLoading, setImgLoading] = useState(false);

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
      setImgLoading(true);
      let imageUrl = formData.image;
      // await uploadImageToCloudinary();

      // Only upload if a new image was selected
      if (productImage) {
        // First upload the image to Cloudinary and get the URL, then include that URL in the formData before sending it to the backend
        const uploadedUrl = await uploadImageToCloudinary();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const finalData = {
        ...formData,
        image: imageUrl,
      };

      if (mode === "create") {
        await createAlert(finalData).unwrap();
      } else if (mode === "edit" && selectedAlertId) {
        console.log(finalData);

        await updateAlert({
          id: selectedAlertId,
          body: finalData,
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
    setProductImage(null);
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
    setProductImage(null);
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

  function setImage(event: any | undefined) {
    console.log(event.target.files[0]);

    const imgFile = event.target.files[0];

    if (imgFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setProductImage(imgFile);
        if (imageRef.current) {
          imageRef.current.src = reader.result;
        }
      };

      reader.readAsDataURL(imgFile);
    }
  }

  function clickProfile() {
    fileChooser.current.click();
  }

  const uploadImageToCloudinary = async (): Promise<string | null> => {
    try {
      setImgLoading(true);

      const data = new FormData();
      data.append("file", productImage);
      data.append("upload_preset", "final_project");
      data.append("cloud_name", "dbqbeuvaw");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dbqbeuvaw/image/upload",
        {
          method: "POST",
          body: data,
        },
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();

      console.log("Upload successful:", result);

      return result.secure_url;

      // setFormData((prev) => ({
      //   ...prev,
      //   image: result.secure_url,
      // }));
    } catch (error) {
      console.error("Upload failed:", error);
      return null;
    } finally {
      setImgLoading(false);
    }
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

            <div className={"w-full h-max mb-3"}>
              <label className={"text-[12px] font-medium text-[#2e2e2e]"}>
                Notification Image
              </label>
              <div className={"w-full h-max"}>
                <div
                  className={
                    "w-full h-[250px] overflow-hidden rounded-md " +
                    " border-[3px] border-dashed border-[#229b5e]  mt-2 "
                  }
                >
                  <img
                    id={"profilePic"}
                    // src={`${
                    //   productImage ? URL.createObjectURL(productImage) : pic
                    // }`}
                    src={`${
                      // mode === "create" ? productImage ? productImage : URL.createObjectURL(productImage) : pic
                      mode != "create"
                        ? formData.image
                          ? formData.image
                          : pic
                        : productImage
                          ? URL.createObjectURL(productImage)
                          : pic
                    }`}
                    alt={"profile"}
                    title={"notifcation image"}
                    className={
                      "w-full h-[250px] bg-[#ddf5df] cursor-pointer rounded-md hover:scale-110 transition-all"
                    }
                    onClick={clickProfile}
                    ref={imageRef}
                  />
                </div>
              </div>
            </div>

            <div>
              {imgLoading && (
                <p className="text-sm text-gray-500">Uploading image...</p>
              )}
            </div>

            <input
              ref={fileChooser}
              id={"fileSelect"}
              type={"file"}
              className={"hidden"}
              onChange={(event) => setImage(event)}
            />

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
