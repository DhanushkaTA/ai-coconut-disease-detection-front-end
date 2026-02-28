import { useEffect, useState } from "react";
import CustomBreadcrumb from "../../component/breadcrumb";
import {
  CalendarMonthFilled,
  CalendarMonthRegular,
  SaveFilled,
  bundleIcon,
  DocumentOnePageMultipleSparkleRegular,
} from "@fluentui/react-icons";
import PostTable from "../../component/table/postTable";
import Pagination from "../../component/pagination";
import type { PostTypes } from "../../utils/Types";
import { useGetAllPostsQuery } from "../../service/postApi";
import { Button } from "@fluentui/react-components";
import Input from "../../component/input";
import PostDetailsDrawer from "../../component/postDetailsDrawer";
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const breadcrumbItems = [
  // { text: "Home", link: "/" },
  { text: "Dashboard", link: "/dashboard" },
  { text: "Post", icon: <DocumentOnePageMultipleSparkleRegular /> }, // last item (no link)
];
const PostView = () => {
  const [formData, setFormData] = useState({
    content: "",
    // description: "",
    image: "",
  });

  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [mode, setMode] = useState<"create" | "edit">("create");
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);

  //   const [drawerOpen, setDrawerOpen] = useState(false);

  const { data, isLoading } = useGetAllPostsQuery({
    page,
    limit,
    search: debouncedSearch,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // reset page on new search
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  const handleUpdateBtnAction = async (item: PostTypes) => {
    setMode("edit");
    setSelectedAlertId(item._id);
    setFormData({
      content: item.content,
      // description: item.description,
      image: item.image || "",
    });
    setDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      //   await deleteAlert(id).unwrap();
    } catch (err) {
      alert("Failed to delete alert");
    }
  };

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    setSearch(e.target.value);
  };

  const handleView = (id: string) => {
    setSelectedPostId(id);
    setDrawerOpen(true);
  };

  const currentUserId = useSelector(
        (state: RootState) => state.auth.user?.id
      );
    
      const currentUserEmail = useSelector(
        (state: RootState) => state.auth.user?.email
      );
  

  return (
    <>
      <section className="flex flex-col gap-3">
        <CustomBreadcrumb items={breadcrumbItems} />

        <div className="text-[#3d5306] text-[30px] md:text-[35px] ml-1">
          Post Manager - {currentUserEmail} - {currentUserId}
        </div>

        <div className="text-[#3d5306] text-[30px] md:text-[35px] ml-1 flex flex-row justify-between items-center">
          {/* filters here */}
          <div className="w-[300px]">
            <Input
              type="text"
              placeholder="Search by content or user name..."
              value={search}
              callBack={handleSearchChange}
              id={"search"}
              required={false}
              borderRequired={true}
              validate={true}
            />
          </div>

          {/* <Button
                    appearance="primary"
                    className="bg-[#2E7D32]! hover:bg-[#66BB6A]!"
                    // onClick={() => setDrawerOpen(!drawerOpen)}
                    onClick={() => handleCreateBtnAction()}
                  >
                    Add New
                  </Button> */}
        </div>

        {/* main containt in here */}
        <div className="bg-white mt-9 w-full overflow-auto">
          <PostTable
            items={data?.data || []}
            // items={[]}
            onEdit={handleUpdateBtnAction}
            onDelete={handleDelete}
            onView={handleView}
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

        <PostDetailsDrawer
          postId={selectedPostId}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      </section>
    </>
  );
};

export default PostView;
