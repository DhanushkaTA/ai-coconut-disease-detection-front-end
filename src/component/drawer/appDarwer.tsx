import * as React from "react";
import {
  OverlayDrawer,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerBody,
  Button,
} from "@fluentui/react-components";
import { Dismiss24Regular } from "@fluentui/react-icons";
import { useRestoreFocusSource } from "@fluentui/react-components";

interface AppDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  children: React.ReactNode;
}

const AppDrawer: React.FC<AppDrawerProps> = ({
  open,
  setOpen,
  title,
  children,
}) => {
  const restoreFocusSourceAttributes = useRestoreFocusSource();

  return (
    <OverlayDrawer
      position="end"
      open={open}
      onOpenChange={(_, { open }) => setOpen(open)}
      {...restoreFocusSourceAttributes}
      className="
        h-screen!
        w-screen! 
        md:w-[40vw] !
        md:max-w-[600px]!
      "
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              aria-label="Close"
              icon={<Dismiss24Regular />}
              onClick={() => setOpen(false)}
            />
          }
        >
          {title}
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody>{children}</DrawerBody>
    </OverlayDrawer>
  );
};

export default AppDrawer;
