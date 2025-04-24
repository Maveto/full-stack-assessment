"use client";

import { useState } from "react";
import { Product } from "./ProductCard";
import { updateProductById } from "@/lib/api";

type AdminProductInfoProps = {
  product: Product;
  handleDelete: (id: number) => void;
  handleUpdate: (updatedProduct: Product) => void;
};

export default function AdminProductInfo({
  product,
  handleDelete,
  handleUpdate,
}: AdminProductInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewProduct((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stockQuantity" ? Number(value) : value,
    }));
  };

  const handleSave = async () => {
    try {
      updateProductById(newProduct.id, newProduct);
      handleUpdate(newProduct);
      setIsEditing(false);
    } catch (err) {
      console.error("Error al actualizar producto:", err);
    }
  };

  const renderCell = (
    label: string,
    content: JSX.Element | string | number | undefined
  ) => (
    <td className="p-3 block md:table-cell">
      <span className="font-bold md:hidden block mb-1">{label}</span>
      {content}
    </td>
  );

  return isEditing ? (
    <>
      {renderCell(
        "Name",
        <input
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          className="p-2 border bg-white rounded w-full border-foreground"
        />
      )}
      {renderCell(
        "Description",
        <input
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          className="p-2 border bg-white rounded w-full border-foreground"
        />
      )}
      {renderCell(
        "Price",
        <input
          name="price"
          type="number"
          value={newProduct.price}
          onChange={handleChange}
          className="p-2 border bg-white rounded w-full border-foreground"
        />
      )}
      {renderCell(
        "Stock",
        <input
          name="stockQuantity"
          type="number"
          value={newProduct.stockQuantity}
          onChange={handleChange}
          className="p-2 border bg-white rounded w-full border-foreground"
        />
      )}
      {renderCell(
        "Image URL",
        <input
          name="imageUrl"
          type="text"
          value={newProduct.imageUrl}
          onChange={handleChange}
          className="p-2 border bg-white rounded w-full border-foreground"
        />
      )}
      {renderCell(
        "Actions",
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          <button
            onClick={handleSave}
            className="text-white bg-green-600 hover:bg-green-800 px-3 py-1 rounded"
          >
            Save
          </button>
          <button
            onClick={() => {
              setNewProduct(product);
              setIsEditing(false);
            }}
            className="text-white bg-red-600 hover:bg-red-800 px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      )}
    </>
  ) : (
    <>
      {renderCell("Name", product.name)}
      {renderCell("Description", product.description)}
      {renderCell("Price", `$${product.price.toFixed(2)}`)}
      {renderCell("Stock", product.stockQuantity)}
      {renderCell("Image URL", product.imageUrl)}
      {renderCell(
        "Actions",
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          <button
            onClick={() => setIsEditing(true)}
            className="text-white bg-blue-600 hover:bg-blue-800 px-3 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(product.id)}
            className="text-white bg-red-600 hover:bg-red-800 px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
}
