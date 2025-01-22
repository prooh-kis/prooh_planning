import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import PptxGenJS from "pptxgenjs";

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
  const FOOTER_MARGIN = 20; // Margin for the footer
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
          doc.text(key.toUpperCase(), 15, yOffset - 10); // Redraw the section title
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
  const FOOTER_MARGIN = 20; // Space reserved for the footer
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
      theme: 'grid',
      didDrawCell: (data) => {
        if (data.row.index === 0 && data.cursor.y + 10 > PAGE_HEIGHT - FOOTER_MARGIN) {
          // If the first cell of the row is exceeding the page, add a new page
          doc.addPage();
          yOffset = HEADER_MARGIN + 10; // Reset yOffset for the new page
          doc.text(key.toUpperCase(), 15, yOffset - 10); // Redraw the section title
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
  const FOOTER_MARGIN = 20; // Space reserved for the footer
  const HEADER_MARGIN = 30; // Space reserved for the header
  const PAGE_HEIGHT = doc.internal.pageSize.height;

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
    ["Total Campaign Budget", `INR ${campaignApproach.totalCampaignBudget.toFixed(0)}`],
    ["Total CPM", `INR ${campaignApproach.totalCpm.toFixed(2)}`],
    ["Total Reach", campaignApproach.totalReach.toFixed(0)],
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
        doc.text(key.toUpperCase(), 15, yOffset - 10); // Redraw the section title
        data.cursor.y = HEADER_MARGIN + 10; // Reset the cursor position for the new page
      }
    },
  });

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
    yOffset += 10;
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
    yOffset += 10;
    checkPageBreak();
  });

  yOffset += 5;
  checkPageBreak();

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
        screen.slotsInfo.reduce((acc, { day, slot }) => ((acc[day] ??= []).push(slot), acc), {})
      ),
      startY: yOffset,
      margin: { top: 30 },
      didDrawCell: (data) => {
        if (data.row.index === 0 && data.cursor.y + 10 > PAGE_HEIGHT - FOOTER_MARGIN) {
          // If the first cell of the row is exceeding the page, add a new page
          doc.addPage();
          yOffset = HEADER_MARGIN + 10; // Reset yOffset for the new page
          doc.text(key.toUpperCase(), 15, yOffset - 10); // Redraw the section title
          data.cursor.y = HEADER_MARGIN + 10; // Reset the cursor position for the new page
        }
      },
    });

    yOffset = doc.lastAutoTable.finalY + 20;
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