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

export const generatePlanApproachPdfFromJSON = ({ download, jsonData, fileName, heading}) => {
  const doc = new jsPDF();
  // console.log(jsonDaqta)

  const campaignData = jsonData[0];
  let yOffset = 20;

  const addPageWithHeading = (doc, mainHeading, subHeading) => {
    doc.addPage();
    yOffset = 20;
    doc.setFontSize(16);
    doc.text(mainHeading, 10, 10);
    doc.setFontSize(12);
    yOffset += 10;
    doc.text(subHeading, 10, 20);
    yOffset += 10;
  }

  // Page 1
  doc.setFontSize(16);
  doc.text(heading, 10, 10);
  doc.setFontSize(14);
  yOffset += 10;
  doc.text("Campaign Overview", 10, 20);
  yOffset += 10;

  const campaignDetails = [
    ["Name", campaignData.name],
    ["Brand Name", campaignData.brandName],
    ["Client Name", campaignData.clientName],
    ["Campaign Type", campaignData.campaignType],
    ["Industry", campaignData.industry],
    ["Start Date", new Date(campaignData.startDate).toLocaleString()],
    ["End Date", new Date(campaignData.endDate).toLocaleString()],
    ["Duration (days)", campaignData.duration],
    ["Markets", campaignData.markets.join(", ")],
    ["Total Impressions", campaignData.totalImpression.toFixed(0)],
    ["Total Campaign Budget (In INR)", campaignData.totalCampaignBudget.toFixed(0)],
    ["Total CPM (In INR)", campaignData.totalCpm.toFixed(2)],
    ["Total Reach", campaignData.totalReach.toFixed(0)],
  ];

  doc.autoTable({
    head: [["Field", "Value"]],
    body: campaignDetails,
    startY: yOffset,
    margin: { top: 30 },
  });

  yOffset = doc.lastAutoTable.finalY + 20;
  // Page 2
  addPageWithHeading(doc, "Cohorts", "Target Audience Cohorts");
  campaignData.cohorts.forEach((cohort, idx) => {
    doc.text(`${idx + 1}. ${cohort}`, 10, yOffset);
    yOffset += 10; // Space between each cohort
    if (yOffset > 280) { // Check if content overflows the page height
      addPageWithHeading(doc, "Cohorts", "Target Audience Cohorts");
    }
  });

  // Page 3
  addPageWithHeading(doc, "Touch Points", "Target Locations and Environments");
  campaignData.touchPoints.forEach((point, idx) => {
    doc.text(`${idx + 1}. ${point}`, 10, yOffset);
      yOffset += 10; // Space between each touchpoint
      if (yOffset > 280) {
        addPageWithHeading(doc, "Touch Points", "Target Locations and Environments");
      }
  });

  // Page 4
  addPageWithHeading(doc, "Screens", "Screen wise slot time zone details");
  campaignData.screenWiseSlotDetails.forEach((screen, idx) => {
    doc.setFontSize(12);
      const yStart = yOffset + 10;
      doc.text(`${screen.screenName}`, 10, yOffset);
      yOffset += 10;
      doc.autoTable({
        head: [["Day", "Slot"]],
        body: Object.entries(screen.slotsInfo.reduce((acc, { day, slot }) => ((acc[day] ??= []).push(slot), acc), {})),
        startY: yOffset,
        margin: { top: 30 },
      });

      yOffset = doc.lastAutoTable.finalY + 20; // Move below the last table
      if (yOffset > 280) {
        addPageWithHeading(doc, "Screens", "Screen-wise slot time zone details");
      }
  });

  // Save the PDF
  if (download) {
    doc.save(`${fileName}.pdf`);
  } else {
    const pdfBlob = doc.output('blob');
    return pdfBlob;
  }
}

export const generatePlanSummaryPdfFromJSON = ({ download, jsonData, fileName, heading }) => {
  const doc = new jsPDF();
  let yOffset = 10;
  const lineHeight = 5; // Define consistent line height
  const spaceBetweenSections = 5; // Define space between sections

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

export const generateCreativeRatioPdfFromJSON = ({ download, jsonData, fileName, heading }) => {
  const doc = new jsPDF();
  let yOffset = 20; // Starting point for the content
  const lineHeight = 10; // Line height for spacing

  // Add the main heading at the top
  const addHeading = () => {
    doc.setFontSize(22);
    doc.text(heading, 10, yOffset);
    yOffset += lineHeight * 2; // Space after the heading
  };

  // Add the data for each city in a table
  const addCityData = (city, resolutions) => {
    doc.setFontSize(16);
    doc.text(`City: ${city}`, 10, yOffset);
    yOffset += lineHeight;

    // Prepare table rows from resolution data
    const tableRows = Object.entries(resolutions).map(([resolution, count]) => [resolution, count]);

    // Add table with resolutions and counts
    doc.autoTable({
      head: [["Resolution", "Count"]],
      body: tableRows,
      startY: yOffset,
      theme: 'grid'
    });

    // Update yOffset after the table is rendered
    yOffset = doc.autoTable.previous.finalY + lineHeight * 2; // Add extra space after the table
  };

  // Start generating the PDF
  addHeading();

  // Loop through each city in the data
  Object.keys(jsonData).forEach((city) => {
    addCityData(city, jsonData[city]);
  });

  // Save the PDF
  if (download) {
    doc.save(`${fileName}.pdf`);
  } else {
    const pdfBlob = doc.output('blob');
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