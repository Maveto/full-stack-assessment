import { CartItem } from "@/app/cart/page";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import Image from "next/image";

interface Props {
  item: CartItem;
  onRemove: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

export default function CartItemCard({
  item,
  onRemove,
  onUpdateQuantity,
}: Props) {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-900">
      <div className="flex items-center gap-4">
        {item.imageUrl ? (
          <div className="relative w-20 h-20 rounded overflow-hidden">
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-20 h-20 bg-gray-200 dark:bg-zinc-700 flex items-center justify-center text-gray-500 text-sm rounded">
            No Image
          </div>
        )}

        <div>
          <h3 className="font-semibold text-foreground">{item.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            ${item.price} x {item.quantity}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 flex-col-reverse sm:flex-row sm:gap-3">
        <button
          onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
          className="px-2 py-1 bg-secondary rounded hover:bg-accent"
        >
          <FaMinus />
        </button>
        <span className="min-w-[24px] text-center">{item.quantity}</span>
        <button
          onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
          className="px-2 py-1 bg-secondary rounded hover:bg-accent"
        >
          <FaPlus />
        </button>
        <button
          onClick={() => onRemove(item.productId)}
          className="text-red-500 hover:text-red-600 ml-2"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
