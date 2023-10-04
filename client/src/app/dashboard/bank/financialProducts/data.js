export const banckAccount = [
  {
    id: "8caccf83-a626-46e5-b170-960235d84aff",
    company: {
      id: "729d924d-49c3-4eae-8410-2421bfa8cfe6",
      name: "Empresa test 4",
      profilePicture:
        "https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png",
    },
    isActive: true,
  },
];

export const backAccountById = {
  id: "8caccf83-a626-46e5-b170-960235d84aff",
  status: "open",
  statusMessage: null,
  company: {
    id: "729d924d-49c3-4eae-8410-2421bfa8cfe6",
    name: "Empresa test 4",
    profilePicture:
      "https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png",
    businessName: "EMPRESA 4 SRL",
    fiscalAdress: "Direccion legal 2847 (CP 1425), Buenos Aires",
    cuit: "1234567890",
    companyEmail: "hola@empresacuatro.com",
    legalManager: {
      email: "tim@empresatest4.com",
      lastName: "Cook",
      position: "CEO",
      firstName: "Tim",
      phoneNumber: "+5491112345678",
    },
    Documents: [
      {
        name: "Compre Neuquino",
        attachment: {
          fileKey: "0addc1f8-464b-498f-850e-7e50f2de94cb-3hu8ej.pdf",
          fileUrl:
            "https://utfs.io/f/0addc1f8-464b-498f-850e-7e50f2de94cb-3hu8ej.pdf",
          fileName: "jwt-handbook-v0_14_1.pdf",
          fileSize: 1728914,
        },
      },
      {
        name: "DD.JJ. IVA",
        attachment: {
          fileKey: "3f031e59-78a7-4327-be48-5415bfff932b-meh4jf.pdf",
          fileUrl:
            "https://utfs.io/f/3f031e59-78a7-4327-be48-5415bfff932b-meh4jf.pdf",
          fileName: "Scaling Your Business with Automation.pdf",
          fileSize: 2000769,
        },
      },
    ],
  },
  financeProducts: [
    {
      id: "c4f1a788-408b-4974-bc6c-9ba590e811dc",
      productName: "Home Banking",
      status: "sent",
      additionalData: null,
    },
    {
      id: "288c8514-9716-49a5-b3ef-a013fe78c734",
      productName: "CC en pesos $",
      status: "sent",
      additionalData: null,
    },
    {
      id: "29f3b944-5451-4a99-8bfe-58bc61c785fb",
      productName: "Tarjeta de crédito",
      status: "sent",
      additionalData: null,
    },
    {
      id: "931f31fa-87e7-419d-9a92-16df3c6629a1",
      productName: "Tarjeta de crédito",
      status: "sent",
      additionalData: null,
    },
  ],
  isActive: true,
  createdAt: "2023-09-27T23:04:17.789Z",
  updatedAt: "2023-09-28T01:01:37.359Z",
};

export const documentsAccount = [
  {
    id: "e92b587c-ee4c-4182-8713-9c04bbccedef",
    name: "Compre Neuquino",
    attachment: {
      fileKey: "0addc1f8-464b-498f-850e-7e50f2de94cb-3hu8ej.pdf",
      fileUrl:
        "https://utfs.io/f/0addc1f8-464b-498f-850e-7e50f2de94cb-3hu8ej.pdf",
      fileName: "jwt-handbook-v0_14_1.pdf",
      fileSize: 1728914,
    },
    company: {
      id: "729d924d-49c3-4eae-8410-2421bfa8cfe6",
      name: "Empresa test 4",
      profilePicture:
        "https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png",
    },
    isActive: true,
  },
  {
    id: "83f8fc8d-e4e8-4b5a-9516-4c422864056f",
    name: "DD.JJ. IVA",
    attachment: {
      fileKey: "3f031e59-78a7-4327-be48-5415bfff932b-meh4jf.pdf",
      fileUrl:
        "https://utfs.io/f/3f031e59-78a7-4327-be48-5415bfff932b-meh4jf.pdf",
      fileName: "Scaling Your Business with Automation.pdf",
      fileSize: 2000769,
    },
    company: {
      id: "729d924d-49c3-4eae-8410-2421bfa8cfe6",
      name: "Empresa test 4",
      profilePicture:
        "https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png",
    },
    isActive: true,
  },
];

export const financeProducts = [
  {
    id: "c4f1a788-408b-4974-bc6c-9ba590e811dc",
    productName: "Home Banking",
    status: "sent",
    additionalData: null,
    bankAccount: {
      id: "8caccf83-a626-46e5-b170-960235d84aff",
      status: "open",
      Company: {
        id: "729d924d-49c3-4eae-8410-2421bfa8cfe6",
        name: "Empresa test 4",
        profilePicture:
          "https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png",
      },
    },
    isActive: true,
  },
  {
    id: "288c8514-9716-49a5-b3ef-a013fe78c734",
    productName: "CC en pesos $",
    status: "sent",
    additionalData: null,
    bankAccount: {
      id: "8caccf83-a626-46e5-b170-960235d84aff",
      status: "open",
      Company: {
        id: "729d924d-49c3-4eae-8410-2421bfa8cfe6",
        name: "Empresa test 4",
        profilePicture:
          "https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png",
      },
    },
    isActive: true,
  },
  {
    id: "29f3b944-5451-4a99-8bfe-58bc61c785fb",
    productName: "Tarjeta de crédito",
    status: "sent",
    additionalData: null,
    bankAccount: {
      id: "8caccf83-a626-46e5-b170-960235d84aff",
      status: "open",
      Company: {
        id: "729d924d-49c3-4eae-8410-2421bfa8cfe6",
        name: "Empresa test 4",
        profilePicture:
          "https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png",
      },
    },
    isActive: true,
  },
  {
    id: "931f31fa-87e7-419d-9a92-16df3c6629a1",
    productName: "Tarjeta de crédito",
    status: "sent",
    additionalData: null,
    bankAccount: {
      id: "8caccf83-a626-46e5-b170-960235d84aff",
      status: "open",
      Company: {
        id: "729d924d-49c3-4eae-8410-2421bfa8cfe6",
        name: "Empresa test 4",
        profilePicture:
          "https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png",
      },
    },
    isActive: true,
  },
];
