interface Props {
  checked: boolean;
  onChange: () => void;
  label: string;
}

function Toggle({ checked, onChange, label }: Props) {
  return (
    <label className="mx-2 inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-600"></div>
      <span className="ms-3 text-md font-bold text-gray-900 dark:text-gray-300">
        {label}
      </span>
    </label>
  );
}

export default Toggle;
