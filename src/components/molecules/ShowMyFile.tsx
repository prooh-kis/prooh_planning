export const ImageContainer = ({
  url,
  className = "",
  height = "full",
  width = "full",
  removeFile,
  showIcon = true,
}: {
  url: string;
  className?: string;
  height?: string;
  width?: string;
  removeFile: (url: string) => void;
  showIcon?: boolean;
}) => (
  <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
    <img
      src={url}
      alt="Uploaded content"
      className={`${className} h-full w-full object-cover`}
    />
    {showIcon && (
      <button
        type="button"
        aria-label="Remove image"
        onClick={() => removeFile(url)}
        className="absolute top-2 right-2 bg-[#FF0808] text-[#FFFFFF] px-2 rounded-full focus:outline-none hover:bg-red-700"
      >
        &times;
      </button>
    )}
  </div>
);

export const VideoContainer = ({
  url,
  className = "",
  height = "full",
  width = "full",
  removeFile,
  showIcon = true,
}: {
  url: string;
  className?: string;
  height?: string;
  width?: string;
  removeFile: (url: string) => void;
  showIcon?: boolean;
}) => (
  <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
    <video className={`${className} h-full w-full object-cover`} controls muted>
      <source src={url} />
      Your browser does not support the video tag.
    </video>
    {showIcon && (
      <button
        type="button"
        aria-label="Remove video"
        onClick={() => removeFile(url)}
        className="absolute top-2 right-2 bg-[#FF0808] text-[#FFFFFF] px-2 rounded-full focus:outline-none hover:bg-red-700"
      >
        &times;
      </button>
    )}
  </div>
);
