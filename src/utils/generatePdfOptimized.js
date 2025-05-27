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
  // Generate first page
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const usableWidth = pageWidth - 15 * 2;
  let yOffset = 40; // Reset yOffset for additional pages

  // Function to add a page border
  const addPageBorder = () => {
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    doc.setDrawColor(0); // Black border
    doc.setLineWidth(1); // Border thickness
    doc.rect(20, 20, pageWidth - 24, pageHeight - 40, "S");
  };

  // Function to generate the main invoice content
  const generateInvoiceContent = (data, pageWidth, pageHeight, usableWidth, yOffset) => {

      // Header Section (only for first page)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("TAX INVOICE", pageWidth / 2, yOffset, { align: "center" });
      yOffset += 20;
      doc.setFontSize(10);
      doc.text("PROOH TECHNOLOGIES PRIVATE LIMITED", 30, yOffset);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);

      doc.text(`Invoice No: ${data.invoiceNumber}`, 350, yOffset);
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

    // Table section
    doc.setFontSize(10);
    doc.autoTable({
      head: [["Sr.No", "Description", "HSN/SAC", "Quantity", "Rate", "Amount"]],
      body: [
        [
          "1",
          data.invoiceDescription,
          "998361",
          data.invoiceQuantity,
          Number(data.invoiceAmount).toFixed(0),
          Number(data.invoiceAmount).toFixed(0),
        ],
      ],
      styles: { fontSize: 10, halign: "center" },
      startY: yOffset,
      margin: { top: 30, left: 30, right: 30 },
      tableWidth: usableWidth,
      columnStyles: {
        0: { halign: "center", cellWidth: usableWidth / 15 },
        1: { halign: "left", cellWidth: (5 * usableWidth) / 12 },
        2: { halign: "center", cellWidth: usableWidth / 6 },
        3: { halign: "center", cellWidth: usableWidth / 8 },
        4: { halign: "center", cellWidth: usableWidth / 10 },
        5: { halign: "center", cellWidth: usableWidth / 10 },
      },
    });
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

  const converUrlToImageBlob = async(url, maxDim = 800) => {
    // const response = await fetch(url);
    // const blob = await response.blob();
    // const dataUrl = await convertBlobToDataURL(blob);
    // return dataUrl
    // fetch image as blob
    const res = await fetch(url);
    const blob = await res.blob();
    const img = await new Promise((ok, fail) => {
      const i = new Image();
      i.onload = () => ok(i);
      i.onerror = fail;
      i.src = URL.createObjectURL(blob);
    });

    // compute new dimensions
    let { width, height } = img;
    const scale = Math.min(1, maxDim / Math.max(width, height));
    width = Math.floor(width * scale);
    height = Math.floor(height * scale);

    // draw into canvas
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    // free up the object URL
    URL.revokeObjectURL(img.src);

    // export as low-quality JPEG
    return canvas.toDataURL("image/jpeg", 0.6);
  }

  const addClientConfirmationToPage = async (images, yOffset) => {
    for (const imageUrl of images) {
      let imageDataUrl = await converUrlToImageBlob(imageUrl);
      doc.addImage(
        imageDataUrl,
        'JPEG',
        30, // x position
        yOffset,  // y position
        pageWidth - 50, // width
        280   // height (adjust as needed)
      );
      yOffset += 280;
      imageDataUrl = null;
    }
    return yOffset += 24;
  }

  const addPOPdfToPage = async (uploadedPO, yOffset) => {
    try {
      // Load the PDF document with error handling
      const loadingTask = window.pdfjsLib.getDocument(uploadedPO);
      
      let pdf;
      try {
        pdf = await loadingTask.promise;
        if (!pdf) {
          console.error("Failed to load PDF: No document returned");
          doc.setFont("helvetica", "italic");
          doc.setTextColor(150, 150, 150);
          doc.text("PO PDF could not be loaded", 30, yOffset);
          return yOffset + 12; // Return updated yOffset
        }
      } catch (error) {
        console.error("PDF loading error:", error);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(150, 150, 150);
        doc.text("PO PDF could not be loaded", 30, yOffset);
        return yOffset + 12; // Return updated yOffset
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
        doc.setFont("helvetica", "italic");
        doc.setTextColor(150, 150, 150);
        doc.text("PO PDF page could not be loaded", 30, yOffset);
        return yOffset + 12; // Return updated yOffset
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
        doc.setFont("helvetica", "italic");
        doc.setTextColor(150, 150, 150);
        doc.text("PO PDF could not be rendered", 30, yOffset);
        return yOffset + 12; // Return updated yOffset
      }
  
      // Convert canvas to blob and add to PDF
      try {
        const poBlob = await getCanvasBlob(canvas);
        let poImageDataUrl = await convertBlobToDataURL(poBlob);
  
        doc.addImage(
          poImageDataUrl,
          'JPEG',
          30, // x position
          yOffset,  // y position
          pageWidth - 50, // width
          420   // height (adjust as needed)
        );
        
        poImageDataUrl = null;
        return yOffset + 432; // Return updated yOffset (420 + 12 padding)
      } catch (error) {
        console.error("Image conversion error:", error);
        doc.setFont("helvetica", "italic");
        doc.setTextColor(150, 150, 150);
        doc.text("PO PDF could not be converted", 30, yOffset);
        return yOffset + 12; // Return updated yOffset
      }
    } catch (error) {
      console.error("Unexpected error in addPOPdfToPage:", error);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(150, 150, 150);
      doc.text("PO PDF processing failed", 30, yOffset);
      return yOffset + 12; // Return updated yOffset
    }
  };

  const dashboardScreenshotsGrid = async (dashboardImages, yOffset) => {

    // Grid configuration
    const cols = 2;
    const rows = 3;
    const marginX = 30;
    const startY = yOffset;
    const padding = 15;
    const pageWidth = doc.internal.pageSize.getWidth(); // Assuming `doc` is defined elsewhere

    const imgWidth = (pageWidth - 2 * marginX - (cols - 1) * padding) / cols;
    const imgHeight = 240;

    let currentRow = 0;
    let currentCol = 0;

    for (const [index, dImage] of dashboardImages.entries()) {
      if (index > 0 && index % (cols * rows) === 0) {
        doc.addPage();
        currentRow = 0;
        currentCol = 0;
      }

      const x = marginX + currentCol * (imgWidth + padding);
      const y = startY + currentRow * (imgHeight + padding);

      let ssDataUrl = await converUrlToImageBlob(dImage);
      yOffset += 12; // Adjust offset (if needed)
      doc.addImage(ssDataUrl, 'JPEG', x, y, imgWidth, imgHeight);

      currentCol++;
      if (currentCol >= cols) {
        currentCol = 0;
        currentRow++;
      }
      ssDataUrl = null;
    }
    return yOffset;
  };

  const addMonitoringPicturesAndLogs = async (screenLevelCampaignData, yOffset) => {
    try {
      // Validate inputs
      if (!Array.isArray(screenLevelCampaignData)) {
        throw new Error('screenLevelCampaignData must be an array');
      }
      if (typeof yOffset !== 'number' || yOffset < 0) {
        throw new Error('yOffset must be a positive number');
      }
  
      for (const [index, screen] of screenLevelCampaignData.entries()) {
        console.log(index, screen.screenName);
        try {
          // Validate screen object
          if (!screen || typeof screen !== 'object') {
            console.warn(`Invalid screen data at index ${index}, skipping`);
            continue;
          }
  
          // Start a new page for each screen (except the first one)
          if (index > 0) {
            doc.addPage();
            addPageBorder();
            yOffset = 42;
          }
  
          // Add screen header
          doc.setFont("helvetica", "bold");
          doc.text(`Monitoring Pictures: ${screen.screenName || 'Unnamed Screen'}`, 30, yOffset);
          yOffset += 20;
  
          // Draw screen content
          const imgWidth = 60;
          const imgHeight = 40;
          
          try {
            doc.roundedRect(30, yOffset - 1, imgWidth + 2, imgHeight + 2, 3, 3, 'S');
            if (screen?.images?.[0]) {
              try {
                let imgData = await converUrlToImageBlob(screen.images[0]);
                doc.addImage(imgData, 'JPEG', 31, yOffset, imgWidth, imgHeight);
                imgData = null;
              } catch (imgError) {
                console.error(`Failed to load image for ${screen.screenName}:`, imgError);
                doc.text(`Image Load Failed`, 32, yOffset + 15);
              }
            } else {
              doc.text(`No Image`, 32, yOffset + 15);
            }
          } catch (drawError) {
            console.error(`Error drawing screen content for ${screen.screenName}:`, drawError);
            yOffset += imgHeight + 10; // Skip to next section if drawing fails
          }
  
          yOffset += 6;
          doc.setFont("helvetica", "bold");
          doc.text(`${screen.screenName || 'Unnamed Screen'}`, 100, yOffset);
          yOffset += 12;
          doc.setFont("helvetica", "normal");
          doc.text(`Touchpoint: ${screen.touchPoint || 'N/A'}`, 100, yOffset);
          doc.text(`Start Date: ${convertDateIntoDateMonthYear(campaignDetails?.startDate) || 'N/A'}`, 420, yOffset);
  
          yOffset += 12;
          doc.text(`Screen Type: ${screen.screenType || 'N/A'}`, 100, yOffset);
          doc.text(`End Date: ${convertDateIntoDateMonthYear(campaignDetails?.endDate) || 'N/A'}`, 420, yOffset);
  
          yOffset += 12;
          doc.text(`Location: ${screen.location || 'N/A'}`, 100, yOffset);
          doc.text(`Duration: ${campaignDetails?.duration || 'N/A'} Days`, 420, yOffset);
  
          yOffset += 12;
          doc.line(30, yOffset, pageWidth - 15, yOffset);
          yOffset += 12;
  
          const CELL_WIDTH = 120;
          const CELL_HEIGHT = 80;
          const IMAGE_PADDING = 2;
  
          // Safely process monitoring data
          const monitoringEntries = (screen.monitoringData || []).map(da => {
            try {
              return {
                dateType: da.dateType?.split("Date")[0]?.toUpperCase() || 'N/A',
                date: da.date || 'N/A',
                images: {
                  dayShot: da.monitoringTypeWiseData?.find(dt => dt.monitoringType === "dayShot")?.monitoringUrls?.[0]?.awsUrl,
                  newspaper: da.monitoringTypeWiseData?.find(dt => dt.monitoringType === "withNewspaper")?.monitoringUrls?.[0]?.awsUrl,
                  geoTag: da.monitoringTypeWiseData?.find(dt => dt.monitoringType === "withGeoTag")?.monitoringUrls?.[0]?.awsUrl,
                  nightShot: da.monitoringTypeWiseData?.find(dt => dt.monitoringType === "nightShot")?.monitoringUrls?.[0]?.awsUrl
                }
              };
            } catch (e) {
              console.error('Error processing monitoring entry:', e);
              return {
                dateType: 'ERROR',
                date: 'ERROR',
                images: {}
              };
            }
          });
  
          // Create a 2D array of image promises that matches the table structure
          let imagePromises = monitoringEntries.map(entry => {
            return [
              entry.images.dayShot ? converUrlToImageBlob(entry.images.dayShot).catch(() => null) : Promise.resolve(null),
              entry.images.newspaper ? converUrlToImageBlob(entry.images.newspaper).catch(() => null) : Promise.resolve(null),
              entry.images.geoTag ? converUrlToImageBlob(entry.images.geoTag).catch(() => null) : Promise.resolve(null),
              entry.images.nightShot ? converUrlToImageBlob(entry.images.nightShot).catch(() => null) : Promise.resolve(null)
            ];
          });
  
          // Wait for all images to load before drawing
          let allImages = [];
          try {
            allImages = await Promise.all(imagePromises.map(row => Promise.all(row)));
          } catch (e) {
            console.error('Error loading some images:', e);
            // Fill with nulls if there was an error
            allImages = monitoringEntries.map(() => [null, null, null, null]);
          }
  
          // Create table body with proper error handling
          const tableBody = monitoringEntries.map((da, rowIndex) => {
            const createCell = (columnIndex) => {
              const url = Object.values(da.images)[columnIndex];
              const imgData = allImages[rowIndex]?.[columnIndex];
              
              if (!url) {
                return { 
                  content: ' ', // Empty content
                  data: { noImage: true } 
                };
              }
              return { 
                content: ' ', // Empty content
                data: { image: url, data: imgData } 
              };
            };
          
            return [
              `${convertDateIntoDateMonthYear(da.date) || 'N/A'} \n ${da.dateType}`, // First column remains normal text
              createCell(0),
              createCell(1),
              createCell(2),
              createCell(3)
            ];
          });
  
          // Add monitoring pictures table
          try {
            doc.autoTable({
              head: [["Picture Type", "Day Shot", "Newspaper", "GPS", "Night Shot"]],
              body: tableBody,
              styles: { halign: "center", cellPadding: 1, minCellHeight: CELL_HEIGHT },
              headStyles: {
                minCellHeight: 15,
                fillColor: [200, 200, 200],
                textColor: 0,
                cellPadding: { top: 3, right: 1, bottom: 3, left: 1 }
              },
              columnStyles: {
                0: { cellWidth: 65 },
                1: { cellWidth: CELL_WIDTH },
                2: { cellWidth: CELL_WIDTH },
                3: { cellWidth: CELL_WIDTH },
                4: { cellWidth: CELL_WIDTH }
              },
              startY: yOffset,
              margin: { top: 30, left: 30, right: 15 },
              didDrawCell: (data) => {
                if (data.column.index >= 1) {
                  const cell = data.cell.raw.data;
                  const x = data.cell.x + IMAGE_PADDING;
                  const y = data.cell.y + IMAGE_PADDING;
                  const width = data.cell.width - (IMAGE_PADDING * 2);
                  const height = data.cell.height - (IMAGE_PADDING * 2);
              
                  // Clear default text
                  doc.setTextColor(255, 255, 255); // "Erase" default text
                  doc.text(' ', data.cell.x, data.cell.y);
                  doc.setTextColor(0, 0, 0);
              
                  if (cell?.noImage) {
                    doc.setFontSize(8);
                    doc.setTextColor(150, 150, 150);
                    const text = "No Image";
                    const textWidth = doc.getTextWidth(text);
                    doc.text(
                      text,
                      data.cell.x + (data.cell.width - textWidth) / 2,
                      data.cell.y + (data.cell.height / 2) + 3
                    );
                  } else if (cell?.image) {
                    try {
                      if (cell.data) {
                        doc.addImage(cell.data, 'JPEG', x, y, width, height);
                        cell.data = null;
                      } else {
                        throw new Error('Image data missing');
                      }
                    } catch (error) {
                      doc.setFontSize(8);
                      doc.text('Load Failed', x + 5, y + 10);
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
          } catch (tableError) {
            console.error(`Error creating monitoring table for ${screen.screenName}:`, tableError);
            yOffset += 100; // Skip past where the table would have been
          }
  
          // Add logs section header on the same page
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          doc.text("Monitoring Logs:", 30, yOffset);
          doc.setFontSize(8);
  
          yOffset += 12;
  
          // Only attempt to fetch logs if URL exists
          if (screen.logUrl) {
            try {
              const resp = await fetch(screen.logUrl);
              if (!resp.ok) throw new Error(`HTTP ${resp.status} fetching logs`);
              const arrayBuffer = await resp.arrayBuffer();
              const data = new Uint8Array(arrayBuffer);
              const workbook = XLSX.read(data, { type: 'array' });
  
              // Process each worksheet
              for (const sheetName of workbook.SheetNames) {
                try {
                  const worksheet = workbook.Sheets[sheetName];
                  const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
                  // Estimate table height
                  const rowCount = rows.length;
                  const approxRowHeight = 10;
                  const headerHeight = 15;
                  const estimatedHeight = headerHeight + (rowCount * approxRowHeight);
  
                  // Check if we need a new page
                  if (yOffset + estimatedHeight > doc.internal.pageSize.height - 50) {
                    doc.setFont("helvetica", "bold");
                    doc.text(`${screen.screenName || 'Screen'} Logs:`, 30, yOffset);
                    yOffset += 12;
                  }
  
                  // Add sheet title
                  doc.setFont("helvetica", "bold");
                  doc.text(`Date: ${sheetName}`, 30, yOffset);
                  yOffset += 12;
  
                  // Convert to autoTable format
                  const tableData = rows.length > 1 ? rows.slice(1) : [];
  
                  // Add table
                  try {
                    doc.autoTable({
                      head: rows.length > 0 ? [rows[0]] : [],
                      body: tableData,
                      startY: yOffset,
                      theme: 'grid',
                      styles: { fontSize: 8 },
                      headStyles: { fillColor: [41, 128, 185] },
                      didParseCell: (data) => {
                        if (data.row.index === 0) {
                          data.cell.styles.fontStyle = 'bold';
                        }
                      },
                      didDrawPage: (data) => {
                        if (data.pageNumber > 1) {
                          doc.setFont("helvetica", "bold");
                          doc.text(`Screen: ${screen.screenName || 'Screen'}`, 30, 20);
                        }
                      }
                    });
                    
                    yOffset = doc.lastAutoTable.finalY + 15;
                  } catch (logTableError) {
                    console.error(`Error creating log table for sheet ${sheetName}:`, logTableError);
                    doc.text('Error displaying logs', 30, yOffset);
                    yOffset += 20;
                  }
  
                  // Add separator if more sheets remain
                  if (workbook.SheetNames.indexOf(sheetName) < workbook.SheetNames.length - 1) {
                    doc.line(30, yOffset, pageWidth - 15, yOffset);
                    yOffset += 20;
                  }
                } catch (sheetError) {
                  console.error(`Error processing sheet ${sheetName}:`, sheetError);
                  doc.text(`Error processing log sheet: ${sheetName}`, 30, yOffset);
                  yOffset += 20;
                }
              }
            } catch (logError) {
              console.error(`Error fetching/processing logs for ${screen.screenName}:`, logError);
              doc.text('Error loading monitoring logs', 30, yOffset);
              yOffset += 20;
            }
          } else {
            doc.text('No log URL provided', 30, yOffset);
            yOffset += 20;
          }
  
          // Add separator at the end of the screen's content
          doc.line(30, yOffset, pageWidth - 15, yOffset);
          yOffset += 20;
  
          // Force page break before next screen
          if (index < screenLevelCampaignData.length - 1) {
            doc.addPage();
            addPageBorder();
            yOffset = 42;
          }
        } catch (screenError) {
          console.error(`Error processing screen at index ${index}:`, screenError);
          // Try to continue with next screen
          if (index < screenLevelCampaignData.length - 1) {
            doc.addPage();
            addPageBorder();
            yOffset = 42;
          }
        }
      }
      return yOffset;
    } catch (error) {
      console.error('Fatal error in addMonitoringPicturesAndLogs:', error);
      throw error; // Re-throw for caller to handle
    }
  };

  // Invoice
  addPageBorder();
  console.log("generating invoice...");
  generateInvoiceContent(jsonData, pageWidth, pageHeight, usableWidth, yOffset);
  console.log("generating invoice successfull...");

  // Client and PO screenshot
  doc.addPage();
  addPageBorder();

  yOffset = 42;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`Client Confirmation Screenshot: `, 30, yOffset);
  doc.setFontSize(8);
  yOffset += 12;
  doc.line(30, yOffset, pageWidth - 15, yOffset);
  yOffset += 12;
  console.log("uploading client confirmation screenshot...");
  yOffset = await addClientConfirmationToPage(campaignDetails.clientApprovalImgs, yOffset);
  console.log("client confirmation screenshot upload successfull...");

  doc.setFontSize(12);
  doc.text(`Client's Purchase Order(PO) Screenshot: `, 30, yOffset);
  doc.setFontSize(8);
  yOffset += 12;
  doc.line(30, yOffset, pageWidth - 15, yOffset);
  doc.setFont("helvetica", "normal");
  yOffset += 12;
  console.log("uploading PO screenshot...");
  await addPOPdfToPage(billInvoiceDetailsData.uploadedPO, yOffset);
  console.log("uploading PO screenshot successfull...");


  // Dashboard screenshot
  doc.addPage();
  addPageBorder();

  yOffset = 42;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`Campaign Summary Dashboard Screenshot: `, 30, yOffset);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  console.log(billInvoiceDetailsData.dashboardScreenshots);
  doc.text(`Dated: ${billInvoiceDetailsData.dashboardScreenshots ? new Date(Number(Object.keys(billInvoiceDetailsData.dashboardScreenshots)[0])).toLocaleString() : "Not available"}`, 450, yOffset);
  yOffset += 12;
  doc.line(30, yOffset, pageWidth - 15, yOffset);
  yOffset += 4;
  console.log("uploading dashboard screenshots...");
  // Handle cases with no valid images
  const imagesHere = billInvoiceDetailsData.dashboardScreenshots;
  if (
    imagesHere === undefined ||
    Object.entries(imagesHere)[0][1] === undefined ||
    Object.entries(imagesHere)[0][1] === null ||
    !Array.isArray(Object.entries(imagesHere)[0][1]) ||
    Object.entries(imagesHere)[0][1].length === 0 ||
    Object.entries(imagesHere)[0][1].every(img => img === "")
  ) { doc.setFont("helvetica", "italic");
    doc.setTextColor(150, 150, 150);
    doc.text("No dashboard screenshot available...", 30, yOffset);
    yOffset + 12; // Return updated yOffsetreturn yOffset; // Return original offset if no valid images
  } else {
    await dashboardScreenshotsGrid(Object.entries(billInvoiceDetailsData.dashboardScreenshots)[0][1], yOffset);
  }
  console.log("dashboard screenshots uploaded successfully...");


  // Monitoring screenshot
  doc.addPage();
  addPageBorder();

  yOffset = 42;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`Monitoring Pictures: `, 30, yOffset);
  doc.setFontSize(8);
  yOffset += 20;
  console.log("uploading monitoring pics and logs...");
  yOffset = await addMonitoringPicturesAndLogs(siteLevelData, yOffset);
  console.log("monitoring pics and logs uploaded successfully...");

  yOffset += 12;

  // const generatedPdf = doc.output('arraybuffer');

  // const s3Response = await fetch(s3Url);
  // const s3PdfBytes = await s3Response.arrayBuffer();
  
  // // 2. Merge the PDFs using pdf-lib
  // const mergedPdfBytes = await mergePdfs(generatedPdf, s3PdfBytes);

  // // 3. Handle the merged PDF
  // const mergedPdfBlob = new Blob([mergedPdfBytes], { type: 'application/pdf' });

  // if (preview) {
  //   const url = URL.createObjectURL(mergedPdfBlob);
  //   window.open(url, "_blank");
  //   setTimeout(() => URL.revokeObjectURL(url), 1000);
  // }

  // instead of doc.output("blob"):
  const arrayBuffer = doc.output("arraybuffer");
  // now build the Blob manually
  const pdfBlob = new Blob([arrayBuffer], { type: "application/pdf" });
  console.log("Starting", pdfBlob); 

  // if (preview) {
  //   console.log("pdf blob", pdfBlob);
  //   const url = URL.createObjectURL(pdfBlob);
  //   window.open(url, "_blank");
  //   setTimeout(() => URL.revokeObjectURL(url), 2000);
  // }
  
  // Save the PDF
  if (download) {
    doc.save(`${fileName}.pdf`);
    console.log("slfkk", doc);
  }

  setBillLoading(false);
  return 
};
