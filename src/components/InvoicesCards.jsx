import React, { useEffect, useState } from "react";
import { getInvoices } from "../reques/index";
import CardSkleton from "./CardSkleton";
import MyCard from "./MyCard";
import useAppStore from "../lib/Zustend";
import NotFoundComponent from "./NotFoundComponent";

function InvoicesCards() {
  const filter = useAppStore((state) => state.filter);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getInvoices("/invoices", filter)
      .then((res) => {
        const filteredInvoices = res.filter((item) =>
          ["draft", "paid", "pending"].includes(item.status)
        );
        setInvoices(filteredInvoices);
      })
      .catch((err) => {
        setError(err.message || "Ma'lumotlarni yuklab bo'lmadi");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter]);

  if (loading) {
    return (
      <div className="flex justify-center flex-col gap-4 mt-8">
        <CardSkleton />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-[#0C0E16] dark:text-white">
        {error}
      </p>
    );
  }

  if (invoices.length === 0) {
    return <NotFoundComponent />;
  }

  return (
    <div className="max-w-[730px] mx-auto flex flex-col gap-4 mt-10">
      {invoices.map((invoice) => (
        <MyCard key={invoice.id} {...invoice} />
      ))}
    </div>
  );
}

export default InvoicesCards;
