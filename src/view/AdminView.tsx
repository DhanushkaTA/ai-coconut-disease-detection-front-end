import { Outlet } from "react-router-dom";
import AppLayout from "../layout/AppLayout";

const AdminView = () => {

    return(
        <>
            <AppLayout>
                <Outlet />
            </AppLayout>
        </>
    );

}

export default AdminView;