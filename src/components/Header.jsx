import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowDown, PlusCircleIcon } from "lucide-react";
import { queryGanarator } from "../lib/utils";
import useAppStore from "../lib/Zustend";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Form from "./Form";

function Header({ totalInvoices = 7 }) {
  const { setFilter } = useAppStore();
  const [items, setItems] = useState({
    draft: false,
    paid: false,
    pending: false,
  });

  const handleCheckboxChange = (key) => {
    setItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    const result = queryGanarator(items);
    setFilter(result);
  }, [items, setFilter]);

  return (
    <header className="bg-[#F8F8FB] dark:bg-[#141625] transition-colors">
      <div className="container max-w-[730px] mx-auto py-8 flex justify-between items-center">
        <div>
          <h1 className="font-bold text-3xl leading-none tracking-tight text-[#0C0E16] dark:text-white">
            Invoices
          </h1>
          <p className="text-[#888EB0] dark:text-[#DFE3FA] mt-1">
            {totalInvoices === 0
              ? "No invoices"
              : `There ${
                  totalInvoices === 1 ? "is" : "are"
                } ${totalInvoices} total invoice${
                  totalInvoices !== 1 ? "s" : ""
                }`}
          </p>
        </div>

        <div className="flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="p-0 h-auto text-black dark:text-white hover:bg-transparent focus:ring-1 focus:ring-[#7C5DFA]"
              >
                <span className="flex items-center gap-2 font-medium">
                  Filter <span className="hidden md:inline">by status</span>
                  <ArrowDown className="w-4 h-4 text-[#7C5DFA]" />
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-48 p-4 border border-[#DFE3FA] dark:border-[#252945] shadow-md bg-white dark:bg-[#1E2139]"
              align="end"
            >
              {Object.entries(items).map(([key, value]) => (
                <div key={key} className="flex items-center mb-3 last:mb-0">
                  <input
                    type="checkbox"
                    id={key}
                    checked={value}
                    onChange={() => handleCheckboxChange(key)}
                    className="h-4 w-4 rounded bg-white dark:bg-[#252945] border border-[#7C5DFA] text-[#7C5DFA] focus:ring-[#7C5DFA]"
                  />
                  <label
                    htmlFor={key}
                    className="ml-3 capitalize text-[#0C0E16] dark:text-white font-medium"
                  >
                    {key}
                  </label>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet>
            <SheetTrigger className="flex p-[17px] rounded-3xl gap-4 bg-[#7C5DFA] text-white">
              <PlusCircleIcon />
              New Invoice
            </SheetTrigger>

            <SheetContent
              className="pl-8 ml-[72px] min-w-[calc(80%-72px)] h-full overflow-y-auto"
              side="left"
            >
              <SheetHeader>
                <SheetTitle>Create New Invoice</SheetTitle>
                <SheetDescription>
                  <Form />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
