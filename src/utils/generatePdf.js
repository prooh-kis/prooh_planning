import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePdfFromJSON = ({ jsonData, fileName}) => {
  const doc = new jsPDF();

  // Add title
  doc.setFontSize(18);
  doc.text('User Information', 20, 20);

  // Add table headers
  doc.setFontSize(12);
  doc.text('Name', 20, 30);
  doc.text('Age', 70, 30);
  doc.text('City', 120, 30);

  // Add data rows
  jsonData.forEach((user, index) => {
    const yOffset = 40 + (index * 10);
    doc.text(user.name, 20, yOffset);
    doc.text(String(user.age), 70, yOffset);
    doc.text(user.city, 120, yOffset);
  });

  // Save the PDF
  doc.save(`${fileName}.pdf`);
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