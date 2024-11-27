import PptxGenJS from "pptxgenjs";

interface SlideData {
    title: string;
    content: any;
    imageUrl: string[];
}
interface Data {
    data: SlideData[];
    fileName: string;
}
export const generatePPT = ({ data, fileName }: Data) => {
    console.log("data", data);

    const ppt = new PptxGenJS();
    data.forEach((item) => {
        const slide = ppt.addSlide();
        slide.addImage({
            path: "https://images.pexels.com/photos/1031700/pexels-photo-1031700.jpeg?cs=srgb&dl=pexels-freestockpro-1031700.jpg&fm=jpg",
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
            // bold: true,
            align: "left",
        });

        slide.addText(`Lat-Long:\n${item?.content?.geographicalLocation?.latitude}, ${item?.content?.geographicalLocation?.longitude}`, {
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

    });

    ppt.writeFile({ fileName: `${fileName}.pptx` });
};