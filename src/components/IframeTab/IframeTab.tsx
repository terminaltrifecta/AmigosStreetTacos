import "bootstrap/dist/css/bootstrap.css";
import "./IframeTab.css";

interface Props {
  text: string;
  iframe: string;
  textRight: boolean;
  iframeLink: string;
  style: string;
  iframeHeight: string;
  iframeWidth: string;
}

function IframeTab({
  iframeLink,
  textRight,
  iframeWidth,
  iframeHeight,
  style,
  loading,
  text,
}: any) {
  return (
    <div className="height=2px iframe">
      <div className={textRight === "true" ? "main right p-4" : "main left p-4"}>
        <div className="row row-cols-1">
          <div className="col d-flex align-items-center justify-content-center">
            {textRight === "false" ? (
              <div>
                <iframe
                  src={iframeLink}
                  className="map img-fluid rounded-4 border border-5"
                  width={iframeWidth}
                  style={style}
                  loading={loading}
                />
              </div>
            ) : (
              <p>{text}</p>
            )}
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            {textRight === "false" ? (
              <p>{text}</p>
            ) : (
              <div>
                <iframe
                  src={iframeLink}
                  className="map img-fluid rounded-4 border border-5"
                  width={iframeWidth}
                  height={iframeHeight}
                  style={style}
                  loading={loading}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default IframeTab;
