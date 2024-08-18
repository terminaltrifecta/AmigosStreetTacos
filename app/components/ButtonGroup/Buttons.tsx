import "./Buttons.css";


function Buttons({ color, children }: any) {
  return (
    <>
      <a
        target="_blank"
        href="https://food.google.com/?sei=CSMFYu9J0EmqERGSCnevhSDv&utm_campaign&ved&q=amigos%20street%20tacos&loc_q&fo_m=EhESAggCqgEKCggIARIEEgIIAg&lat=42.074968894897076&lng=-82.871581339737"
      >
        <button id="buttonParent" className={color}>
          <div className="d-flex align-items-center justify-content-center p-4">
            {children}
          </div>
        </button>
      </a>
    </>
  );
}

export default Buttons;
