import React, { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ItemList from "./ItemList";
import { prepareData } from "../lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Form({ info = {}, onSubmit }) {
  const [items, setItems] = useState(info.items || []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const status = e.nativeEvent.submitter?.id || "pending";

    const result = {
      senderAddress: {
        street: formData.get("senderStreet") || "",
        city: formData.get("senderCity") || "",
        postcode: formData.get("senderPostcode") || "",
        country: formData.get("senderCountry") || "",
      },
      clientAddress: {
        street: formData.get("clientStreet") || "",
        city: formData.get("clientCity") || "",
        postcode: formData.get("clientPostcode") || "",
        country: formData.get("clientCountry") || "",
      },
      clientName: formData.get("clientName") || "",
      clientEmail: formData.get("clientEmail") || "",
      description: formData.get("description") || "",
      createdAt: formData.get("createdAt") || "",
      paymentTerms: formData.get("paymentTerms") || "",
      status,
      items: items.map((item) => {
        const quantity = Number(item.quantity) || 0;
        const price = Number(item.price) || 0;
        return {
          ...item,
          quantity,
          price,
          total: quantity * price,
        };
      }),
    };

    const readyData = prepareData(result);

    try {
      const method = info.id ? "PUT" : "POST";
      const endpoint = info.id
        ? `https://json-api.uz/api/project/fn36-5/invoices/${info.id}`
        : `https://json-api.uz/api/project/fn36-5/invoices`;

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(readyData),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Server response:", data);

      if (!info.id) {
        e.target.reset();
        setItems([]);
      }

      if (onSubmit) onSubmit(data);

      window.location.reload();
    } catch (error) {
      console.error("Xatolik:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 h-auto space-y-6">
      <div>
        <h3 className="text-2xl font-medium mb-4">Bill From</h3>
        <div className="flex flex-col gap-5">
          <InputBlock
            label="Street Address"
            name="senderStreet"
            defaultValue={info?.senderAddress?.street}
          />
          <div className="flex flex-wrap gap-5">
            <InputBlock
              name="senderCity"
              defaultValue={info?.senderAddress?.city}
            />
            <InputBlock
              name="senderPostcode"
              defaultValue={info?.senderAddress?.postcode}
            />
            <InputBlock
              name="senderCountry"
              defaultValue={info?.senderAddress?.country}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-medium mb-4">Bill To</h3>
        <div className="flex flex-col gap-5">
          <InputBlock
            label="Client’s Name"
            name="clientName"
            defaultValue={info.clientName}
          />
          <InputBlock
            label="Client’s Email"
            name="clientEmail"
            type="email"
            defaultValue={info.clientEmail}
          />
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-medium mb-4">Bill To Address</h3>
        <div className="flex flex-col gap-5">
          <InputBlock
            name="clientStreet"
            defaultValue={info?.clientAddress?.street}
          />
          <div className="flex flex-wrap gap-5">
            <InputBlock
              name="clientCity"
              defaultValue={info?.clientAddress?.city}
            />
            <InputBlock
              name="clientPostcode"
              defaultValue={info?.clientAddress?.postcode}
            />
            <InputBlock
              name="clientCountry"
              defaultValue={info?.clientAddress?.country}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-10 items-end">
        <div className="flex-1">
          <Label htmlFor="createdAt">Invoice Date</Label>
          <Input
            type="date"
            id="createdAt"
            name="createdAt"
            defaultValue={info.createdAt}
          />
        </div>
        <div>
          <Label htmlFor="paymentTerms">Payment Terms</Label>
          <Select name="paymentTerms" defaultValue={String(info.paymentTerms)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Terms</SelectLabel>
                <SelectItem value="1">Net 1 Day</SelectItem>
                <SelectItem value="7">Net 7 Days</SelectItem>
                <SelectItem value="14">Net 14 Days</SelectItem>
                <SelectItem value="30">Net 30 Days</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <InputBlock
        name="description"
        defaultValue={info.description}
        label="Project Description"
      />

      <ItemList items={items} setItems={setItems} />

      <div className="flex gap-3 justify-end mt-5">
        <Button type="submit" id="draft" variant="secondary">
          Save as Draft
        </Button>
        <Button type="submit" id="pending">
          Save & Send
        </Button>
      </div>
    </form>
  );
}

function InputBlock({ label, name, defaultValue, type = "text" }) {
  return (
    <div className="flex flex-col">
      {label && <Label htmlFor={name}>{label}</Label>}
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={label || name}
      />
    </div>
  );
}

export default Form;
