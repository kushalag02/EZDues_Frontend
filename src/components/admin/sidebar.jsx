import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Menu,
  GraduationCap,
  Landmark,
  ShieldPlus,
  CircleCheckBig,
  UserRoundCheck,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SidebarContent = () => {
  const handleAutoApprove = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/admin/auto-approve/",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to initiate auto approval");
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error initiating auto approval:", error);
    }
  };
  const handleMakeBatchEligible = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/admin/make-final-year-eligible/",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to make the batch eligible ");
      }
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error making the batch eligible :", error);
    }
  };
  return (
    <>
      <div className="flex flex-col items-start justify-center gap-4">
        <NavLink
          to={"/admin"}
          className={({ isActive }) =>
            isActive
              ? "text-md p-3 bg-slate-200 w-full rounded-md flex items-center"
              : "text-md p-3 w-full rounded-md flex items-center"
          }
          end={true}
        >
          <Landmark className="mx-2" size={20} />
          <p>Departments</p>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-md p-3 bg-slate-200 w-full rounded-md flex items-center"
              : "text-md p-3 w-full rounded-md flex items-center"
          }
          end={true}
          to={"/admin/admin-students"}
        >
          <GraduationCap className="mx-2" size={20} />
          <p>Students</p>
        </NavLink>
      </div>
      <div className="flex flex-col gap-5 ml-5">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-md w-full rounded-md text-[#00008B]"
              : "text-md w-full rounded-md text-[#538ff8]"
          }
          end={true}
          to="/admin/create-admin"
        >
          <ShieldPlus className="inline mx-2" size={20} />
          Create Admin
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "text-md w-full rounded-md text-[#00008B]"
              : "text-md w-full rounded-md text-[#538ff8]"
          }
          end={true}
          to="/admin"
          onClick={handleAutoApprove}
        >
          <CircleCheckBig className="inline mx-2" size={20} />
          Auto Approve
        </NavLink>
        <NavLink
          className="text-md w-full rounded-md text-[#538ff8]"
          to="/admin"
          onClick={handleMakeBatchEligible}
        >
          <UserRoundCheck className="inline mx-2" size={20} />
          Make Batch Eligible
        </NavLink>
      </div>
    </>
  );
};

const AdminSidebar = () => {
  return (
    <>
      <Sheet className="bg-white">
        <SheetTrigger className="md:hidden">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex flex-col justify-between pt-20"
        >
          <SidebarContent />
        </SheetContent>
      </Sheet>
      <div
        className="hidden md:flex fixed left-0 top-16 w-80 bg-white flex-col justify-between p-6"
        style={{ borderTop: "2px solid #E5E8EC", height: "calc(100vh - 4rem)" }}
      >
        <SidebarContent />
      </div>
    </>
  );
};

export default AdminSidebar;
