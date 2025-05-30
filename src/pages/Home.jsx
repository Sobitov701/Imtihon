import Form from "../components/Form";
import Header from "../components/Header";
import InvoicesCards from "../components/InvoicesCards";
import ItemList from "../components/ItemList";
import SideBar from "../components/SideBar";

function Home() {
  return (
    <div className="flex min-h-screen bg-[#F8F8FB] dark:bg-[#141625] transition-colors duration-300">
      <SideBar />
      <div className="flex-1 p-6 md:p-10 text-black dark:text-white">
        <Header />
        <InvoicesCards />
      </div>
    </div>
  );
}

export default Home;
