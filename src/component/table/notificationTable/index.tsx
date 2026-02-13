import { PowerFilled } from "@fluentui/react-icons";
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
} from "@fluentui/react-components";
import type { JSXElement } from "@fluentui/react-components";
import { useLocation } from "react-router-dom";
// import type { UserType } from "../../util/type";
import React from "react";
import { useNavigate } from "react-router-dom";
import type { NotificationTypes } from "../../../utils/Types";
// import UserDeactiveDialog from "../Dialogs/UserDeactiveDialog";
// import { useDeactivateUserMutation } from "../../services/userApi";
// import { showToast } from "../../util/toast";

const columns = [
  { columnKey: "image", label: "Image" },
  { columnKey: "title", label: "Title" },
  { columnKey: "description", label: "Description" },
  { columnKey: "likes", label: "Likes" },
  //   { columnKey: "phoneNumber", label: "Phone Number" },
  { columnKey: "createdBy", label: "CreatedBy" },
  { columnKey: "createdAt", label: "CreatedAt" },
  { columnKey: "updatedAt", label: "UpdatedAt" },
  { columnKey: "actions", label: "Actions" },
];
interface NotificationTableProps {
  items: NotificationTypes[];
}

const NotificationTable: React.FC<NotificationTableProps> = ({
  items,
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
                  {item.image}
                </TableCell>
              )}
              <TableCell tabIndex={0} role="gridcell">
                {item.title}
              </TableCell>
              <TableCell tabIndex={0} role="gridcell">
                {truncateText(item.description, 60)}
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
                {item.createdBy.firstName}
              </TableCell>
              <TableCell tabIndex={0} role="gridcell">
                {item.createdAt}
              </TableCell>
              <TableCell tabIndex={0} role="gridcell">
                {item.updatedAt}
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

export default NotificationTable;
