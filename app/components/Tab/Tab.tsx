import "bootstrap/dist/css/bootstrap.css";
import "./Tab.css";
import Image from "next/image";

function Tab({ text, img, textRight }: any) {
  return (
    <div className={textRight === "true" ? "main right p-4" : "main left p-4"}>
      <div className="row">
        <div className="col">
          {textRight === "true" ? (
            <div>
              <Image
                src={img}
                alt=""
                className="img-fluid rounded-4 border border-5"
                width={1920}
                height={1080}
              />
            </div>
          ) : (
            <p className="tabtext">{text}</p>
          )}
        </div>
        <div className="col">
          {textRight === "true" ? (
            <p className="tabtext">{text}</p>
          ) : (
            <div>
              <Image
                src={img}
                alt=""
                className="img-fluid rounded-4 border border-5"
                width={1920}
                height={1080}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tab;
