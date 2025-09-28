import { divider } from "@utils";

const Divider: React.FC = () => {
  return (
    <>
      <p
        style={{
          color: "#a8a8aec9",
          fontSize: "14px",
          textAlign: "center",
        }}
      >
        {divider()}
      </p>
    </>
  );
};

export default Divider;
