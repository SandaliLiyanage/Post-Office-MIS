import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";

const generateInvoice = () => {
    console.log("generating pdf")
  const props = {
    outputType: OutputType.Save, // To save the PDF
    returnJsPDFDocObject: true, // Return jsPDF object if needed
    fileName: "Invoice 2024", // Name of the PDF file
    orientationLandscape: false, // PDF orientation
    compress: true, // Compress PDF
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
      name: "Business Name",
      address: "Albania, Tirane ish-Dogana, Durres 2001",
      phone: "(+355) 069 11 11 111",
      email: "email@example.com",
      website: "www.example.al",
    },
    contact: {
      label: "Invoice issued for:",
      name: "Client Name",
      address: "Albania, Tirane, Astir",
      phone: "(+355) 069 22 22 222",
      email: "client@website.al",
    },
    invoice: {
      label: "Invoice #: ",
      num: 19,
      invDate: "Payment Date: 01/01/2024 18:12",
      invGenDate: "Invoice Date: 02/02/2024 10:17",
      header: [
        { title: "#", style: { width: 10 } },
        { title: "Title", style: { width: 30 } },
        { title: "Description", style: { width: 80 } },
        { title: "Price" },
        { title: "Quantity" },
        { title: "Unit" },
        { title: "Total" },
      ],
      table: Array.from(Array(10), (item, index) => [
        index + 1,
        "Service or product title",
        "Description of the item",
        200.5,
        4.5,
        "pcs",
        902.25,
      ]),
      additionalRows: [
        {
          col1: "Total:",
          col2: "4,500.00",
          col3: "USD",
        },
        {
          col1: "VAT:",
          col2: "20",
          col3: "%",
        },
        {
          col1: "SubTotal:",
          col2: "3,750.00",
          col3: "USD",
        },
      ],
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
  console.log(pdfObject); 
};



export {generateInvoice}