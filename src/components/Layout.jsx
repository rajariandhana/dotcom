import Nav from "./Nav";
import Footer from "./Footer";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div
      className="flex flex-col items-center min-h-screen gap-6 bg-stone-100"
    >
      <Nav/>
      <main className="flex flex-col items-center justify-center max-w-4xl gap-12 px-12">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default Layout;
