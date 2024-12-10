import PptxGenJS from "pptxgenjs";


export const generatePPT = async ({ data, fileName, download }) => {
    try {
        const ppt = new PptxGenJS();

        // Create slides with data
        data.forEach((item) => {
            const slide = ppt.addSlide();

            const imageUrl = item.imageUrl?.[0] || "https://via.placeholder.com/1280x720";
            slide.addImage({
                path: imageUrl,
                x: 0,
                y: 0,
                w: "100%",
                h: "100%",
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
            await ppt.writeFile({ fileName: `${fileName}.pptx` });
        } else {
            try {
                const result = await ppt.write("blob");
                return result;
            } catch (err) {
                console.error("Error generating PPT Blob:", err);
                // throw new Error("Failed to generate PPT Blob.");
                return err;
            }
        }
    } catch (error) {
        console.error("Error generating PPT:", error);
        // throw new Error("Failed to generate PPT");
        return error;
    }
};
