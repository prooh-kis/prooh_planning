import React from "react";
import PptxGenJS from "pptxgenjs";

export const PowerPointGenerator = () => {
  const generatePPT = () => {
    const ppt = new PptxGenJS();

    // Add a slide
    const slide = ppt.addSlide();

    // Add background image (you can upload your own)

    slide.addImage({
      path: "https://images.pexels.com/photos/1031700/pexels-photo-1031700.jpeg?cs=srgb&dl=pexels-freestockpro-1031700.jpg&fm=jpg",
      x: 0,
      y: 0,
      w: "100%",
      h: "100%",
    });

    // Add text elements
    slide.addText("Location: 1 of 2\nT-Point", {
      x: 0,
      y: 4.6,
      w: "100%",
      h: 1,
      fontSize: 12,
      color: "black",
      fill: { color: "FFFF00" },
      // bold: true,
      align: "left",
    });

    slide.addText("Lat-Long:\n28.5624, 77.3454", {
      x: 2.5,
      y: 4.6,
      w: "100%",
      h: 1,
      fontSize: 12,
      color: "black",
      // bold: true,
      align: "left",
      fill: {
        color: "FFFF00",
      },
    });

    slide.addText("Size in Ft: 21' x 12.5'\nSize in Pixel: 1344 x 768 pixels", {
      x: 5.5,
      y: 4.6,
      w: "100%",
      h: 1,
      fontSize: 12,
      color: "black",
      // bold: true,
      align: "left",
      fill: { color: "FFFF00" },
    });

    // Save the presentation
    ppt.writeFile({ fileName: "Sample_Presentation.pptx" });
  };

  return (
    <div className="py-20">
      <button onClick={generatePPT}>Generate PPT</button>
    </div>
  );
};
