import {
  ArrowSquareUpRightRegular,
  BranchCompareFilled,
  DeleteFilled,
  PowerFilled,
} from "@fluentui/react-icons";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  Button,
  useArrowNavigationGroup,
  useFocusableGroup,
  Image,
} from "@fluentui/react-components";
import type { JSXElement } from "@fluentui/react-components";
import { useLocation } from "react-router-dom";
// import type { UserType } from "../../util/type";
import React from "react";
import { useNavigate } from "react-router-dom";
import type { NotificationTypes, PostTypes } from "../../../utils/Types";
import {
  convertToStandardDate,
  convertToStandardDateTime,
} from "../../../utils/DateTimeConvertor";
// import UserDeactiveDialog from "../Dialogs/UserDeactiveDialog";
// import { useDeactivateUserMutation } from "../../services/userApi";
// import { showToast } from "../../util/toast";

import pic from "../../../assets/y9DpT.jpg";

const columns = [
  { columnKey: "image", label: "Image" },
  //   { columnKey: "title", label: "Title" },
  { columnKey: "content", label: "Content" },
  { columnKey: "likes", label: "Likes" },
  //   { columnKey: "phoneNumber", label: "Phone Number" },
  { columnKey: "createdBy", label: "CreatedBy" },
  { columnKey: "createdAt", label: "CreatedAt" },
  { columnKey: "updatedAt", label: "UpdatedAt" },
  { columnKey: "actions", label: "Actions" },
];
interface PostTableProps {
  items: PostTypes[];
  onEdit: (item: PostTypes) => void;
  onDelete: (id: string) => void;
  onView?: (id: string) => void;
}

const PostTable: React.FC<PostTableProps> = ({
  items,
  onEdit,
  onDelete,
  onView,
}): JSXElement => {
  const keyboardNavAttr = useArrowNavigationGroup({ axis: "grid" });
  const focusableGroupAttr = useFocusableGroup({
    tabBehavior: "limited-trap-focus",
  });

  const [open, setOpen] = React.useState(false);
  const [selectedClinicId, setSelectedClinicId] = React.useState<string | null>(
    null,
  );

  const navigate = useNavigate();
  const location = useLocation();

  //   const [deactivateUser, { isLoading }] = useDeactivateUserMutation();

  async function handleConfirm(username: string): Promise<void> {
    try {
      //   await deactivateUser({ userName: username }).unwrap();
      //   showToast("User deactivated successfully","success")
    } catch (err: any) {
      //   showToast(err?.data?.message || "Failed to deactivate user", "error");
    }
    setOpen(false);
  }

  function handleRowClick(clinicId: string): void {}

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-w-[800px] max-w-full overflow-auto">
      <Table
        {...keyboardNavAttr}
        role="grid"
        aria-label="Table with grid keyboard navigation"
        style={{ minWidth: "620px" }}
        className="font-[Poppins]"
      >
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHeaderCell className="font-bold!" key={column.columnKey}>
                {column.label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item._id}
              onClick={() => handleRowClick(item._id)}
              style={{ cursor: "pointer" }}
              className="w-full!"
            >
              {location.pathname.includes("admin") && (
                <TableCell tabIndex={0} role="gridcell">
                  {/* {item.image} */}
                  <Image
                    src={`${item.image ? item.image : pic}`}
                    alt="Alert baner"
                    height={200}
                    width={250}
                    shape="rounded"
                  />
                </TableCell>
              )}
              {/* <TableCell tabIndex={0} role="gridcell">
                {item.title}
              </TableCell> */}
              <TableCell tabIndex={0} role="gridcell">
                {truncateText(item.content, 60)}
              </TableCell>
              {/* {location.pathname.includes("admin") && (
                <TableCell tabIndex={0} role="gridcell">
                  {item.roleId == "2" ? (
                    <div className="bg-purple-300 text-white text-[12px] rounded-2xl w-max px-3">
                      Doctor
                    </div>
                  ) : item.roleId == "3" ? (
                    <div className="bg-pink-300 text-white text-[12px] rounded-2xl w-max px-3">
                      Nurse
                    </div>
                  ) : (
                    <div className="bg-blue-300 text-white text-[12px] rounded-2xl w-max px-3">
                      Receptionist
                    </div>
                  )}
                </TableCell>
              )} */}
              <TableCell tabIndex={0} role="gridcell">
                {item.likes.length}
              </TableCell>
              <TableCell tabIndex={0} role="gridcell">
                {item.user.firstName} {item.user.lastName}
              </TableCell>
              <TableCell tabIndex={0} role="gridcell">
                {convertToStandardDateTime(item.createdAt as unknown as string)}
              </TableCell>
              <TableCell tabIndex={0} role="gridcell">
                {convertToStandardDateTime(item.updatedAt as unknown as string)}
              </TableCell>
              <TableCell
                tabIndex={0}
                role="gridcell"
                // className="flex! flex-row! items-center! gap-2! justify-center!"
              >
                <div
                  className="hover:text-red-500 hover:bg-red-500/10 w-max rounded p-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();

                    const confirmDelete = window.confirm(
                      "Are you sure you want to delete this alert?",
                    );

                    if (confirmDelete) {
                      onDelete(item._id);
                    }
                  }}
                >
                  <DeleteFilled fontSize={20} />
                </div>
                // view btn
                <div
                  className="hover:text-blue-500 hover:bg-blue-500/10 w-max rounded p-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onView && onView(item._id);
                  }}
                >
                  <ArrowSquareUpRightRegular fontSize={22} />
                </div>
              </TableCell>
              {/* {location.pathname.includes("rec") && (
                <TableCell tabIndex={0} role="gridcell">
                  {item.doctor.Specialization.SpecializationDesc}
                </TableCell>
              )}
              {location.pathname.includes("rec") && (
                <TableCell tabIndex={0} role="gridcell">
                  {item.doctor.consultationFee}
                </TableCell>
              )} */}
              {/* {location.pathname.includes("admin") && (
                <TableCell tabIndex={0} role="gridcell">
                  {item.isActive ? (
                    <div className="bg-green-400/20 text-green-400 border border-green-400 font-bold text-[12px] rounded-2xl w-max px-3">
                      Active
                    </div>
                  ) : (
                    <div className="bg-red-400/20 text-red-400 border border-red-400 font-bold text-[12px] rounded-2xl w-max px-3">
                      Deactive
                    </div>
                  )}
                </TableCell>
              )} */}
              {/* {location.pathname.includes("admin") && item.isActive && (
                <TableCell role="gridcell" tabIndex={0} {...focusableGroupAttr}>
                  <TableCellLayout>
                    <Button
                      icon={<PowerFilled />}
                      aria-label="Close"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedClinicId(item.username);
                        setOpen(true);
                      }}
                    />
                  </TableCellLayout>
                </TableCell>
              )} */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <UserDeactiveDialog
        open={open}
        username={selectedClinicId}
        onClose={() => setOpen(false)}
        onConfirm={handleConfirm}
      /> */}
    </div>
  );
};

export default PostTable;
