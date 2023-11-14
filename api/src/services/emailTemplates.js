const generateEmployerEmailProposalReceived = (employerName, supplierCompanyName, tenderTitle, proposalAmount, proposalDuration) => {
  const html = `
  <body>
    <p>Hola ${employerName}!</p>
    <p><b>${supplierCompanyName}</b> te ha enviado una nueva propuesta en este proyecto: <b>${tenderTitle}</b>.</p>
    <p><b>Monto de la Propuesta:</b> U$S ${proposalAmount}.</p>
    <p><b>Duración:</b> ${proposalDuration}.</p>
    <p>Ingresa a tu cuenta para ver más detalles haciendo clic <a href="https://energialy.vercel.app/">acá</a>.</p>
    <p><i>Si tienes alguna duda puedes escribirnos a: hola@energialy.ar</i></p>
    <p><b>Saludos de nuestro Equipo.</b></p>
  </body>
  `;
  return html;
};

const generateSupplierEmailProposalAccepted = (supplierName, employerCompanyName, tenderTitle) => {
  const html = `
  <body>
    <p>Hola ${supplierName}!</p>
    <p><b>${employerCompanyName}</b> ha aceptado tu propuesta en la siguiente licitación: <b>${tenderTitle}</b>.</p>
    <p>Desde tu Dashboard podrás continuar las comunicaciones con la empresa.</p>
    <p>Al Completar el proyecto, la empresa contratista valorará tu desempeño y aparecerá en tu perfil público.</p>
    <p>IMPORTANTE: Si necesitas contratar/tercerizar algun servicio para el presente proyecto, puedes también publicar GRATIS tu propio proyecto. Desde tu Dashboard selecciona <b>PUBLICAR LICITACIÓN</b></p>
    <p>Recuerda también que deberás abonar un fee a Energialy: 2% del total del proyecto en el cual tu empresa fué contratada. Tendrás 15 dias hábiles, desde la recepción de este correo, para realizar el pago.</p>
    <p>Para informar dicho pago o para realizar cualquier consulta que tengas, por favor comunicate con el equipo de Energialy: hola@energialy.ar</p>
    <p>Nuevamente felicitaciones por haber sido seleccionada tu propuesta!</p>
    <p><b>Saludos de nuestro Equipo.</b></p>
  </body>
  `;
  return html;
};

const generateSupplierEmailProposalDeclined = (supplierName, employerCompanyName, tenderTitle) => {
  const html = `
  <body>
    <p>Hola ${supplierName}.</p>
    <p>Lamentablemente, tu propuesta a la licitación "${tenderTitle}" de ${employerCompanyName} fue rechazada.</p>
    <p>Cualquier inquietud que tengas al respecto, puedes comunicarte con el Equipo de Energialy: hola@energialy.ar</p>
    <p><b>Saludos de nuestro Equipo.</b></p>
  </body>
  `;
  return html;
};

const generateBankEmailNewBankAccount = (companyName) => {
  const html = `
  <body>
    <p>Hola</p>
    <p>${companyName} ha enviado una Nueva Solicitud de Apertura de Cuenta en Banco de Comercio.</p>
    <p>Podés ingresar a tu cuenta de Energialy para ver más detalles.</p>
    <p><b>Saludos de nuestro Equipo.</b></p>
  </body>
  `;
  return html;
};

const generateBankEmailNewFinanceProduct = (companyName) => {
  const html = `
  <body>
    <p>Hola</p>
    <p>${companyName} ha solicitado un Producto Financiero de Banco de Comercio.</p>
    <p>Podés ingresar a tu cuenta de Energialy para ver más detalles.</p>
    <p><b>Saludos de nuestro Equipo.</b></p>
  </body>
  `;
  return html;
};

const generateCompanyEmailBankAccountOpen = (companyOwnerName, companyName) => {
  const html = `
  <body>
    <p>Hola ${companyOwnerName}, felicitaciones!</p>
    <p><b>Tu Solicitud de Apertura de Cuenta fue confirmada.</b></p>
    <p>Ya podés ingresar a tu cuenta en Energialy ${companyName} para ver más detalles y  solicitar los productos financieros que necesites para tu pyme. </p>
    <p>Si tenés alguna duda podés escribirnos a: hola@energialy.ar</p>
    <p><b>Saludos de nuestro Equipo.</b></p>
  </body>
  `;
  return html;
};

const generateCompanyEmailBankAccountRequireChanges = (companyOwnerName, companyName) => {
  const html = `
  <body>
    <p>Hola ${companyOwnerName}</p>
    <p>Recibiste una notificación en tu Solicitud de Apertura de Cuenta.</p>
    <p>Podés ingresar a tu cuenta en Energialy ${companyName} para ver más detalles. </p>
    <p>Si tenés alguna duda podés escribirnos a: hola@energialy.ar</p>
    <p><b>Saludos de nuestro Equipo.</b></p>
  </body>
  `;
  return html;
};

const generateCompanyEmailFinanceProductAccepted = (companyOwnerName, companyName) => {
  const html = `
  <body>
    <p>Hola ${companyOwnerName}, felicitaciones!</p>
    <p><b>El producto financiero que solicitaste fue aprobado. </b></p>
    <p>Podés ingresar a tu cuenta en Energialy ${companyName} para ver más detalles. </p>
    <p>Si tenés alguna duda podés escribirnos a: hola@energialy.ar</p>
    <p><b>Saludos de nuestro Equipo.</b></p>
  </body>
  `;
  return html;
};

const generateCompanyEmailFinanceProductDeclined = (companyOwnerName, companyName) => {
  const html = `
  <body>
    <p>Hola ${companyOwnerName}</p>
    <p>El producto financiero que solicitaste no fue aprobado. </p>
    <p>Podés ingresar a tu cuenta en Energialy ${companyName} para ver más detalles. </p>
    <p>Si tenés alguna duda podés escribirnos a: hola@energialy.ar</p>
    <p><b>Saludos de nuestro Equipo.</b></p>
  </body>
  `;
  return html;
};

module.exports = {
  generateEmployerEmailProposalReceived,
  generateSupplierEmailProposalAccepted,
  generateSupplierEmailProposalDeclined,
  generateBankEmailNewBankAccount,
  generateBankEmailNewFinanceProduct,
  generateCompanyEmailBankAccountOpen,
  generateCompanyEmailBankAccountRequireChanges,
  generateCompanyEmailFinanceProductAccepted,
  generateCompanyEmailFinanceProductDeclined,
};
