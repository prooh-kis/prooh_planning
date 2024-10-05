import React from "react";

export const ImageViewCloseButton = ({ file, removeImage }: any) => {
  return (
    <div className="relative inline-block">
      <img
        id="imagePreview"
        src={file.url}
        alt="Image"
        className="w-40 h-40 object-cover rounded-lg shadow-md"
      />

      <button
        onClick={() => removeImage(file)}
        id="removeImage"
        className="absolute top-0 right-0 bg-red-500 text-white px-2 rounded-full focus:outline-none hover:bg-red-700"
      >
        &times;
      </button>
    </div>
  );
};
