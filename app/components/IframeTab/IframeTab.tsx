import "bootstrap/dist/css/bootstrap.css";
import "./IframeTab.css";

function IframeTab({
  iframeLink,
  iframeWidth,
  iframeHeight,
  style,
  loading,
  text,
}: any) {
  return (
    <div className=" iframe">
      <p>{text}</p>
      <iframe
        src={iframeLink}
        className=""
        width={iframeWidth}
        height={iframeHeight}
        style={style}
        loading={loading}
      />
    </div>
  );
}

export default IframeTab;
