import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";

type MailDetails = {
  price: number | null;
  mailType: string;
  recepientName: string;
  address: string;
  weight: string;
};

const generateInvoice = (name: string, telephone: string, mailArray: MailDetails[]) => {
  console.log("generating pdf");

  const props = {
    outputType: OutputType.Save, // To save the PDF
    returnJsPDFDocObject: true,  // Return jsPDF object if needed
    fileName: "Invoice 2024",    // Name of the PDF file
    orientationLandscape: false, // PDF orientation
    compress: true,              // Compress PDF
    logo: {
      src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
      type: "PNG",
      width: 53.33,
      height: 26.66,
    },
    stamp: {
      inAllPages: true,
      src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
      type: "JPG",
      width: 20,
      height: 20,
    },
    business: {
      name: "Post Office",
   
    },
    contact: {
      label: "Invoice issued for:",
      name: name,
      address: "Albania, Tirane, Astir",
      phone: telephone,
    },
    invoice: {
      label: "Invoice #: ",
      num: 19,
      invDate: "Payment Date: 01/01/2024 18:12",
      invGenDate: "Invoice Date: 02/02/2024 10:17",
      header: [
        { title: "#", style: { width: 10 } },
        { title: "Mail Type", style: { width: 30 } },
        { title: "Recepient's Address", style: { width: 100 } },
        { title: "Weight", style: { width: 20 } },
        { title: "Price", style: { width: 20 } }
      ],
      //--+++++++++++++++++++++++++Format the table with all fields from mailArray
      table: mailArray.map((m, i) => [
        i + 1,
        m.mailType,
        m.address,
        m.weight,
        typeof m.price === "number" ? `$${m.price.toFixed(2)}` : "N/A", // Format price or show "N/A"
      ]),
      invDescLabel: "Invoice Note",
      invDesc: "Thank you for your business!",
    },
    footer: {
      text: "This invoice is generated electronically and does not require a signature.",
    },
    pageEnable: true,
    pageLabel: "Page ",
  };

  const pdfObject = jsPDFInvoiceTemplate(props);
  console.log(pdfObject); // This will log the PDF object if needed
};

export { generateInvoice };
