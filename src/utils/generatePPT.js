import PptxGenJS from "pptxgenjs";


export const generatePPT = async ({ data, fileName, download }) => {
    try {
        console.log("Generating PPT...");
        const ppt = new PptxGenJS();

        // Create slides with data
        data.forEach((item) => {
            const slide = ppt.addSlide();

            // console.log(item.imageUrl?.[0]?.replace(/\+/g, ' '));
            const imageUrl = item.imageUrl?.[0]?.replace(/\+/g, ' ') || "https://via.placeholder.com/1280x720";
            slide.addImage({
                path: imageUrl,
                x: 0,
                y: 0,
                w: "100%",
                h: "100%",
                crossOrigin: "anonymous"
            });

            slide.addText(`Location:\n${item?.content?.address}`, {
                x: 0,
                y: 4.6,
                w: "100%",
                h: 1,
                fontSize: 12,
                color: "black",
                fill: { color: "FFFF00" },
                align: "left",
            });

            slide.addText(`Lat-Long:\n${item?.content?.geographicalLocation?.latitude}, ${item?.content?.geographicalLocation?.longitude}`, {
                x: 5.5,
                y: 4.6,
                w: "100%",
                h: 1,
                fontSize: 12,
                color: "black",
                align: "left",
                fill: { color: "FFFF00" },
            });

            slide.addText(`Size:\n ${item?.resolution}`, {
                x: 7.5,
                y: 4.6,
                w: "100%",
                h: 1,
                fontSize: 12,
                color: "black",
                align: "left",
                fill: { color: "FFFF00" },
            });
        });

        if (download) {
            // Download the PPT directly
            await ppt.writeFile({ fileName: `${fileName}.pptx` });
            console.log("PPT downloaded successfully.");
            return null; // Return null when download happens
        } else {
            // Return the PPT as a Blob
            const pptxBlob = await ppt.write("blob");
            console.log("PPT Blob generated successfully.");
            const pptxFile = new File([pptxBlob], 'presentation.pptx', { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
            return pptxFile; // Return the Blob
        }
    } catch (error) {
        console.error("Error generating PPT:", error);
        throw new Error("Failed to generate PPT");
    }
};
