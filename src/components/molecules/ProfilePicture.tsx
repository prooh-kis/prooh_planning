import React from "react";

interface ProfilePictureProps {
  initialUrl: string;
  handleFilesUploader: (file: File) => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  initialUrl,
  handleFilesUploader,
}) => {
  return (
    <div className="relative w-24 h-24">
      <img
        src={initialUrl}
        alt="Profile"
        className="w-24 h-24 rounded-full border shadow-md object-cover"
      />
      <label className="absolute bottom-0 right-0 bg-gray-800 text-white rounded-full p-1 px-2 cursor-pointer hover:bg-gray-600 flex items-center justify-center">
        <i className="fi fi-sr-camera"></i>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => {
            if (event.target.files && event.target.files[0]) {
              handleFilesUploader(event.target.files[0]);
            }
          }}
        />
      </label>
    </div>
  );
};

export default ProfilePicture;
