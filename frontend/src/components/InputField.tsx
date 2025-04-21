interface InputFieldProps {
  children?: React.ReactNode;
  id: string;
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

export default function ({
  children,
  id,
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
  error,
}: InputFieldProps) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=""
        className={`peer p-2 border rounded w-full ${
          error ? "border-red-500" : "border-foreground"
        }`}
      />
      <label
        htmlFor={id}
        className="absolute left-0 -top-6 text-foreground text-sm 
            peer-placeholder-shown:text-base peer-placeholder-shown:top-2 peer-placeholder-shown:left-2
            peer-placeholder-shown:text-gray-500 peer-focus:left-0 peer-focus:-top-6 peer-focus:text-foreground
            peer-focus:text-sm transition-all"
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {children}
    </div>
  );
}
