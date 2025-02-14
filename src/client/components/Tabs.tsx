interface Props {
  tabs: Array<{ label: string; value: string }>;
  active: string;
  setActive: (tab: string) => void;
}

function Tabs({ tabs, active, setActive }: Props) {
  return (
    <>
      <div className="flex">
        {tabs.map(({ label, value }) => (
          <button
            key={value}
            className={`m-1 ml-0 rounded-t-lg p-3 hover:cursor-pointer hover:font-bold${
              active == value ? " font-bold bg-white mb-0" : ""
            }`}
            onClick={() => setActive(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
}

export default Tabs;
