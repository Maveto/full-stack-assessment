interface Props {
  subtotal: number;
}

export default function CartSummary({ subtotal }: Props) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-900">
      <h2 className="text-xl font-bold mb-4 text-foreground">Summary</h2>
      <div className="flex justify-between mb-2">
        <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
        <span className="font-semibold text-foreground">
          ${subtotal.toFixed(2)}
        </span>
      </div>
      <button className="w-full mt-4 bg-secondary text-foreground py-2 rounded hover:bg-accent transition">
        Proceed to pay
      </button>
    </div>
  );
}
