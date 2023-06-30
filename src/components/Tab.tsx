import "bootstrap/dist/css/bootstrap.css";

interface Props {
  text: string;
  img: string;
  textRight: boolean;
}

function Tab({ text, img, textRight }: any) {
  return (
    <div className="container">
      <div className="row row-cols-2 justify-content-md-center">
        <div className="col">
          {textRight === "true" ? (
            <img src={img} alt="" className="img-fluid" />
          ) : (
            <div className="">
              <p className="text-center text-wrap">{text}</p>
            </div>
          )}
        </div>
        <div className="col">
          {textRight === "true" ? (
            <div className="right-50 top-50">
              <p className="text-center text-wrap">{text}</p>
            </div>
          ) : (
            <img src={img} alt="" className="img-fluid" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Tab;