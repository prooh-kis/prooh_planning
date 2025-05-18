import { PDFDocument } from 'pdf-lib';


// using promise
export const getVideoDurationFromVideoURL = (url: string) => {
  return new Promise((resolve, reject) => {
    let video = document.createElement("video");
    video.src = url;
    video.addEventListener("loadedmetadata", function () {
      let duration = video.duration;
      resolve(duration);
    });
  });
};

export const getVideoResolution = (url: string) => {
  return new Promise((resolve, reject) => {
    let video = document.createElement("video");
    video.src = url;
    video.onloadedmetadata = () => {
      resolve({ width: video.videoWidth, height: video.videoHeight });
    };
  });
};

export const getImageResolution = (url: string) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = url;
  });
};



export const handleBase64ImageUpload = async (base64Data: string) => {
  try {
    // Extract content type from base64 string if available (e.g., "data:image/png;base64,...")
    const contentType = base64Data.startsWith('data:') 
      ? base64Data.substring(5, base64Data.indexOf(';')) 
      : 'image/png';
    
    // Extract the pure base64 data
    const base64WithoutPrefix = base64Data.split(',')[1] || base64Data;
    
    // Convert base64 to binary
    const binaryString = atob(base64WithoutPrefix);
    const bytes = new Uint8Array(binaryString.length);
    
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    
    // Create a File object from the binary data
    const file = new File([bytes], `screenshot-${Date.now()}.png`, { type: contentType });
    
    // Generate a preview URL
    const fileURL = URL.createObjectURL(file);
    
   return { file, fileURL };
  } catch (error) {
    console.error('Error uploading base64 image:', error);
    throw error;
  }
};



export async function mergePdfs(pdf1: any, pdf2: any) {
  const mergedPdf = await PDFDocument.create();
  
  // Add first PDF
  const pdf1Doc = await PDFDocument.load(pdf1);
  const pdf1Pages = await mergedPdf.copyPages(pdf1Doc, pdf1Doc.getPageIndices());
  pdf1Pages.forEach(page => mergedPdf.addPage(page));
  
  // Add second PDF
  const pdf2Doc = await PDFDocument.load(pdf2);
  const pdf2Pages = await mergedPdf.copyPages(pdf2Doc, pdf2Doc.getPageIndices());
  pdf2Pages.forEach(page => mergedPdf.addPage(page));
  
  return await mergedPdf.save();
}

export const convertBlobToDataURL = (blob: any) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
};


export const getCanvasBlob = (canvas: HTMLCanvasElement): Promise<Blob> => {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      }
    }, 'image/png');
  });
};
