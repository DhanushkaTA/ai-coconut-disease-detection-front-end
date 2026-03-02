import { useAuth } from "../../hook/useAuth";
import { useEffect, useRef, useState } from "react";
import AppDrawer from "../drawer/appDarwer";
import { Button } from "@fluentui/react-components";

import {
  CalendarMonthFilled,
  CalendarMonthRegular,
  SaveFilled,
  bundleIcon,
} from "@fluentui/react-icons";

import pic from "../../assets/y9DpT.jpg";
import CustomTextarea from "../textArea";
import {
  useCreatePostMutation,
  useGetPostByIdQuery,
} from "../../service/postApi";

const PostDrawer = ({ drawerOpen, setOpen, postId }: any) => {
  const fileChooser: any = useRef(null);
  const imageRef: any = useRef(null);
  const [productImage, setProductImage] = useState<any>(null);
  const [imgLoading, setImgLoading] = useState(false);

  const [formData, setFormData] = useState({
    content: "",
    image: "",
  });
  //   const [drawerOpen, setDrawerOpen] = useState(false);

  const [createPost, { isLoading: isCreating, error: createError }] =
    useCreatePostMutation();

  const { data, isLoading } = useGetPostByIdQuery(postId!, {
    skip: !postId,
  });

  const [mode, setMode] = useState<"create" | "edit">(
    postId ? "edit" : "create",
  );
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);

  //   const [updateAlert, { isLoading: isUpdating }] = useUpdateAlertMutation();

  //   const currentUserId = useSelector((state: RootState) => state.auth.user?.id);

  const user = useAuth();
  const currentUserId = user?.id;
  const currentUserEmail = user?.email;

  // set form data when in edit mode
  useEffect(() => {
    if (mode === "edit" && data?.data) {
      setFormData({
        content: data.data.content,
        image: data.data.image || "",
      });
    }
  }, []);

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
        await createPost(finalData).unwrap();
      } else if (mode === "edit" && selectedAlertId) {
        console.log(finalData);

        // await updateAlert({
        //   id: selectedAlertId,
        //   body: finalData,
        // }).unwrap();
      }

      //   setDrawerOpen(false);
      setOpen(false);

      setFormData({
        content: "",
        image: "",
      });

      setMode("create");
      setSelectedAlertId(null);

      console.log("Post Created Successfully ✅");
    } catch (err) {
      alert("Failed to create post. Please try again.");
      console.error("Failed:", err);
    }
  };

  //   const handleCreateBtnAction = async () => {
  //     setProductImage(null);
  //     setMode("create");
  //     setSelectedAlertId(null);
  //     setFormData({
  //       title: "",
  //       description: "",
  //       image: "",
  //     });
  //     setDrawerOpen(true);
  //   };

  //   const handleUpdateBtnAction = async (item: NotificationTypes) => {
  //     setProductImage(null);
  //     setMode("edit");
  //     setSelectedAlertId(item._id);
  //     setFormData({
  //       title: item.title,
  //       description: item.description,
  //       image: item.image || "",
  //     });
  //     setDrawerOpen(true);
  //   };

  //   const handleSearchChange = (
  //     e: React.ChangeEvent<HTMLInputElement>,
  //     type: string,
  //   ) => {
  //     setSearch(e.target.value);
  //   };

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

      const fdata = new FormData();
      fdata.append("file", productImage);
      fdata.append("upload_preset", "final_project");
      fdata.append("cloud_name", "dbqbeuvaw");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dbqbeuvaw/image/upload",
        {
          method: "POST",
          body: fdata,
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
      <AppDrawer
        open={drawerOpen}
        setOpen={setOpen}
        title={mode === "create" ? "Create New Post" : "Update Post"}
      >
        <div className="space-y-4">
          {/* <div>
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
          </div> */}

          <div>
            <CustomTextarea
              id="content"
              label="Content"
              placeholder="Enter content"
              value={formData.content}
              required
              validate={true}
              message="Content is required"
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
              {mode === "create" ? "Create Post" : "Update Post"}
            </Button>
          </div>

          <div>
            <Button
              appearance="primary"
              className="bg-white! hover:bg-[#66BB6A]! w-full text-black! border border-gray-300! hover:bg-gray-50!"
              onClick={() => setOpen(false)}
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
    </>
  );
};

export default PostDrawer;
