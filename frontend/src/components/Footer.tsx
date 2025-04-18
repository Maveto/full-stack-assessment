import ThemeSwitch from "./ThemeSwitch";

export default function Footer() {
  return (
    <footer className="w-full py-4 px-6 bg-secondary text-foreground border-t border-gray-300 dark:border-gray-700 flex justify-between items-center">
      <p className="text-sm">© 2025 Mauri Shop</p>
      <ThemeSwitch />
    </footer>
  );
}
