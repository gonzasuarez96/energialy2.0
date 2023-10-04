"use client";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  List,
} from "@material-tailwind/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetBankAccountByIdQuery } from "../redux/services/bankAccountApi";


export function AttachmentsModal({ open, handleOpen, data }) {
    
  const { data: bankAccount, isLoading } = useGetBankAccountByIdQuery(data);
  
  console.log(bankAccount);
 
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Dialog
          size="md"
          open={open}
          handler={handleOpen}
          className="bg-white shadow-none p-5"
        >
          <div className="bg-white">
            {!bankAccount.company.Documents ? (
              <p>No tiene documentos</p>
            ) : (
              bankAccount.company.Documents.map((e) => (
                <div className="flex gap-8">
                  <p className="font-bold w-[250px] uppercase">{e.name}</p>
                  <Link href={e.attachment.fileUrl} target="_blank">
                    <Button variant="outlined" size="sm">
                      Ver
                    </Button>
                  </Link>
                </div>
              ))
            )}
          </div>
          <Button
            variant="text"
            size="sm"
            onClick={handleOpen}
            className="bg-primary-500 text-white font-semibold mt-2"
          >
            Cerrar
          </Button>
        </Dialog>
      )}
    </>
  );
}
