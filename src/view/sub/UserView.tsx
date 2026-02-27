import type React from "react";
import { LayerDiagonalPersonRegular } from "@fluentui/react-icons";
import CustomBreadcrumb from "../../component/breadcrumb";
import Input from "../../component/input";
import { useEffect, useState } from "react";
import UserTable from "../../component/table/userTable";
import Pagination from "../../component/pagination";
import { useDeleteUserMutation, useGetUsersQuery } from "../../service/userApi";
import { CustomComboBox } from "../../component/combobox/combobox";

const breadcrumbItems = [
  // { text: "Home", link: "/" },
  { text: "Dashboard", link: "/dashboard" },
  { text: "User", icon: <LayerDiagonalPersonRegular /> }, // last item (no link)
];

const roleOptions = [
  { key: "", text: "All Roles" },
  { key: "admin", text: "Admin" },
  { key: "moderator", text: "Moderator" },
  { key: "user", text: "User" },
];

const UserView: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("");

  const { data, isLoading } = useGetUsersQuery({
    page,
    limit,
    search,
    role: selectedRole,
  });
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // reset page on new search
    }, 1000);

    return () => clearTimeout(timer);
  }, [search]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    setSearch(e.target.value);
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id).unwrap();
      alert("User deleted successfully");
    } catch (error: any) {
      alert(error?.data?.message || "Failed to delete user");
    }
  };

  return (
    <>
      <section className="flex flex-col gap-3">
        <CustomBreadcrumb items={breadcrumbItems} />

        <div className="text-[#3d5306] text-[30px] md:text-[35px] ml-1">
          User Manager
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

          <div className="w-[250px]">
            <CustomComboBox
              // label="Filter by Role"
              options={roleOptions}
              selectedKey={selectedRole}
              placeholder="Select role"
              onChange={(value) => {
                setSelectedRole(value || "");
                setPage(1); // reset page
              }}
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
          <UserTable
            items={data?.data || []}
            // onEdit={handleUpdateBtnAction}
            onDelete={handleDeleteUser}
          />

          <Pagination
            currentPage={page}
            totalPages={data?.totalPages || 1}
            // totalPages={1}
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

export default UserView;
