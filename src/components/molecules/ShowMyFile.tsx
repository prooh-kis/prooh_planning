export const ImageContainer = ({
  url,
  className,
  height,
  width,
  removeFile,
  showIcon = true,
}: any) => (
  <div className="relative inline-block">
    <img
      src={url}
      alt="Campaign Image"
      className={className}
      height={height}
      width={width}
    />
    {showIcon && (
      <button
        type="submit"
        title="close"
        onClick={() => removeFile(url)}
        id="removeImage"
        className="absolute top-0 right-0 bg-red-500 text-[#FFFFFF] px-2 rounded-full focus:outline-none hover:bg-red-700"
      >
        &times;
      </button>
    )}
  </div>
);

export const VideoContainer = ({
  url,
  className,
  height,
  width,
  removeFile,
  showIcon = true,
}: any) => (
  <div className="relative inline-block">
    <video className={className} controls height={height} width={width}>
      <source src={url}></source>
    </video>
    {showIcon && (
      <button
        type="submit"
        title="close"
        onClick={() => removeFile(url)}
        id="removeVideo"
        className="absolute top-0 right-0 bg-red-500 text-[#FFFFFF] px-2 rounded-full focus:outline-none hover:bg-red-700"
      >
        &times;
      </button>
    )}
  </div>
);
