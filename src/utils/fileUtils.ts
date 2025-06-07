import { PDFDocument } from 'pdf-lib';

(window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js';


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

export const blobToBase64 = (blob: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result); // This is the base64 string
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob); // Converts blob to base64
  });
}

export const getCanvasBlob = (canvas: HTMLCanvasElement): Promise<Blob> => {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      }
    }, 'image/png');
  });
};

export const generateImageFromPdf = async (uploadedPO: any) => {
  try {
      const loadingTask = (window as any).pdfjsLib.getDocument(uploadedPO);
      let pdf;
      try {
        pdf = await loadingTask.promise;
        if (!pdf) {
          console.error("Failed to load PDF: No document returned");
          return null;
        }
      } catch (error) {
        console.error("PDF loading error:", error);
        return null;
      }
  
      // Get the first page with error handling
      let page;
      try {
        page = await pdf.getPage(1);
        if (!page) {
          throw new Error("No pages in PDF");
        }
      } catch (error) {
        console.error("Failed to get PDF page:", error);
        return null;
      }
  
      // Render PDF page to canvas
      const scale = 1.5;
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      try {
        await page.render({
          canvasContext: context,
          viewport: viewport
        }).promise;
      } catch (error) {
        console.error("PDF rendering error:", error);
        return null;
      }
  
    // Convert canvas to blob and add to PDF
      const poBlob = await getCanvasBlob(canvas);
      return blobToBase64(poBlob);
  } catch (error) {
    console.log(error);
    return null;
  }
}
