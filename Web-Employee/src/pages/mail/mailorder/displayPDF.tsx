// import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";
// import img from '../../../assets/logo.png';

// type MailDetails = {
//   price: number | null;
//   mailType: string;
//   recepientName: string;
//   address: string;
//   weight: number;
// };

// const displayInvoice = (name: string, telephone: string, mailArray: MailDetails[], total: string) => {
//   console.log("generating pdf");
//   const date = new Date().toDateString()
//   const props = {
//     outputType: OutputType.Blob, 
//     returnJsPDFDocObject: true,  
//     fileName: "Invoice 2024",    
//     orientationLandscape: false, 
//     compress: true,              
//     logo: {
//       src: "",
//       type: "PNG",
//       width: 53.33,
//       height: 26.66,
//     },
//     stamp: {
//       inAllPages: true,
//       src: img,
//       type: "PNG",
//       width: 20,
//       height: 20,
//     },
//     business: {
//       name: "Post Office",
   
//     },
//     contact: {
//       label: "Customer Name:",
//       name: name,
//       address: "Albania, Tirane, Astir",
//       phone: telephone,
//     },
//     invoice: {
      
//       invDate: date,
//       header: [
//         { title: "#", style: { width: 10 } },
//         { title: "Mail Type", style: { width: 30 } },
//         { title: "Recepient's Address", style: { width: 100 } },
//         { title: "Weight", style: { width: 20 } },
//         { title: "Price", style: { width: 20 } }
//       ],
      
//       table: mailArray.map((m, i) => [
//         i + 1,
//         m.mailType,
//         m.address,
//         m.weight,
//         m.price
//       ]),
//       additionalRows: [{
//         col1: 'Total:',
//         col2: total,
//         style: {
//             fontSize: 12 //optional, default 12
//         }
//     }],
//       invDescLabel: "Invoice Note",
//       invDesc: "Thank you for your business!",
//     },
//     footer: {
//       text: "This invoice is generated electronically and does not require a signature.",
//     },
//     pageEnable: true,
//     pageLabel: "Page ",
//   };

//   const result = jsPDFInvoiceTemplate(props);
  
//   if (result) {
//     const pdfDoc = result; // jsPDF object
    
//     // Generate Blob from jsPDF
//     // const pdfBlob = pdfDoc.output("blob");

//     // Create a Blob URL
//     const pdfUrl = URL.createObjectURL(pdfBlob);

//     // Set the Blob URL as the source of the iframe
//     const iframe = document.getElementById("pdf-frame") as HTMLIFrameElement;
//     if (iframe) {
//       iframe.src = pdfUrl;
//     }
//   }
// };



// export { displayInvoice };
