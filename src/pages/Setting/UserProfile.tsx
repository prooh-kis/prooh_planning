import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_USER_PROFILE_RESET } from "../../constants/userConstants";
import { getAWSUrl } from "../../utils/awsUtils";
import ProfilePicture from "../../components/molecules/ProfilePicture";
import ButtonInput from "../../components/atoms/ButtonInput";
import { updateUserProfile } from "../../actions/userAction";

interface mediaFile {
  url: string;
  awsURL: string;
  file: File | null;
}

interface FormData {
  email: string;
  name: string;
  phone: string;
  address: string;
  districtCity: string;
  pincode: string;
  stateUt: string;
  country: string;
}

export const UserProfile: React.FC = () => {
  const dispatch = useDispatch<any>();
  const [mediaFile, setMediaFile] = useState<mediaFile>({
    url: "",
    awsURL: "",
    file: null,
  });

  const profileUpdate = useSelector((state: any) => state.profileUpdate);
  const { error, loading, success } = profileUpdate;

  const auth = useSelector((state: any) => state.auth);
  const { userInfo } = auth;

  const [formData, setFormData] = useState<FormData>({
    email: userInfo?.email || "",
    name: userInfo?.name || "",
    phone: userInfo?.phone || "",
    address: userInfo?.address || "",
    districtCity: userInfo?.districtCity || "",
    pincode: userInfo?.pincode || "",
    stateUt: userInfo?.stateUt || "",
    country: userInfo?.country || "",
  });

  const getAllImagesURL = async (): Promise<mediaFile> => {
    const data = { ...mediaFile };
    try {
      if (data.awsURL === "" && data.file) {
        const awsUrl = await getAWSUrl(data.file);
        data.awsURL = awsUrl;
      }
    } catch (error) {
      console.log("Error in upload file:", error);
    }
    return data;
  };

  const handleFilesUploader = async (file: File | null): Promise<void> => {
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaFile({ url, awsURL: "", file });
    }
  };

  useEffect(() => {
    setMediaFile({
      url: userInfo?.avatar || "",
      awsURL: userInfo?.avatar || "",
      file: null,
    });
  }, [userInfo]);

  useEffect(() => {
    if (error) alert(error);
    if (success) alert("Profile updated successfully!");
    dispatch({ type: UPDATE_USER_PROFILE_RESET });
  }, [error, success, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const allImagesURL = await getAllImagesURL();
    console.log("ddddddddd : ", {
      ...formData,
      avatar: allImagesURL.awsURL,
      _id: userInfo?._id,
    });
    dispatch(
      updateUserProfile({
        ...formData,
        avatar: allImagesURL.awsURL,
        _id: userInfo?._id,
      })
    );
  };

  return (
    <div className="p-6 mx-auto bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        User Profile
      </h2>
      <div className="flex justify-center">
        <ProfilePicture
          initialUrl={mediaFile.url}
          handleFilesUploader={handleFilesUploader}
        />
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <div className="flex items-center border rounded p-2">
              <i className="fi fi-sr-envelope mr-2 text-gray-500 flex items-center"></i>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Mobile No</label>
            <div className="flex items-center border rounded p-2">
              <i className="fi fi-sr-phone-call mr-2 text-gray-500 flex items-center"></i>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded p-2 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">District/City</label>
            <input
              type="text"
              name="districtCity"
              value={formData.districtCity}
              onChange={handleChange}
              className="w-full border rounded p-2 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="w-full border rounded p-2 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">State</label>
            <input
              type="text"
              name="stateUt"
              value={formData.stateUt}
              onChange={handleChange}
              className="w-full border rounded p-2 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border rounded p-2 outline-none"
              required
            />
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button type="submit">
            <ButtonInput loading={loading}>Update</ButtonInput>
          </button>
        </div>
      </form>
    </div>
  );
};
