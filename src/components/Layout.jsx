import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex flex-col items-center min-w-full min-h-screen gap-6 bg-gray-100">
      <main className="flex flex-col items-center justify-center w-full gap-12 px-12 pt-4 lg:gap-12">
        <Outlet />
      </main>
      {/* <Footer/> */}
    </div>
  );
};

export default Layout;
