import Nav from "./Nav";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div
      className="flex flex-col min-h-screen gap-6 bg-stone-100"
    >
      <Nav/>
      <main className="flex flex-col items-center justify-center w-full gap-12 px-12 pt-4 lg:gap-12">
        <Outlet />
      </main>
      {/* <Footer/> */}
    </div>
  );
};

export default Layout;
