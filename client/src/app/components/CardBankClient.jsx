'use client'
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";




export function BankCardClient({ data, handleSelectedOption }) {
  const handleOption = () => {
    handleSelectedOption( data.status )
  }
  
  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="flex justify-center mb-2">
             {data.title}
        </Typography>
        <Typography className="flex justify-center text-3xl font-bold">
             {data.quantity}
        </Typography>
      </CardBody>

    </Card>
  );
}
