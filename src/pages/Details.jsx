import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  getInvoiceById,
  deleteInvoiceById,
  updateInvoice,
} from "../reques/index";
import SideBar from "../components/SideBar";
import StatusBadge from "../components/StatusBages";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import Form from "../components/Form";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingPaid, setLoadingPaid] = useState(false);
  const [error, setError] = useState(null);
  const [invoice, setInvoice] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getInvoiceById(id)
      .then((res) => setInvoice(res))
      .catch((err) => setError(err.message || "Invoice topilmadi"))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDelete() {
    try {
      setLoading(true);
      await deleteInvoiceById(id);
      alert("Invoice o'chirildi!");
      setIsDeleteOpen(false);
      setInvoice(null);
      navigate("/");
    } catch (e) {
      alert("O'chirishda xatolik: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdate(updatedData) {
    try {
      setLoading(true);
      const updatedInvoice = await updateInvoice(id, updatedData);
      setInvoice(updatedInvoice);
      setIsEditOpen(false);
    } catch (e) {
      alert("Yangilashda xatolik: " + e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkAsPaid() {
    try {
      setLoadingPaid(true);
      const updatedInvoice = await updateInvoice(id, {
        ...invoice,
        status: "Paid",
      });
      setInvoice(updatedInvoice);
    } catch (e) {
      alert("Statusni o‘zgartirishda xatolik: " + e.message);
    } finally {
      setLoadingPaid(false);
    }
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  if (!invoice) return <p className="text-center mt-10">Ma'lumot topilmadi</p>;

  const {
    id: invoiceId,
    description,
    senderAddress,
    clientAddress,
    clientEmail,
    clientName,
    createdAt,
    paymentDue,
    items,
    total,
    status,
  } = invoice;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="hidden md:block md:w-1/4">
        <SideBar />
      </div>

      <main className="w-full md:w-2/4 pt-16 px-4 md:px-6">
        {/* Status va action tugmalar */}
        <div className="bg-white dark:bg-zinc-900 rounded-md p-4 md:p-6 mb-6 shadow-md flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Status</span>
            <StatusBadge status={status} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" onClick={() => setIsEditOpen(true)}>
              Edit
            </Button>

            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Deletion?</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete invoice #{invoiceId}? This
                    action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-4 justify-end">
                  <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>
                  <Button variant="destructive" onClick={handleDelete}>
                    Delete
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              onClick={handleMarkAsPaid}
              disabled={loadingPaid || status === "Paid"}
            >
              {loadingPaid ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Mark as Paid"
              )}
            </Button>
          </div>
        </div>

        {/* Invoice tafsilotlari */}
        <div className="bg-white dark:bg-zinc-900 rounded-md shadow-md p-4 md:p-6 space-y-6">
          <div>
            <h2 className="font-bold text-lg">#{invoiceId}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>{senderAddress.street}</p>
            <p>{senderAddress.city}</p>
            <p>{senderAddress.postcode}</p>
            <p>{senderAddress.country}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Invoice Date</p>
              <p className="font-medium">{createdAt}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Payment Due</p>
              <p className="font-medium">{paymentDue}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Bill To</p>
              <p className="font-medium">{clientName}</p>
              <p>{clientAddress.street}</p>
              <p>{clientAddress.city}</p>
              <p>{clientAddress.postcode}</p>
              <p>{clientAddress.country}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Sent to</p>
              <p className="font-medium">{clientEmail}</p>
            </div>
          </div>

          {/* Items table */}
          <div className="bg-muted/40 rounded-md p-4">
            <div className="hidden sm:grid grid-cols-4 font-semibold text-sm mb-2">
              <span>Item Name</span>
              <span className="text-center">Qty.</span>
              <span className="text-center">Price</span>
              <span className="text-right">Total</span>
            </div>
            {items?.map((item, index) => {
              const price = Number(item.price);
              const quantity = Number(item.quantity);
              const totalItem = !isNaN(Number(item.total))
                ? Number(item.total)
                : price * quantity;

              return (
                <div
                  key={index}
                  className="grid grid-cols-1 sm:grid-cols-4 text-sm py-2 gap-2 border-b last:border-none"
                >
                  <span>{item.name}</span>
                  <span className="text-center sm:text-center">{quantity}</span>
                  <span className="text-center sm:text-center">
                    ${price.toFixed(2)}
                  </span>
                  <span className="text-right font-medium">
                    ${totalItem.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="bg-zinc-900 text-white p-4 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className="text-sm">Grand Total</span>
            <span className="text-xl font-bold">
              ${Number(total)?.toFixed(2) || "0.00"}
            </span>
          </div>
        </div>

        {/* Edit Modal */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent side="left">
            <DialogHeader>
              <DialogTitle>Edit Invoice #{invoiceId}</DialogTitle>
              <DialogDescription>
                Update your invoice details below.
              </DialogDescription>
            </DialogHeader>
            {/* Formga invoice objectini to‘liq info sifatida yuboriladi */}
            <Form info={invoice} onSubmit={handleUpdate} />
            <DialogClose asChild>
              <Button variant="ghost" className="mt-4">
                Cancel
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
