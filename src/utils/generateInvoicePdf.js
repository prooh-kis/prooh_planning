import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import PptxGenJS from "pptxgenjs";
import * as XLSX from 'xlsx';
import { numberToWords } from "./formatValue";
import { convertBlobToDataURL, getCanvasBlob, mergePdfs } from "./fileUtils";
import { convertDateIntoDateMonthYear } from "./dateAndTimeUtils";

// Configure PDF.js worker
window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js';

export const generateBillAndInvoicePdf = async ({
  preview = true,
  download = false,
  fileName,
  jsonData,
  billInvoiceDetailsData,
  campaignDetails,
  siteLevelData,
  setBillLoading,
}) => {
  setBillLoading(true);
  const doc = new jsPDF("portrait", "pt", "a4", { compress: true });
   // Reusable canvas for image processing
   const canvas = document.createElement("canvas");
   const ctx = canvas.getContext("2d");
   let currentFont = { style: "normal", family: "helvetica" };
   
   // Optimized style setters
   const setFont = (style = "normal", family = "helvetica") => {
     if (currentFont.style !== style || currentFont.family !== family) {
       doc.setFont(family, style);
       currentFont = { style, family };
     }
   };

   const pageWidth = doc.internal.pageSize.width;
   const pageHeight = doc.internal.pageSize.height;
   const usableWidth = pageWidth - 15 * 2;
   let yOffset = 40; // Reset yOffset for additional pages
 
   // Cache common measurements
  const pageMetrics = {
    width: doc.internal.pageSize.width,
    height: doc.internal.pageSize.height,
    usableWidth: doc.internal.pageSize.width - 30,
    rightColX: 350,
    amountX: 500
  };

  // Optimized image processing with cache
  const imageCache = new Map();
  const getOptimizedImage = async (url) => {
    if (imageCache.has(url)) return imageCache.get(url);
    
    try {
      const blob = await fetch(url).then(r => r.blob());
      const img = await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = URL.createObjectURL(blob);
      });

      const scale = Math.min(1, 800/Math.max(img.width, img.height));
      canvas.width = Math.floor(img.width * scale);
      canvas.height = Math.floor(img.height * scale);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(img.src);

      const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
      imageCache.set(url, dataUrl);
      return dataUrl;
    } catch (error) {
      console.error("Image processing error:", error);
      return null;
    }
  };
 
  // Optimized page border
  const addPageBorder = () => {
    doc.setDrawColor(0);
    doc.setLineWidth(1);
    doc.rect(20, 20, pageMetrics.width - 24, pageMetrics.height - 40, "S");
  };

  // Main content generator (unchanged layout, optimized operations)
  const generateInvoiceContent = (data) => {
    let yOffset = 40;
    setFont("bold");
    doc.setFontSize(14);
    doc.text("TAX INVOICE", pageMetrics.width / 2, yOffset, { align: "center" });
    yOffset += 20;

    // Client details section with optimized font switching
    setFont("bold");
    doc.setFontSize(10);
    doc.text("PROOH TECHNOLOGIES PRIVATE LIMITED", 30, yOffset);
    
    setFont("normal");
    doc.setFontSize(8);
    doc.text(`Invoice No: ${data.invoiceNumber}`, pageMetrics.rightColX, yOffset);
    
    yOffset += 15;
    doc.text(`Contact Person: ${data.planner}`, 30, yOffset);
    doc.text(`Invoice Date: ${data.invoiceDate}`, 350, yOffset);
    yOffset += 15;
    doc.text(`Email Id: ${data.plannerEmail}`, 30, yOffset);
    doc.text(`Internal SO No: ${data.internalSoNumber}`, 350, yOffset);
    yOffset += 15;
    doc.text(`PAN No: AAMCP9602J`, 30, yOffset);
    doc.text(`Client Confirmation: ${data.clientConfirmation}`, 350, yOffset);
    yOffset += 15;
    doc.text(`GST No: 06AAMCP9602J1Z2`, 30, yOffset);
    doc.text(`Client Order Date: ${data.clientOrderDate}`, 350, yOffset);
    yOffset += 15;
    doc.text(``, 30, yOffset);
    doc.text(`Purchase Order No.: ${data.poNumber}`, 350, yOffset);
    yOffset += 15;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);

    doc.text("Client Details:-", 30, yOffset);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(`Campaign Name: ${data.campaignName}`, 350, yOffset);
    yOffset += 15;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(`${data.clientAgencyName}`, 30, yOffset);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(
      `Campaign Duration: ${data.startDate} - ${data.endDate}`,
      350,
      yOffset
    );
    yOffset += 15;

    const wrappedAddress = doc.splitTextToSize(
      `${data.officeAddress.address}`,
      250
    );
    doc.text(wrappedAddress, 30, yOffset);
    yOffset += wrappedAddress.length * 8 + 12;
    doc.text(
      `${data.officeAddress.city}, ${data.officeAddress.state}, ${data.officeAddress.country}, ${data.officeAddress.zipCode}`,
      30,
      yOffset
    );
    yOffset += 15;
    doc.text(`Contact Person: ${data?.pocName}`, 30, yOffset);
    yOffset += 15;
    doc.text(`Contact No.: ${data?.pocContact}`, 30, yOffset);
    yOffset += 15;
    doc.text(`Email Id: ${data?.pocEmail}`, 30, yOffset);
    yOffset += 15;
    doc.text(`GSTIN No.: ${data?.gst}`, 30, yOffset);
    yOffset += 15;
    doc.text(`PAN No.: ${data?.pan}`, 30, yOffset);
    yOffset += 15;
    // Optimized table section
    const tableConfig = {
      head: [["Sr.No", "Description", "HSN/SAC", "Quantity", "Rate", "Amount"]],
      body: [[
        "1",
        data.invoiceDescription,
        "998361",
        data.invoiceQuantity,
        Number(data.invoiceAmount).toFixed(0),
        Number(data.invoiceAmount).toFixed(0),
      ]],
      styles: { fontSize: 10, halign: "center" },
      startY: yOffset,
      margin: { top: 30, left: 30, right: 30 },
      tableWidth: pageMetrics.usableWidth,
      columnStyles: {
        0: { halign: "center", cellWidth: pageMetrics.usableWidth / 15 },
        1: { halign: "left", cellWidth: (5 * pageMetrics.usableWidth) / 12 },
        2: { halign: "center", cellWidth: pageMetrics.usableWidth / 6 },
        3: { halign: "center", cellWidth: pageMetrics.usableWidth / 8 },
        4: { halign: "center", cellWidth: pageMetrics.usableWidth / 10 },
        5: { halign: "center", cellWidth: pageMetrics.usableWidth / 10 },
      }
    };
    
    doc.autoTable(tableConfig);
    yOffset = doc.lastAutoTable.finalY + 15;
    doc.setFont("helvetica", "bold");
    doc.text(`Sub Total`, 320, yOffset);
    doc.text(`INR ${Number(data.invoiceAmount).toFixed(0)}`, 500, yOffset);
    yOffset += 15;
    doc.line(30, yOffset, pageWidth - 15, yOffset);
    yOffset += 15;
    doc.text(`Amount in words`, 30, yOffset);
    doc.line(pageWidth / 2, yOffset - 15, pageWidth / 2, yOffset + 35);
    doc.text(`Output IGST @${data.outPutGstPercent}%`, 320, yOffset);
    doc.text(`INR ${Number(data.outPutGstAmount).toFixed(2)}`, 500, yOffset);
    yOffset += 15;
    doc.text(`Round Off Amount`, 320, yOffset);
    doc.text(
      `INR ${Number(data.subTotalAmount % 1).toFixed(2)}`,
      500,
      yOffset
    );
    doc.setFont("helvetica", "normal");
    const wrappedText = doc.splitTextToSize(
      `${numberToWords(
        Number(data.subTotalAmount).toFixed(0)
      ).toUpperCase()} ONLY`,
      250
    );
    doc.text(wrappedText, 30, yOffset);
    yOffset += wrappedText.length * 10;
    doc.line(30, yOffset, pageWidth - 15, yOffset);
    yOffset += 15;
    doc.setFont("helvetica", "bold");
    doc.text(`Total: `, 320, yOffset);
    doc.text(
      `INR ${Number(data.subTotalAmount).toFixed(0)} /-`,
      500,
      yOffset
    );
    yOffset += 12;
    doc.line(30, yOffset, pageWidth - 15, yOffset);
    yOffset += 12;

    // Notes section (only on first page)
    doc.text(`NOTE: `, 30, yOffset);
    yOffset += 15;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    const wrappedNote1 = doc.splitTextToSize(
      `1. The invoice shall be deemed to be accepted, in case no query is raised within 7 days of reciept.`,
      pageWidth - 60
    );
    doc.text(wrappedNote1, 30, yOffset);
    yOffset += 12;

    const wrappedNote2 = doc.splitTextToSize(
      `2. The invoice is due for payment within 15 days from the end date of campaign, unless specified separately, else interest @ 2% per month will be charged from the client.`,
      pageWidth - 60
    );
    doc.text(wrappedNote2, 30, yOffset);
    yOffset += wrappedNote2.length * 8 + 12;

    const wrappedNote3 = doc.splitTextToSize(
      `3. All Cheques/Drafts to be made in favour of "PROOH TECHNOLOGY PRIVATE LIMITED.`,
      pageWidth - 60
    );
    doc.text(wrappedNote3, 30, yOffset);
    yOffset += 12;

    const wrappedNote4 = doc.splitTextToSize(
      `4. GSTN/Billing address: 322, 323, 324 & 325, 3rd Floor, Paras Trade Center, Gurgaon, Faridabad Road, Gwal Pahari, Gurgaon, Haryana, 122002.`,
      pageWidth - 60
    );
    doc.text(wrappedNote4, 30, yOffset);
    yOffset += wrappedNote4.length * 8 + 12;

    const wrappedNote5 = doc.splitTextToSize(
      `5. Bank details for remittance:- A/C Holder Name:- PROOH TECHNOLOGY PRIVATE LIMITED, A/C No.:- 921020001354511, IFSC Code:- UTIB0004373, Bank Name:- Axis Bank, Branch:- Gwal Pahari, Gurgaon, Haryana-122003.`,
      pageWidth - 60
    );
    doc.text(wrappedNote5, 30, yOffset);
    yOffset += wrappedNote5.length * 8 + 12;

    const wrappedNote6 = doc.splitTextToSize(
      `6. Registered address: 322, 323, 324 & 325, 3rd Floor, Paras Trade Center, Gurgaon, Faridabad Road, Gwal Pahari, Gurgaon, Haryana, 122002.`,
      pageWidth - 60
    );
    doc.text(wrappedNote6, 30, yOffset);
    yOffset += wrappedNote6.length * 8 + 12;

    const wrappedNote7 = doc.splitTextToSize(
      `7. All disputes are subject to Gurgaon Jurisdiction.`,
      pageWidth - 60
    );
    doc.text(wrappedNote7, 30, yOffset);
    yOffset += 12;

    const wrappedNote8 = doc.splitTextToSize(
      `8. Whether the tax is payable on reverse charge basis - NO.`,
      pageWidth - 60
    );
    doc.text(wrappedNote8, 30, yOffset);
    yOffset += 15;

    doc.setFont("helvetica", "bold");
    doc.text(
      `Please return this copy on Invoice Duty Signed & Stamped as Token of Acceptance.`,
      pageWidth / 2,
      yOffset,
      { align: "center" }
    );
    yOffset += 12;
    doc.line(30, yOffset, pageWidth - 15, yOffset);
    yOffset += 12;
    doc.text(`Accepted`, 30, yOffset);
    doc.line(pageWidth / 2, yOffset - 12, pageWidth / 2, yOffset + 70);
    doc.text(`For: PROOH TECHNOLOGY PRIVATE LIMITED`, 320, yOffset);
    yOffset += 70;
    doc.line(30, yOffset, pageWidth - 15, yOffset);
    yOffset += 12;
    doc.text(`Stamp`, 30, yOffset);
    doc.line(pageWidth / 2, yOffset - 12, pageWidth / 2, yOffset + 12);
    doc.text(`Authorised Signatory`, 320, yOffset);
    yOffset += 12;
    doc.line(30, yOffset, pageWidth - 15, yOffset);
    yOffset += 15;

    doc.text(`PROOH TECHNOLOGY PRIVATE LIMITED`, 30, yOffset);
    doc.setFont("helvetica", "normal");
    yOffset += 12;
    doc.text(`3rd Floor, Unit No. 322, 323, 324 & 325`, 30, yOffset);
    yOffset += 12;
    doc.text(`Paras Trade Center, Gwal Pahari, Sector 2, Gurugram`, 30, yOffset);
    doc.text(`GSTIN:- 06AAMCP9602J1Z2, Haryana Code:- 06`, 400, yOffset);

    doc.text(`Generated by PROOH.AI`, 490, pageHeight - 8);
  };

  // Optimized image addition with parallel processing
  const addClientConfirmationToPage = async (images) => {
    const imagePromises = images.map(url => getOptimizedImage(url));
    const imageDataUrls = await Promise.all(imagePromises);
    
    let yOffset = 54;
    for (const dataUrl of imageDataUrls) {
      if (!dataUrl) continue;
      doc.addImage(dataUrl, 'JPEG', 30, yOffset, pageMetrics.width - 50, 280);
      yOffset += 280 + 24;
    }
    return yOffset;
  };

  const addPOPdfToPage = async (uploadedPO, yOffset, canvas, pageMetrics, setFont) => {
    try {
      const loadingTask = window.pdfjsLib.getDocument(uploadedPO);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      
      // Reuse existing canvas
      const scale = 1.5;
      const viewport = page.getViewport({ scale });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');
      
      await page.render({ canvasContext: ctx, viewport }).promise;
      
      // Convert to optimized image
      const dataUrl = await getOptimizedImage(canvas.toDataURL('image/jpeg', 0.6));
      
      setFont("normal");
      doc.addImage(dataUrl, 'JPEG', 30, yOffset, pageMetrics.width - 50, 420);
      
      return yOffset + 432;
    } catch (error) {
      doc.setTextColor(150, 150, 150);
      doc.text("PO PDF processing failed", 30, yOffset);
      return yOffset + 12;
    }
  };
  
  const dashboardScreenshotsGrid = async (dashboardImages, yOffset, canvas, pageMetrics, setFont) => {
    // Batch process all images first
    const imagePromises = dashboardImages.map(url => getOptimizedImage(url));
    const images = await Promise.all(imagePromises);
    
    // Grid configuration (cached)
    const gridConfig = {
      cols: 2,
      rows: 3,
      marginX: 30,
      padding: 15,
      imgWidth: (pageMetrics.width - 60 - 15) / 2,
      imgHeight: 240
    };
  
    let currentIndex = 0;
    for (const imgData of images) {
      if (currentIndex > 0 && currentIndex % 6 === 0) {
        doc.addPage();
        addPageBorder();
        yOffset = 42;
      }
  
      const row = Math.floor((currentIndex % 6) / gridConfig.cols);
      const col = currentIndex % gridConfig.cols;
      
      const x = gridConfig.marginX + col * (gridConfig.imgWidth + gridConfig.padding);
      const y = yOffset + row * (gridConfig.imgHeight + gridConfig.padding);
  
      if (imgData) {
        doc.addImage(imgData, 'JPEG', x, y, gridConfig.imgWidth, gridConfig.imgHeight);
      } else {
        setFont("italic");
        doc.setTextColor(150, 150, 150);
        doc.text("Image missing", x + 10, y + 20);
      }
      
      currentIndex++;
    }
    return yOffset;
  };


  const processLogs = async (logUrl) => {
    try {
      const response = await fetch(logUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      
      const logs = [];
      
      workbook.SheetNames.forEach((sheetName, index) => {
        // Add sheet header
        logs.push({
          text: `Date: ${sheetName}`,
          isHeader: true
        });
        
        // Convert sheet data
        const worksheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // Add column headers
        if (rows.length > 0) {
          logs.push({
            text: rows[0].join(' | '),
            isHeader: true
          });
        }
        
        // Add row data
        rows.slice(1).forEach(row => {
          logs.push({
            text: row.join(' | '),
            isHeader: false
          });
        });
        
        // Add sheet separator
        if (index < workbook.SheetNames.length - 1) {
          logs.push({ text: '-'.repeat(50), isHeader: false });
        }
      });
      
      return logs;
      
    } catch (error) {
      console.error('Log processing failed:', error);
      return [{
        text: 'Error loading monitoring logs: ' + error.message,
        isHeader: false
      }];
    }
  };
  
  const addMonitoringPicturesAndLogs = async (screenLevelCampaignData, yOffset, canvas, pageMetrics, setFont) => {
    // Cache cell dimensions and styles
    const CELL_STYLES = {
      width: 120,
      height: 80,
      padding: 2,
      textColor: [150, 150, 150],
      errorText: 'No Image'
    };
  
    // Predefined monitoring types we want to display
    const MONITORING_TYPES = [
      'dayShot',
      'withNewspaper', 
      'withGeoTag',
      'nightShot'
    ];
  
    for (const [screenIndex, screen] of screenLevelCampaignData.entries()) {
      if (screenIndex > 0) {
        doc.addPage();
        addPageBorder();
        yOffset = 42;
      }
  
      // Batch process all images first
      const imageUrls = [];
      const imageMap = new Map();
  
      // Collect all image URLs with their positions
      screen.monitoringData?.forEach((entry, entryIndex) => {
        MONITORING_TYPES.forEach((type, typeIndex) => {
          const url = entry.monitoringTypeWiseData
            ?.find(d => d.monitoringType === type)
            ?.monitoringUrls?.[0]?.awsUrl;
          
          if (url) {
            const key = `${entryIndex}-${typeIndex}`;
            imageUrls.push({ url, key });
          }
        });
      });
  
      // Parallel process all images
      const imageResults = await Promise.all(
        imageUrls.map(async ({ url, key }) => ({
          key,
          data: await getOptimizedImage(url)
        })
      ));
  
      // Create lookup map
      imageResults.forEach(({ key, data }) => imageMap.set(key, data));
  
      // Build table data with cached images
      const tableBody = screen.monitoringData?.map((entry, entryIndex) => {
        const getImageData = typeIndex => 
          imageMap.get(`${entryIndex}-${typeIndex}`) || null;
  
        return [
          `${convertDateIntoDateMonthYear(entry.date)}\n${entry.dateType}`,
          { image: getImageData(0) }, // dayShot
          { image: getImageData(1) },  // withNewspaper
          { image: getImageData(2) },  // withGeoTag
          { image: getImageData(3) }   // nightShot
        ];
      }) || [];
  
      // Add screen header
      setFont('bold');
      doc.text(`Monitoring Pictures: ${screen.screenName || 'Unnamed Screen'}`, 30, yOffset);
      yOffset += 20;
  
      // Draw images table
      doc.autoTable({
        head: [["Date", "Day Shot", "Newspaper", "GPS", "Night Shot"]],
        body: tableBody,
        styles: { 
          halign: "center", 
          cellPadding: CELL_STYLES.padding,
          minCellHeight: CELL_STYLES.height
        },
        headStyles: {
          minCellHeight: 15,
          fillColor: [200, 200, 200],
          textColor: 0,
          cellPadding: { top: 3, right: 1, bottom: 3, left: 1 }
        },
        columnStyles: {
          0: { cellWidth: 65 },
          1: { cellWidth: CELL_STYLES.width },
          2: { cellWidth: CELL_STYLES.width },
          3: { cellWidth: CELL_STYLES.width },
          4: { cellWidth: CELL_STYLES.width }
        },
        startY: yOffset,
        margin: { top: 30, left: 30, right: 15 },
        didDrawCell: (data) => {
          if (data.column.index >= 1) {
            const imgData = data.cell.raw.image;
            const { x, y, width, height } = data.cell;
  
            if (imgData) {
              doc.addImage(
                imgData,
                'JPEG',
                x + CELL_STYLES.padding,
                y + CELL_STYLES.padding,
                width - (CELL_STYLES.padding * 2),
                height - (CELL_STYLES.padding * 2)
              );
            } else {
              setFont('italic');
              doc.setTextColor(...CELL_STYLES.textColor);
              const textWidth = doc.getTextWidth(CELL_STYLES.errorText);
              console.log(data.row.index)
              if (data.row.index > 0) {
                doc.text(
                  CELL_STYLES.errorText,
                  x + (width - textWidth) / 2,
                  y + height / 2
                );
              }
            }
          }
        },
        willDrawCell: (data) => {
          if (data.column.index >= 1) {
            doc.setDrawColor(200);
            doc.rect(data.cell.x, data.cell.y, data.cell.width, data.cell.height);
          }
        }
      });
  
      yOffset = doc.lastAutoTable.finalY + 24;
  
      // Logs processing with optimized font switching
      if (screen.logUrl) {
        setFont('bold');
        doc.text("Monitoring Logs:", 30, yOffset);
        yOffset += 15;
  
        try {
          console.log(screen.logUrl);
          const logs = await processLogs(screen.logUrl);
          console.log(logs);
          setFont('normal');
          doc.setFontSize(8);
          
          logs.forEach(log => {
            const lines = doc.splitTextToSize(log.text, pageMetrics.usableWidth - 30);
            lines.forEach(line => {
              if (yOffset > pageMetrics.height - 50) {
                doc.addPage();
                addPageBorder();
                yOffset = 40;
              }
              doc.text(line, 30, yOffset);
              yOffset += 12;
            });
          });
        } catch (error) {
          setFont('italic');
          doc.setTextColor(...CELL_STYLES.textColor);
          doc.text('Error loading logs', 30, yOffset);
          yOffset += 12;
        }
      }
  
      // Add separator
      doc.line(30, yOffset, pageMetrics.width - 15, yOffset);
      yOffset += 24;
    }
  
    return yOffset;
  };
  
  try {
    // Generate main invoice page
    addPageBorder();
    generateInvoiceContent(jsonData);
  
    // Client confirmation page
    doc.addPage();
    addPageBorder();
    let yOffset = 42;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`Client Confirmation Screenshot: `, 30, yOffset);
    yOffset += 12;
    doc.line(30, yOffset, pageMetrics.width - 15, yOffset);
    yOffset += 12;
    yOffset = await addClientConfirmationToPage(
      campaignDetails.clientApprovalImgs,
      yOffset,
      canvas,
      pageMetrics,
      setFont
    );
  
    // PO PDF page
    doc.setFontSize(12);
    setFont("bold");
    doc.text(`Client's Purchase Order(PO) Screenshot: `, 30, yOffset);
    yOffset += 12;
    doc.line(30, yOffset, pageMetrics.width - 15, yOffset);
    yOffset += 12;
    yOffset = await addPOPdfToPage(
      billInvoiceDetailsData.uploadedPO,
      yOffset,
      canvas,
      pageMetrics,
      setFont
    );
  
    // Dashboard screenshots page
    doc.addPage();
    addPageBorder();
    yOffset = 42;
    setFont("bold");
    doc.setFontSize(12);
    doc.text(`Campaign Summary Dashboard Screenshot: `, 30, yOffset);
    setFont("normal");
    const dashboardDate = billInvoiceDetailsData.dashboardScreenshots
      ? new Date(Number(Object.keys(billInvoiceDetailsData.dashboardScreenshots)[0])).toLocaleString()
      : "Not available";
    doc.text(`Dated: ${dashboardDate}`, 450, yOffset);
    yOffset += 12;
    doc.line(30, yOffset, pageMetrics.width - 15, yOffset);
    yOffset += 4;
  
    const dashboardImages = billInvoiceDetailsData.dashboardScreenshots
      ? Object.values(billInvoiceDetailsData.dashboardScreenshots)[0]
      : [];
  
    if (dashboardImages?.length > 0) {
      await dashboardScreenshotsGrid(
        dashboardImages,
        yOffset,
        canvas,
        pageMetrics,
        setFont
      );
    } else {
      setFont("italic");
      doc.setTextColor(150, 150, 150);
      doc.text("No dashboard screenshot available...", 30, yOffset);
    }
  
    // Monitoring pictures and logs
    doc.addPage();
    addPageBorder();
    yOffset = 42;
    setFont("bold");
    doc.setFontSize(12);
    doc.text(`Monitoring Pictures: `, 30, yOffset);
    yOffset += 20;
    yOffset = await addMonitoringPicturesAndLogs(
      siteLevelData,
      yOffset,
      canvas,
      pageMetrics,
      setFont
    );
  
    // Final output handling
    if (preview) {
      const url = URL.createObjectURL(doc.output("blob"));
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  
    if (download) {
      doc.save(`${fileName}.pdf`);
    }
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error;
  } finally {
    setBillLoading(false);
  }


};