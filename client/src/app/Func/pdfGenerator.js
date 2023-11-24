import React from "react";
import jsPDF from "jspdf";
import { Tooltip, IconButton } from "@material-tailwind/react";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/outline";

const GeneratePDF = ({ bankAccount, productName, additionalData }) => {
  const spanishTranslations = {
    cuit: "CUIT",
    destination: "Destino",
    businessName: "Nombre de la Empresa",
    companyEmail: "Correo Electrónico de la Empresa",
    fiscalAdress: "Dirección Fiscal",
    email: "Correo",
    lastName: "Apellido",
    position: "Cargo",
    firstName: "Nombre",
    phoneNumber: "Número de Teléfono",
    amountToRequest: "Monto a Solicitar",
    legalManager: "Responsale legal",
    dni: "DNI",
    modo: "Cruzado",
    docType: "Tipo de Documento",
    caracter: "A la Orden",
    cheqType: "Tipo de Cheque",
    paymentDate: "Fecha de Pago",
    totalAmount: "Importe Total",
    beneficiaryDni: "DNI del Beneficiario",
    beneficiaryName: "Nombre del Beneficiario",
    beneficiaryDocType: "Tipo de Documento del Beneficiario",
    garantType: "Tipo de garantía",
    amount: "Monto",
    paymentTerm: "Término de Pago",
    invoiceIssuer: "Emisor de la Factura",
    invoiceTo: "Destinatario de la Factura",
    issueDate: "Fecha de Emisión",
    dueDate: "Fecha de Vencimiento",
    cuitIssuer: "CUIT del Emisor",
    cuitRecived: "CUIT del Receptor",
    // Agrega más traducciones según sea necesario
  };
  const generatePDF = () => {
    const doc = new jsPDF();
    let yOffset = 10;

    doc.text(`Nombre de la empresa: ${bankAccount.Company.name}`, 10, yOffset);
    yOffset += 10;
    doc.text(`Email: ${bankAccount.Company.companyEmail}`, 10, yOffset);
    yOffset += 20;

    doc.text(`Producto Solicitado: ${productName}`, 10, yOffset);
    yOffset += 10;

    for (const key in additionalData) {
      if (Object.hasOwnProperty.call(additionalData, key)) {
        if (typeof additionalData[key] === "object") {
          doc.text(`${spanishTranslations[key]}:`, 10, yOffset);
          yOffset += 10;

          const subObject = additionalData[key];
          for (const subKey in subObject) {
            if (Object.hasOwnProperty.call(subObject, subKey)) {
              doc.text(
                `   ${spanishTranslations[subKey]}: ${subObject[subKey]}`,
                10,
                yOffset
              );
              yOffset += 10;
            }
          }
        } else {
          doc.text(
            `${spanishTranslations[key]}: ${additionalData[key]}`,
            10,
            yOffset
          );
          yOffset += 10;
        }
      }
    }

    doc.save(`${productName}.pdf`);
  };

  return (
    <Tooltip content="Ver Adjuntos">
      <IconButton variant="text" onClick={generatePDF}>
        <DocumentMagnifyingGlassIcon className="h-4 w-4 text-blue-700" />
      </IconButton>
    </Tooltip>
  );
};

export default GeneratePDF;
