import type React from "react";
import { LayerDiagonalPersonRegular } from "@fluentui/react-icons";
import CustomBreadcrumb from "../../component/breadcrumb";
import Input from "../../component/input";
import { useState } from "react";

const breadcrumbItems = [
  // { text: "Home", link: "/" },
  { text: "Dashboard", link: "/dashboard" },
  { text: "User", icon: <LayerDiagonalPersonRegular /> }, // last item (no link)
];

const UserView: React.FC = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    setSearch(e.target.value);
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

          {/* <Button
                            appearance="primary"
                            className="bg-[#2E7D32]! hover:bg-[#66BB6A]!"
                            // onClick={() => setDrawerOpen(!drawerOpen)}
                            onClick={() => handleCreateBtnAction()}
                          >
                            Add New
                          </Button> */}
        </div>
      </section>
    </>
  );
};

export default UserView;
