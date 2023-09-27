'use client'
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";




export function BankCard({data}) {
  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
             {data.title}
        </Typography>
        <Typography className="text-3xl font-bold">
             {data.quantity}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button className="bg-primary-700 text-white">Ver todos</Button>
      </CardFooter>
    </Card>
  );
}
