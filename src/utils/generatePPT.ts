import PptxGenJS from "pptxgenjs";

interface SlideData {
    title: string;
    content: any;
    imageUrl: string[];
}

interface Data {
    data: SlideData[];
    fileName: string;
    download: boolean;
}

export const generatePPT = async ({ data, fileName, download }: Data): Promise<Blob | undefined> => {
    try {
        console.log("Generating PPT with data:", data);

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

            slide.addText(`Location: 1 of 2\n${item?.content?.address}`, {
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
                x: 2.5,
                y: 4.6,
                w: "100%",
                h: 1,
                fontSize: 12,
                color: "black",
                align: "left",
                fill: { color: "FFFF00" },
            });

            slide.addText("Size in Ft: 21' x 12.5'\nSize in Pixel: 1344 x 768 pixels", {
                x: 5.5,
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
            // Use `ppt.stream()` to get raw data
            const result = await ppt.stream();

            if (result instanceof Uint8Array || Array.isArray(result)) {
                // Convert raw data to Blob
                const blob = new Blob([result], { type: "application/vnd.openxmlformats-officedocument.presentationml.presentation" });
                console.log("Generated Blob:", blob);
                return blob;
            } else {
                console.error("Unexpected result type:", typeof result);
                throw new Error("Failed to generate a valid Blob from the presentation.");
            }
        }
    } catch (error) {
        console.error("Error generating PPT:", error);
        throw new Error("Failed to generate PPT");
    }
};
