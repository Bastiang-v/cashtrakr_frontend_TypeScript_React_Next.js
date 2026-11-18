"use client";
import { useRouter } from "next/navigation";
export default function AddExpenseButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("?addExpense=true&showModal=true")}
      className="bg-amber-500 px-10 py-2 rounded-lg text-white font-bold cursor-pointer"
      type="button"
    >
      Agregar Gasto
    </button>
  );
}
