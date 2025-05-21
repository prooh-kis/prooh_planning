export const ImageContainer = ({
  url,
  className = "rounded-lg",
  height = "207px",
  width = "383px",
  removeFile,
  showIcon = true,
}: any) => (
  <div className="relative inline-block max-h-[30vh] overflow-hidden">
    <img
      src={url}
      alt="Campaign Image"
      className={`${className} object-cover`}
      style={{ height, width }}
    />
    {showIcon && (
      <button
        type="button"
        title="Remove image"
        onClick={() => removeFile(url)}
        id="removeImage"
        className="absolute top-0 right-0 bg-[#FF0808] text-[#FFFFFF] px-2 rounded-full focus:outline-none hover:bg-red-700"
      >
        &times;
      </button>
    )}{" "}
  </div>
);

export const VideoContainer = ({
  url,
  className = "rounded-lg",
  height = "200px",
  width = "383px",
  removeFile,
  showIcon = true,
}: any) => (
  <div className="relative inline-block max-h-[30vh] overflow-hidden w-full">
    <video
      className={`${className} object-cover h-[${height}] w-full`}
      controls
    >
      <source src={url} />
      Your browser does not support the video tag.
    </video>
    {showIcon && (
      <button
        type="button"
        title="Remove video"
        onClick={() => removeFile(url)}
        id="removeVideo"
        className="absolute top-0 right-0 bg-[#FF0808] text-white px-2 rounded-full focus:outline-none hover:bg-red-700"
      >
        &times;
      </button>
    )}
  </div>
);
