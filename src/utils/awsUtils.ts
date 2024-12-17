import Axios from "axios";
import { Buffer } from 'buffer';

export const getAWSUrlToUploadFile = async (contentType: String) => {
  try {
    const { data } = await Axios.post(
      `${process.env.REACT_APP_PROOH_SERVER}/api/v1/aws/getURLForFileUplaod`,
      { contentType }
      // {
      //   headers: {
      //     Authorization: `Bearer ${userInfo?.token}`,
      //   },
      // }
    );
    return data;
  } catch (error) {
    console.log("Not able to get aws file url");
    throw new Error("Error while getting aws url");
  }
};

export const saveFileOnAWS = async (url: string, file: File) => {
  try {
    console.log("Calling function to save file aws");
    const { data } = await Axios.put(url, file, {
      headers: {
        "Content-Type": file?.type,
      },
    });
    console.log("file upload successfully on aws");
    return ("success: " + data);
  } catch (error) {
    console.log("Not able to save file on aws");
    throw new Error("Error saving on aws");
  }
};

export const getDocUrlToSaveOnAWS = async (fileName: any, fileType: any) => {
  try {
    const { data } = await Axios.post(
      `${process.env.REACT_APP_PROOH_SERVER}/api/v1/aws/saveDocsOnAWS`,
      { fileName, fileType }
      // {
      //   headers: {
      //     Authorization: `Bearer ${userInfo?.token}`,
      //   },
      // }
    );
    return data;
  } catch (error) {
    console.log("Not able to get aws file url");
    throw new Error("Error while getting aws url");
  }
};

export const saveDocsOnAws = async (url: string, file: Blob) => {
  try {
    console.log("Calling function to save file aws");
    const { data } = await Axios.put(url, file, {
      headers: {
        "Content-Type": file?.type,
      },
    });
    console.log("file upload successfully on aws");
    return ("success: " + data);
  } catch (error) {
    console.log("Not able to save file on aws");
    throw new Error("Error saving on aws");
  }
}

export const sanitizeUrlForS3 = (url: any) => {
  // Use encodeURI to encode the entire URL
  return encodeURI(url);
}