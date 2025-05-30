import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

function ItemList({ items, setItems }) {
  const handleChange = (id, field, value) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, [field]: field === "name" ? value : Number(value) }
          : item
      )
    );
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: "",
      quantity: 1,
      price: 0,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Item List</h3>

      {/* Header */}
      <div className="flex items-center justify-between text-gray-500 font-semibold">
        <span className="w-[210px]">Item Name</span>
        <span className="w-[100px] text-center">Qty.</span>
        <span className="w-[100px] text-center">Price</span>
        <span className="w-[80px] text-center">Total</span>
        <span className="w-[40px]"></span>
      </div>

      <ul className="flex flex-col gap-5 mt-5">
        {items.map(({ id, name, quantity, price }) => (
          <li key={id} className="flex items-center justify-between gap-2">
            <Input
              onChange={(e) => handleChange(id, "name", e.target.value)}
              className="w-[210px]"
              type="text"
              value={name}
              placeholder="Item Name"
            />
            <Input
              onChange={(e) => handleChange(id, "quantity", e.target.value)}
              className="w-[100px]"
              type="number"
              value={quantity}
              placeholder="Qty"
              min={1}
            />
            <Input
              onChange={(e) => handleChange(id, "price", e.target.value)}
              className="w-[100px]"
              type="number"
              value={price}
              placeholder="Price"
              min={0}
            />
            <span className="w-[80px] text-center">
              {(price * quantity).toFixed(2)}
            </span>
            <Button
              onClick={() => removeItem(id)}
              variant="destructive"
              size="icon"
              type="button"
            >
              <Trash2 />
            </Button>
          </li>
        ))}
      </ul>

      <Button
        onClick={addItem}
        type="button"
        variant="secondary"
        className="flex items-center gap-2 w-full"
      >
        <PlusCircle className="w-4 h-4" /> Add Item
      </Button>
    </div>
  );
}

export default ItemList;
