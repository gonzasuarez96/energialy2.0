'use client'
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { filterData } from "@/app/Func/controllers";



export function BankCard({data, title, status}) {

  const filteredData = filterData(data, status)
  
  return (
    <Card className="mt-6 w-96">
      <CardBody className="text-center">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography className="text-3xl font-bold">{filteredData.length}</Typography>
      </CardBody>
      {/* <CardFooter className="pt-0">
        <Button className="bg-primary-700 text-white">Ver todos</Button>
      </CardFooter> */}
    </Card>
  );
}
