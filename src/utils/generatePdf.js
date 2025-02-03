import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import PptxGenJS from "pptxgenjs";
import { numberToWords } from "./formatValue";

const getBase64ImageFromUrl = async (imageUrl) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const addHeaderAndFooter = (doc, totalPages) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i<= pageCount; i++) {
    doc.setPage(i);

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`PROOH TECHNOLOGIES PRIVATE LIMITED`, pageWidth/2, 15, { align: "center"});
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Regd. Off: 322-325, 3rd Floor, Paras Trade Center, Gwal Pahari, Sector 2 Gurgaon, Haryana, 122002`, pageWidth/2 , 20, { align: "center" });
    doc.setFontSize(10);
    doc.text(`CIN-U74999HR2022PTC104131, Email: plan@prooh.ai`, pageWidth/2, 25, { align: "center" });
    doc.line(10, 30, pageWidth-10, 30);

    // Footer
    doc.line(10, 285, pageWidth-10, 285);
    doc.text(`Page ${i} of ${totalPages}`, 10, 290);
    doc.text("Generated by PROOH.AI", pageWidth-10, 290, { align: "right" });
  }
}

const addCostSummaryData = (costData, doc, yOffset) => {
  const PAGE_HEIGHT = doc.internal.pageSize.height; // Total page height
  const FOOTER_MARGIN = 30; // Margin for the footer
  const HEADER_MARGIN = 30; // Margin for the header

  // Function to ensure content fits on the page
  const checkPageBreak = (rowHeight = 0) => {
    if (yOffset + rowHeight > PAGE_HEIGHT - FOOTER_MARGIN) {
      doc.addPage(); // Add a new page
      yOffset = HEADER_MARGIN + 10; // Reset yOffset below the header
    }
  };

  Object.keys(costData)?.forEach((key) => {
    // Add heading for each location
    checkPageBreak(30); // Reserve space for the table header

    doc.setFontSize(12);
    doc.text(key.toUpperCase(), 15, yOffset);
    yOffset += 5;

    // Prepare the data for the table
    const locationDetails = [
      ["Total Screens", Number(costData[key].totalScreens)],
      ["Total Impressions", Number(costData[key].totalImpression).toFixed(0)],
      ["Total Reach", Number(costData[key].totalReach).toFixed(0)],
      ["Total Slots", Number(costData[key].totalSlots).toFixed(0)],
      ["Total Campaign Budget", `INR ${Number(costData[key].totalCampaignBudget).toFixed(0)}`],
      ["Total CPM", `INR ${Number(costData[key].totalCpm).toFixed(0)}`],
      ["Total Price Per Slot", `INR ${Number(costData[key].pricePerSlot).toFixed(0)}`],
    ];

    // Check for page space before adding the table
    checkPageBreak(30); // Reserve space for the table header

    // Add the table with row-specific page break handling
    doc.autoTable({
      body: locationDetails,
      startY: yOffset,
      margin: { top: 10 },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      didDrawCell: (data) => {
        if (data.row.index === 0 && data.cursor.y + 10 > PAGE_HEIGHT - FOOTER_MARGIN) {
          // If the first cell of the row is exceeding the page, add a new page
          doc.addPage();
          yOffset = HEADER_MARGIN + 10; // Reset yOffset for the new page
          // doc.text(key.toUpperCase(), 15, yOffset - 10); // Redraw the section title
          data.cursor.y = HEADER_MARGIN + 10; // Reset the cursor position for the new page
        }
      },
    });

    // Update yOffset after the table
    yOffset = doc.lastAutoTable.finalY + 20;

    // Check if we need a new page for the next section
    checkPageBreak();
  });

  return yOffset;
};


const addCreativeSummaryData = (creativeData, doc, yOffset) => {
  const PAGE_HEIGHT = doc.internal.pageSize.height; // Get the height of the page
  const FOOTER_MARGIN = 30; // Space reserved for the footer
  const HEADER_MARGIN = 30; // Space reserved for the footer


  // Function to ensure content fits on the page
  const checkPageBreak = (rowHeight = 0) => {
    if (yOffset + rowHeight > PAGE_HEIGHT - FOOTER_MARGIN) {
      doc.addPage(); // Add a new page
      yOffset = HEADER_MARGIN + 10; // Reset yOffset below the header
    }
  };

  Object.keys(creativeData)?.forEach((key) => {
    checkPageBreak(30);
    // Add the section title
    doc.setFontSize(12);
    doc.text(key.toUpperCase(), 15, yOffset);
    yOffset += 5;

    // Prepare table rows
    const tableRows = Object.entries(creativeData[key]).map(([resolution, count]) => [resolution, count]);

    // Ensure space for the table; add a new page if necessary
    checkPageBreak(30); // Estimated height for the table header and some rows

    // Add the table
    doc.autoTable({
      head: [["Resolution", "Count"]],
      body: tableRows,
      startY: yOffset,
      margin: { top: 30 },
      theme: 'grid',
      didDrawCell: (data) => {
        if (data.row.index === 0 && data.cursor.y + 10 > PAGE_HEIGHT - FOOTER_MARGIN) {
          // If the first cell of the row is exceeding the page, add a new page
          doc.addPage();
          yOffset = HEADER_MARGIN + 10; // Reset yOffset for the new page
          doc.text(screen.screenName, 15, yOffset - 10); // Redraw the section title
          data.cursor.y = HEADER_MARGIN + 10; // Reset the cursor position for the new page
        }
      },
    });

    // Update yOffset after the table
    yOffset = doc.lastAutoTable.finalY + 20;

    // Check if the next content requires a page break
    checkPageBreak();
  });

  return yOffset;
};


export const generateCampaignSummaryPdfFromJSON = ({ preview=false, download, jsonData, fileName, heading }) => {
  const doc = new jsPDF();
  const campaignApproach = jsonData.approach[0];
  const costSummary = jsonData.costSummary[0];
  const creativeSummary = jsonData.creativeRatio;
  const FOOTER_MARGIN = 30; // Space reserved for the footer
  const HEADER_MARGIN = 30; // Space reserved for the header
  const PAGE_HEIGHT = doc.internal.pageSize.height;
  const PAGE_WIDTH = doc.internal.pageSize.width;


  let yOffset = 40;

  const checkPageBreak = (rowHeight = 0) => {
    if (yOffset + rowHeight > PAGE_HEIGHT - FOOTER_MARGIN) {
      doc.addPage();
      yOffset = HEADER_MARGIN + 10; // Reset to top margin of the new page
    }
  };

  const campaignDetails = [
    ["Name", campaignApproach.name],
    ["Brand Name", campaignApproach.brandName],
    ["Client Name", campaignApproach.clientName],
    ["Campaign Type", `${campaignApproach.campaignType} Plan`],
    ["Industry", campaignApproach.industry],
    ["Start Date", new Date(campaignApproach.startDate).toLocaleString()],
    ["End Date", new Date(campaignApproach.endDate).toLocaleString()],
    ["Duration (days)", `${campaignApproach.duration} Days`],
    ["Markets", campaignApproach.markets.join(", ")],
    ["SOV", `${campaignApproach.sov}/18`],
    ["Total Impressions", campaignApproach.totalImpression.toFixed(0)],
    ["Total CPM", `INR ${campaignApproach.totalCpm.toFixed(2)}`],
    ["Total Reach", campaignApproach.totalReach.toFixed(0)],
    ["Total Campaign Budget", `INR ${campaignApproach.totalCampaignBudget.toFixed(0)}`],
    ["Discount Availed", `INR ${campaignApproach.couponId !== "" ? campaignApproach.totalDiscount.toFixed(0) : "None"}`],
    campaignApproach?.couponId !== "" ? [
      "Final Campaign Budget", `INR ${campaignApproach.finalCampaignBudget.toFixed(0)}`
    ] : ["Final Campaign Budget", `INR ${campaignApproach.totalCampaignBudget.toFixed(0)}`],
  ];
  // Campaign Overview
  doc.setFontSize(16);
  doc.text("Campaign Overview", 10, yOffset);
  yOffset += 10;
  checkPageBreak();

  doc.autoTable({
    body: campaignDetails,
    startY: yOffset,
    margin: { top: 30 },
    bodyStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
    },
    didDrawCell: (data) => {
      if (data.row.index === 0 && data.cursor.y + 10 > PAGE_HEIGHT - FOOTER_MARGIN) {
        // If the first cell of the row is exceeding the page, add a new page
        doc.addPage();
        yOffset = HEADER_MARGIN + 10; // Reset yOffset for the new page
        // doc.text(key.toUpperCase(), 15, yOffset - 10); // Redraw the section title
        data.cursor.y = HEADER_MARGIN + 10; // Reset the cursor position for the new page
      }
    },
  });
  console.log(doc);
  yOffset = doc.lastAutoTable.finalY + 10;
  checkPageBreak();

  // Selected Touchpoints
  doc.setFontSize(12);
  doc.text("Selected Touchpoints", 10, yOffset);
  yOffset += 10;
  checkPageBreak();

  campaignApproach.touchPoints.forEach((point, idx) => {
    doc.setFontSize(10);
    doc.text(`${idx + 1}. ${point}`, 15, yOffset);
    yOffset += 5;
    checkPageBreak();
  });

  yOffset += 5;
  checkPageBreak();

  // Selected Audience Cohorts
  doc.setFontSize(12);
  doc.text("Selected Audience Cohorts", 10, yOffset);
  yOffset += 10;
  checkPageBreak();

  campaignApproach.cohorts.forEach((cohort, idx) => {
    doc.setFontSize(10);
    doc.text(`${idx + 1}. ${cohort}`, 15, yOffset);
    yOffset += 5;
    checkPageBreak();
  });

  yOffset += 5;
  checkPageBreak();


  // Cost Summary
  doc.setFontSize(14);
  doc.text("Cost Summary", 10, yOffset);
  yOffset += 10;
  checkPageBreak();

  yOffset = addCostSummaryData(costSummary, doc, yOffset);

  // Creative Ratio
  doc.setFontSize(14);
  doc.text("Creative Ratio", 10, yOffset);
  yOffset += 10;
  checkPageBreak();

  yOffset = addCreativeSummaryData(creativeSummary, doc, yOffset);

  // Screen-wise Slot Details
  doc.setFontSize(12);
  doc.text("Selected time interval as per selected audience cohorts", 10, yOffset);
  yOffset += 10;
  checkPageBreak();

  campaignApproach.screenWiseSlotDetails.forEach((screen, idx) => {
    doc.setFontSize(10);
    doc.text(`${screen.screenName}`, 15, yOffset);
    yOffset += 10;
    checkPageBreak();

    doc.autoTable({
      head: [["Day", "Slot"]],
      body: Object.entries(
        screen.slotsInfo.reduce((acc, { day, slot }) => ((acc[day.toUpperCase()] ??= []).push(slot.toUpperCase()), acc), {})
      ),
      startY: yOffset,
      margin: { top: 30 },
      didDrawCell: (data) => {
        if (data.row.index === 0 && data.cursor.y + 10 > PAGE_HEIGHT - FOOTER_MARGIN) {
          // If the first cell of the row is exceeding the page, add a new page
          doc.addPage();
          yOffset = HEADER_MARGIN + 20; // Reset yOffset for the new page
          doc.text(screen.screenName, 15, yOffset - 10); // Redraw the section title
          data.cursor.y = HEADER_MARGIN + 10; // Reset the cursor position for the new page
        }
      },
      columnStyles: {
        0: { halign: "let", cellWidth: PAGE_WIDTH/4 },
        1: { halign: "left", cellWidth: 3 * PAGE_WIDTH / 4 },
      },
    });
    
    yOffset = doc.lastAutoTable.finalY + 20;
    checkPageBreak();
  });

  yOffset += 5;
  checkPageBreak();

  // Header and Footer
  const totalPages = doc.getNumberOfPages();
  addHeaderAndFooter(doc, totalPages);

  if (preview) {
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  
  if (download) {
    doc.save(`${fileName}.pdf`);
  } else {
    const pdfBlob = doc.output('blob');
    return pdfBlob;
  }
};

export const generatePlanSummaryPdfFromJSON = ({ download, jsonData, fileName, heading }) => {
  const doc = new jsPDF();
  let yOffset = 10;
  const lineHeight = 5; // Define consistent line height
  const spaceBetweenSections = 5; // Define space between sections

  console.log(jsonData);
  // Add the main heading and subheading to the first page
  const addHeading = (heading) => {
    // Main Heading
    doc.setFontSize(18);
    doc.text(heading, 5, yOffset);
    yOffset += lineHeight * 2; // Double the space for heading

  };

  const addPageWithData = (locationData) => {
    Object.keys(locationData)?.forEach((key, index) => {
      if (index > 0) {
        // Add space between each location section
        yOffset += spaceBetweenSections;

        // If space exceeds page height, create a new page
        if (yOffset + 5 > doc.internal.pageSize.height) {
          doc.addPage();
          yOffset = 5; // Reset yOffset for new page
        }
      }

      // Add heading for each location
      doc.setFontSize(16);
      doc.text(key, 5, yOffset);
      yOffset += lineHeight;

      // Prepare the data for the table
      const locationDetails = [
        ["Total Screens", Number(locationData[key].totalScreens) || 0],
        ["Total Impressions", Number(locationData[key].totalImpression).toFixed(0) || '0'],
        ["Total Reach", Number(locationData[key].totalReach).toFixed(0) || '0'],
        ["Total Campaign Budget (In INR)", Number(locationData[key].totalCampaignBudget).toFixed(0) || '0'],
        ["Total CPM (In INR)", Number(locationData[key].totalCpm).toFixed(2) || '0.00'],
      ];

      // Add table for each location's data
      doc.autoTable({
        head: [["Field", "Value"]],
        body: locationDetails,
        startY: yOffset,
        margin: { top: 20 },
      });

      // Adjust yOffset after table
      yOffset = doc.autoTable.previous.finalY + lineHeight;
    });
  };

  // First Page: Add the heading and subheading
  addHeading(heading);

  // Add the location data
  Object.keys(jsonData).forEach((location) => {
    addPageWithData(jsonData[location]);
  });

  // Save the PDF
  if (download) {
    doc.save(`${fileName}.pdf`);
  } else {
    const pdfBlob = doc.output('blob');
    return pdfBlob;
  }
};

export const generateScreenPicturesPptFromJSON = async ({ download, jsonData, fileName, heading }) => {
  const pptx = new PptxGenJS();
  
  // Create a title slide with the heading
  const titleSlide = pptx.addSlide();
  titleSlide.addText(heading, { x: 1, y: 1, fontSize: 24, bold: true, color: '000000' });

  // Function to add a slide for each screen with details and images
  const addScreenSlide = async (screenData) => {
    const slide = pptx.addSlide();

    // Add screen name
    slide.addText(`Screen Name: ${screenData.screenId}`, { x: 0.5, y: 0.5, fontSize: 18, bold: true });
    
    // Add location details
    slide.addText(`Location: ${screenData.location.city}, ${screenData.location.state}, ${screenData.location.country}`, { x: 0.5, y: 1, fontSize: 16 });
    slide.addText(`Address: ${screenData.location.address}`, { x: 0.5, y: 1.5, fontSize: 16 });
    slide.addText(`TouchPoint: ${screenData.location.touchPoint}`, { x: 0.5, y: 2, fontSize: 16 });

    // Check if there are images to load
    if (screenData.images && screenData.images.length > 0) {
      // const imageUrl = "https://cors-anywhere.herokuapp.com/" + screenData.images[0];
      const imageUrl = screenData.images[0];
      
      console.log(imageUrl);


      try {
        // Add the image to the slide directly by URL (let pptxgenjs handle the loading)
        slide.addImage({ path: imageUrl, x: 0.5, y: 2.5, w: 6, h: 3.5 }); // Adjust image size as necessary
      } catch (error) {
        console.error("Error loading image:", error);
        slide.addText("Image could not be loaded.", { x: 0.5, y: 2.5, fontSize: 16, color: "FF0000" });
      }
    } else {
      slide.addText("No image available.", { x: 0.5, y: 2.5, fontSize: 16, color: "FF0000" });
    }

    // Add clickable image URL as fallback
    slide.addText(`Image URL: ${screenData.images[0]}`, {
      x: 0.5, y: 6,
      fontSize: 14, color: '0000FF',
      hyperlink: { url: screenData.images[0], tooltip: 'View Image' }
    });
  };

  // Loop through each screen and add slides
  for (let i = 0; i < jsonData.length; i++) {
    await addScreenSlide(jsonData[i]);
  }

  // Save the PPTX file
  if (download) {
    pptx.writeFile({ fileName: `${fileName}.pptx` });
  } else {
    const pdfBlob = doc.output('blob');
    console.log(pdfBlob);
    return pdfBlob;
  }
};


export const generateBillAndInvoicePdf = ({ preview= true, download= false, fileName, jsonData }) => {

  console.log(jsonData);
  const doc = new jsPDF("portrait", "pt", "a4");

   // Add border around the page
   const pageWidth = doc.internal.pageSize.width;
   const pageHeight = doc.internal.pageSize.height;

   let yOffset = 40;

   doc.setDrawColor(0); // Black border
   doc.setLineWidth(1); // Border thickness
   doc.rect(20, 20, pageWidth - 40, pageHeight - 40, "S");

  // Header Section
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("TAX INVOICE", pageWidth/2, yOffset, { align: "center"})
  yOffset += 20;
  doc.setFontSize(10);
  doc.text("PROOH TECHNOLOGIES PRIVATE LIMITED", 30, yOffset);
  doc.setFont("helvetica", "normal");
  doc.text(`Invoice No: ${jsonData.invoiceNumber}`, 300, yOffset);
  yOffset += 15;
  doc.text(`Contact Person: ${jsonData.planner}`, 30, yOffset);
  doc.text(`Invoice Date: ${jsonData.invoiceDate}`, 300, yOffset);
  yOffset += 15;
  doc.text(`Email Id: ${jsonData.plannerEmail}`, 30, yOffset);
  doc.text(`Internal SO No: ${jsonData.internalSoNumber}`, 300, yOffset);
  yOffset += 15;
  doc.text(`PAN No: AAMCP9602J`, 30, yOffset);
  doc.text(`Client Confirmation: ${jsonData.clientConfirmation}`, 300, yOffset);
  yOffset += 15;
  doc.text(`GST No: 06AAMCP9602J1Z2`, 30, yOffset);
  doc.text(`Client Order Date: ${jsonData.clientOrderDate}`, 300, yOffset);
  yOffset += 15;
  doc.text(``, 30, yOffset);
  doc.text(`Purchase Order No.: ${jsonData.poNumber}`, 300, yOffset);
  yOffset += 15;
  doc.setFont("helvetica", "bold");
  doc.text("Client Details:-", 30, yOffset);
  doc.setFont("helvetica", "normal");
  doc.text(`Campaign Name: ${jsonData.campaignName}`, 300, yOffset);
  yOffset += 15;
  doc.setFont("helvetica", "bold");
  doc.text(`${jsonData.clientAgencyName}`, 30, yOffset);

  doc.setFont("helvetica", "normal");
  doc.text(`Campaign Duration: ${jsonData.startDate} - ${jsonData.endDate}`, 300, yOffset);
  yOffset += 15;

  const wrappedAddress = doc.splitTextToSize(`${jsonData.officeAddress.address}`, 250);
  doc.text(wrappedAddress, 30, yOffset);
  yOffset += wrappedAddress.length * 8 + 12;
  // yOffset += 15;
  doc.text(`${jsonData.officeAddress.city}, ${jsonData.officeAddress.state}, ${jsonData.officeAddress.country}, ${jsonData.officeAddress.zipCode}`, 30, yOffset);
  yOffset += 15;
  doc.text(`Contact Person: ${jsonData?.pocName}`, 30, yOffset);
  yOffset += 15;
  doc.text(`Contact No.: ${jsonData?.pocContact}`, 30, yOffset);
  yOffset += 15;
  doc.text(`Email Id: ${jsonData?.pocEmail}`, 30, yOffset);
  yOffset += 15;
  doc.text(`GSTIN No.: ${jsonData?.gst}`, 30, yOffset);
  yOffset += 15;
  doc.text(`PAN No.: ${jsonData?.pan}`, 30, yOffset);
  yOffset += 15;

  // // Table for Items
  // const tableBody = jsonData.items.map((item, index) => [
  //   index + 1,
  //   item.description,
  //   item.hsn,
  //   item.quantity,
  //   item.rate.toLocaleString(),
  //   item.amount.toLocaleString(),
  // ]);


  doc.autoTable({
    head: [["Sr.No", "Description", "HSN/SAC", "Quantity", "Rate", "Amount"]],
    body: [["1", jsonData.invoiceDescription, "998361", jsonData.invoiceQuantity, Number(jsonData.invoiceAmount).toFixed(0), Number(jsonData.subTotalAmount).toFixed(0)]],
    styles: { fontSize: 10, halign: "center" },
    startY: yOffset,
    margin: { top: 30 },
    columnStyles: {
      0: { halign: "center", cellWidth: 50 },
      1: { halign: "left", cellWidth: 250 },
      2: { halign: "center", cellWidth: 70 },
      3: { halign: "center", cellWidth: 50 },
      4: { halign: "center", cellWidth: 50 },
      5: { halign: "center", cellWidth: 50 },
    },
  });
  yOffset = doc.lastAutoTable.finalY + 15;
  doc.setFont("helvetica", "bold");
  doc.text(`Sub Total`, 320, yOffset);
  doc.text(`INR ${Number(jsonData.invoiceAmount).toFixed(0)}`, 500, yOffset);
  yOffset += 15;
  doc.line(30, yOffset, pageWidth - 30, yOffset);
  yOffset += 15;
  doc.text(`Amount in words`, 30, yOffset);
  doc.line(pageWidth/2, yOffset - 15, pageWidth/2, yOffset + 35);
  doc.text(`Output IGST @${jsonData.outPutGstPercent}%`, 320, yOffset);
  doc.text(`INR ${Number(jsonData.outPutGstAmount).toFixed(2)}`, 500, yOffset);
  yOffset += 15;
  doc.setFont("helvetica", "normal");
  const wrappedText = doc.splitTextToSize(`${numberToWords(Number(jsonData.subTotalAmount).toFixed(0))}`, 250);
  doc.text(wrappedText, 30, yOffset);
  yOffset += wrappedText.length * 10;
  doc.line(30, yOffset, pageWidth - 30, yOffset);
  yOffset += 15;
  doc.setFont("helvetica", "bold");
  doc.text(`Total: `, 320, yOffset);
  doc.text(`INR ${Number(jsonData.subTotalAmount).toFixed(0)} /-`, 500, yOffset);
  yOffset += 12;
  doc.line(30, yOffset, pageWidth - 30, yOffset);
  yOffset += 12;
  
  doc.text(`NOTE: `, 30, yOffset);
  yOffset += 15;
  doc.setFont("helvetica", "normal");

  const wrappedNote1 = doc.splitTextToSize(`1. The invoice shall be deemed to be accepted, in case no query is raised within 7 days of reciept.`, pageWidth - 60);
  doc.text(wrappedNote1, 30, yOffset);
  // yOffset += wrappedNote1.length * 10 + 15;
  yOffset += 12;

  const wrappedNote2 = doc.splitTextToSize(`2. The invoice is due for payment within 15 days from the end date of campaign, unless specified separately, else interest @ 2% per month will be charged from the client.`, pageWidth - 60);
  doc.text(wrappedNote2, 30, yOffset);
  yOffset += wrappedNote2.length * 8 + 12;

  const wrappedNote3 = doc.splitTextToSize(`3. All Cheques/Drafts to be made in favour of "PROOH TECHNOLOGY PRIVATE LIMITED.`, pageWidth - 60);
  doc.text(wrappedNote3, 30, yOffset);
  yOffset += 12;

  const wrappedNote4 = doc.splitTextToSize(`4. GSTN/Billing address: 322, 323, 324 & 325, 3rd Floor, Paras Trade Center, Gurgaon, Faridabad Road, Gwal Pahari, Gurgaon, Haryana, 122002.`, pageWidth - 60);
  doc.text(wrappedNote4, 30, yOffset);
  yOffset += wrappedNote4.length * 8 + 12;
  // yOffset += 15;

  const wrappedNote5 = doc.splitTextToSize(`5. Bank details for remittance:- A/C Holder Name:- PROOH TECHNOLOGY PRIVATE LIMITED, A/C No.:- 921020001354511, IFSC Code:- UTIB0004373, Bank Name:- Axis Bank, Branch:- Gwal Pahari, Gurgaon, Haryana-122003.`, pageWidth - 60);
  doc.text(wrappedNote5, 30, yOffset);
  yOffset += wrappedNote5.length * 8 + 12;
  // yOffset += 15;

  const wrappedNote6 = doc.splitTextToSize(`6. Registered address: 322, 323, 324 & 325, 3rd Floor, Paras Trade Center, Gurgaon, Faridabad Road, Gwal Pahari, Gurgaon, Haryana, 122002.`, pageWidth - 60);
  doc.text(wrappedNote6, 30, yOffset);
  yOffset += wrappedNote6.length * 8 + 12;
  // yOffset += 15;

  const wrappedNote7 = doc.splitTextToSize(`7. All disputes are subject to Gurgaon Jurisdiction.`, pageWidth - 60);
  doc.text(wrappedNote7, 30, yOffset);
  yOffset += 12;

  const wrappedNote8 = doc.splitTextToSize(`8. Whether the tax is payable on reverse charge basis - NO.`, pageWidth - 60);
  doc.text(wrappedNote8, 30, yOffset);
  yOffset += 15;

  doc.setFont("helvetica", "bold");
  doc.text(`Please return this copy on Invoice Duty Signed & Stamped as Token of Acceptance.`, pageWidth/2, yOffset, { align: "center"})
  yOffset += 12;
  doc.line(30, yOffset, pageWidth - 30, yOffset);
  yOffset += 12;
  doc.text(`Accepted`, 30, yOffset);
  doc.line(pageWidth/2 - 20, yOffset - 10, pageWidth/2 - 20, yOffset + 70);
  doc.text(`For: PROOH TECHNOLOGY PRIVATE LIMITED`, 320, yOffset);
  yOffset += 70;
  doc.line(30, yOffset, pageWidth - 30, yOffset);
  yOffset += 12;
  doc.text(`Stamp`, 30, yOffset);
  doc.line(pageWidth/2 - 20, yOffset - 12, pageWidth/2 - 20, yOffset + 12);
  doc.text(`Authorised Signatory`, 320, yOffset);
  yOffset += 12;
  doc.line(30, yOffset, pageWidth - 30, yOffset);
  yOffset += 15;

  doc.text(`PROOH TECHNOLOGY PRIVATE LIMITED`, 30, yOffset);
  doc.setFont("helvetica", "normal");
  yOffset += 12;
  doc.text(`3rd Floor, Unit No. 322, 323, 324 & 325`, 30, yOffset);
  yOffset += 12;
  doc.text(`Paras Trade Center, Gwal Pahari, Sector 2, Gurugram`, 30, yOffset);
  doc.text(`GSTIN:- 06AAMCP9602J1Z2, Haryana Code:- 06`, 340, yOffset);
  
  doc.text(`Generated by PROOH.AI`, 450, pageHeight-8);

  // Save the PDF
  if (preview) {
    const pdfBlob = doc.output('blob');
    const url = URL.createObjectURL(pdfBlob);
    window.open(url, '_blank');
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  if (download) {
    doc.save(`${fileName}.pdf`);
  } else {
    const pdfBlob = doc.output('blob');
    return pdfBlob;
  }
}

// webpage to pdf
export const generatePdfFromWebPage = async ({pageRefs, fileName, heading}) => {
  const pdf = new jsPDF('landscape', 'mm', 'a4');

  console.log(pageRefs)
  // Add a heading to the PDF
  pdf.setFontSize(18);
  pdf.text(heading, 10, 10);

  // Function to capture and add each section to the PDF
  const captureSection = async (sectionRef, yOffset) => {
    if (sectionRef.current) {
      const canvas = await html2canvas(sectionRef.current, {
        scale: 2, // higher scale for better quality
      });
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, yOffset, imgWidth, imgHeight);
      return imgHeight; // return the height of the image to calculate next section position
    }
    return 0;
  };

  // Track yOffset for each section
  let yOffset = 20; // starting position, below the heading
  for (let i = 0; i < pageRefs.length; i++) {
    if (i > 0) {
      pdf.addPage(); // Add a new page for each section
      yOffset = 0; // reset yOffset for the new page
    }
    yOffset += await captureSection(pageRefs[i], yOffset);
  }

  // Save the generated PDF
  pdf.save(`${fileName}.pdf`);
};