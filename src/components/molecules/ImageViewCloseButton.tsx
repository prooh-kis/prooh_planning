import React from "react";

export const ImageViewCloseButton = ({ file, removeImage }: any) => {
  return (
    <div className="relative inline-block">
      <img
        id="imagePreview"
        src={file.url}
        alt="Image"
        className="w-20 h-20 object-cover rounded-lg shadow-md"
      />

      <button
        type="submit"
        onClick={() => removeImage(file)}
        id="removeImage"
        className="flex items-center justify-center absolute top-0 right-0 bg-[#FF0808] text-[#FFFFFF] h-4 w-4 rounded-full focus:outline-none hover:bg-red-700"
      >
        &times;
      </button>
    </div>
  );
};
