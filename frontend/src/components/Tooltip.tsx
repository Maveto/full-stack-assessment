import { ReactNode } from "react";

export default function Tooltip({
  children,
  content,
}: {
  children: ReactNode;
  content: ReactNode;
}) {
  return (
    <div className="relative group">
      {children}
      <div className="absolute w-full left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10">
        {content}
      </div>
    </div>
  );
}
