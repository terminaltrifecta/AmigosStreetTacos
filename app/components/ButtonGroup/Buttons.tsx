import Link from "next/link";
import "./Buttons.css";

function Buttons({ color, children }: any) {
  return (
    <Link id="aref" href="/menu">
      <button id="buttonParent" className={color}>
        <div className="d-flex align-items-center justify-content-center p-4">
          {children}
        </div>
      </button>
    </Link>
  );
}

export default Buttons;
