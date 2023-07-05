import "./Buttons.css";

interface Props {
  color: String;
  children: String;
}

function Buttons({ color, children }: any) {
  return (
    <>
      <button id="buttonParent" className={color}>
        <div className="d-flex align-items-center justify-content-center p-4">
          {children}
        </div>
      </button>
    </>
  );
}

export default Buttons;
