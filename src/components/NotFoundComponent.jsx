import NotFaundImeg from "../assets/NotFaund.svg";
function NotFoundComponent() {
  return (
    <div className="flex flex-col items-center">
      <img
        className="mb-[50px] mt-[230x]"
        src={NotFaundImeg}
        alt="Not Faund Imeg"
        width={241}
        height={200}
      />
      <h1 className="font-bold text-[20px] text-[#0C0E16] items-center">
        There is nothing here
      </h1>
      <p className="items-center w-[205px] text-center leading-[15px]  font-medium text-[12px] text-[#888EB0]">
        {" "}
        Create an invoice by clicking the
        <span className="font-bold leading-[15px] ml-[2px] text-[12px]">
          New Invoice{" "}
        </span>{" "}
        button and get started
      </p>
    </div>
  );
}

export default NotFoundComponent;