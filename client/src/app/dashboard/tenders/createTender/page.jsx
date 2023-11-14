'use client'
import { useGetCategoriesQuery } from "@/app/redux/services/categoriesApi";
import { useGetLocationsQuery } from "@/app/redux/services/locationApi";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  CardHeader,
  Switch,
} from "@material-tailwind/react";
import EditorForm from "@/app/components/Editor";
import { FormGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import Select from "react-select"
import { useState } from "react";
import { duration, etapa, tendersTypes } from "@/app/data/dataGeneric";
import axios from "axios";
import {displayFailedMessage, displaySuccessMessage} from '@/app/components/Toastify'
import ErrorMensage from "@/app/components/ErrorMensage";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import getLocalStorage from "@/app/Func/localStorage";



function CreateTenderForm() {

  
  //fetch states
  
  const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();
  const { data: locations, isLoading: loadingLocations } = useGetLocationsQuery();
  
  const userData = getLocalStorage()

  const router = useRouter();
  //local states
  const [tenderData, setTenderData] = useState({
    title: "",
    description: "",
    contractType: "",
    budget: 0,
    showBudget: false,
    majorSector: "",
    projectDuration: "",
    validityDate:"",
    locationId:"",
    subcategories:[],
    //address:"",
    companyId: userData?.company.id,
  });

  const [inputError, setInputError] = useState({
    title: "",
    description: "",
    contractType: "",
    budget: "",
    majorSector: "",
    projectDuration: "",
    validityDate: "",
    locationId: "",
    subcategories: "",
    //address:""
  });
  const [categorieSelected, setCategorieSelected] = useState([]);
  const [subCatSelected, setSubCatSelected] = useState([]);
  const [isShow, setIsShow] = useState(false)
  const [isPrivateCheqed, setIsPrivateCheqed] = useState(false);
  const [isSponsoredCheqed, setIsSponsoredCheqed] = useState(false);
  
  //Handlers
  const handleChangeCategories = (e) => {
    //crear las subcategorias para el select
    const subcategories = categories?.find(
      (cat) => cat.id === e.value
    ).subcategories;
    setSubCatSelected(
      subcategories.map((subcat) => ({ name: subcat.name, value: subcat.id }))
    );
  };
  const handleSubcategorieChange =  (e) => {
    const arr = []
    arr.push(e.value)
    setTenderData({ ...tenderData, subcategories: arr });
  };

  const handleChangeLocation =  (e) => {
    setTenderData({ ...tenderData, locationId: e.value });
  };
  const handlePrivateChange = (e) => {
    if(isPrivateCheqed === false){
      setIsPrivateCheqed(true)
    }else{
      setIsPrivateCheqed(false)
    }
  }
  const handleSponsoredChange = (e) => {
    if (isSponsoredCheqed === false) {
      setIsSponsoredCheqed(true);
    } else {
      setIsSponsoredCheqed(false);
    }
  };

  const handleShowChange = (e) => {
    if(isShow === false){
      setIsShow(true);
       setTenderData({ ...tenderData, showBudget: true });
    }else{
      setIsShow(false)
       setTenderData({ ...tenderData, showBudget: false });
    }
   
  }
  
  const handleDescriptionChange = (data) => {
    setTenderData({ ...tenderData, description: data });
  }

  const handleInputsChanges = (e) => {
    setTenderData({ ...tenderData, [e.target.name]: e.target.value });
    console.log(tenderData);
  }

  const validation = (tenderData) => {
    console.log("entro acá") 
    console.log(tenderData)
    const errors = {};

    if(tenderData.title === ""){
      errors.title = "El titulo de la Licitación no puede estar vacío"
    }
    if (tenderData.description === "") {
      errors.description = "La Licitación debe tener una descripción"
    }
    if(tenderData.contractType === ""){
     errors.contractType= "El tipo de contrato es requerido"
    }
    if(tenderData.majorSector === ""){
      errors.majorSector= "El sector es requerido"
    }
    if(tenderData.projectDuration === ""){
      errors.projectDuration= "La duración del proyecto es requerida"
    }
    if(tenderData.validityDate === ""){
      errors.validityDate= "La fecha límite para enviar propuestas es requerida"
    }
    if(tenderData.locationId === ""){
      errors.locationId= "La ubicación del proyecto es requerida"
    }
    if(tenderData.subcategories.length === 0){
      errors.subcategories= "Las subcategorias del proyecto son requeridas"
    }
     if (tenderData.address === "") {
       errors.locationId = "La ubicación del proyecto es requerida";
     }
    if(tenderData.budget === 0){
      errors.budget= "El presupuesto del proyecto es requerido"
    }

    setInputError(errors);
    return Object.keys(errors).length === 0;
  
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    
   const hasErrors = !validation(tenderData);
   
   console.log(tenderData)
      
   if (!hasErrors) {
    console.log(tenderData)
     try {
      
      const tender = await axios.post(
         "http://localhost:3001/tenders",
         tenderData
       );
       displaySuccessMessage("Licitación creada con éxito");
       setTimeout(() => router.back(), 2000);
     } catch (error) {
      console.log(error)
       displayFailedMessage(error.response.data.error);
     }
     
   }
  };
  

  return (
    <>
      <FormGroup>
        <Card className="p-4">
          {/*Header Form*/}
          <div className="border-b-1">
            <Typography variant="h6" className="mb-4">
              Publicar Licitación
            </Typography>
            <Typography variant="small" className="mb-4">
              Publicar licitación publica o privada para que una empresa pueda
              postularse y luego contratarla.
            </Typography>
          </div>
          {/*First Step Data*/}
          <div className="flex flex-col gap-4">
            <div className="border-l-4 border-primary-600">
              <Typography variant="h6" className="ml-5 my-0">
                Descripción de la Licitación
              </Typography>
            </div>
            <div className="ml-5 md:flex md:flex-col md:gap-2">
              <input
                className="w-full border-1 border-gray-300 rounded-md p-3"
                type="text"
                placeholder="Título"
                name="title"
                onChange={handleInputsChanges}
              />
              {inputError.title !== "" ? (
                <ErrorMensage message={inputError.title} />
              ) : null}
              <div className="md:flex md:gap-3">
                <select
                  className="w-1/2 border-1 bg-transparent border-gray-300 rounded-md p-3 text-gray-500"
                  onChange={handleInputsChanges}
                  name="contractType"
                >
                  <option>TIPO DE CONTRATACIÓN</option>
                  {tendersTypes?.map((type) => (
                    <option>{type}</option>
                  ))}
                </select>
                {inputError.contractType !== "" ? (
                  <ErrorMensage message={inputError.contractType} />
                ) : null}
                <select
                  className="w-1/2 border-1 bg-transparent border-gray-300 rounded-md p-3 text-gray-500"
                  name="projectDuration"
                  onChange={handleInputsChanges}
                >
                  <option>DURACIÓN DE LA LICITACIÓN</option>
                  {duration.map((d) => (
                    <option>{d}</option>
                  ))}
                </select>
                {inputError.projectDuration !== "" ? (
                  <ErrorMensage message={inputError.projectDuration} />
                ) : null}
              </div>
              <div className="md:flex md:gap-3">
                <select
                  className="w-1/2 border-1 bg-transparent border-gray-300 rounded-md p-3 text-gray-500"
                  name="majorSector"
                  onChange={handleInputsChanges}
                >
                  <option>ETAPA</option>
                  {etapa.map((e) => (
                    <option>{e}</option>
                  ))}
                </select>
                {inputError.majorSector !== "" ? (
                  <ErrorMensage message={inputError.majorSector} />
                ) : null}
                <div className="w-1/2 border-1 bg-transparent border-gray-300 rounded-md p-3 text-gray-500 flex justify-between">
                  <label htmlFor="">Fecha límite para enviar Propuestas</label>
                  <input
                    className="focus:border-none"
                    type="date"
                    name="validityDate"
                    onChange={handleInputsChanges}
                  />
                  {inputError.validityDate !== "" ? (
                    <ErrorMensage message={inputError.validityDate} />
                  ) : null}
                </div>
              </div>
              <div className="md:flex md:gap-3">
                <input
                  className="w-1/2 border-1 bg-transparent border-gray-300 rounded-md p-3 text-gray-500"
                  type="number"
                  name="budget"
                  onChange={handleInputsChanges}
                  placeholder="Presupuesto en U$S"
                />
                {inputError.budget !== "" ? (
                  <ErrorMensage message={inputError.budget} />
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <div className="border-l-4 border-primary-600 flex justify-between">
                <Typography variant="h6" className="ml-5 my-0">
                  Presupuesto Privado
                </Typography>
                <div className="flex gap-4">
                  <label
                    class="inline-block pl-[0.15rem] hover:cursor-pointer"
                    for="flexSwitchCheckDefault"
                  >
                    {isShow ? "Mostrar Presupuesto" : "No Mostrar Presupuesto"}
                  </label>

                  <input
                    class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    onChange={handleShowChange}
                  />
                </div>
              </div>
            </div>
          </div>
          {/*Categories*/}
          <div className="flex flex-col gap-4 mt-4">
            <div className="border-l-4 border-primary-600">
              <Typography variant="h6" className="ml-5 my-0">
                Categorias
              </Typography>
            </div>
            <div className="ml-5 flex flex-col gap-2">
              {categoriesLoading && "Loading..."}
              <Select
                options={categories?.map((cat) => ({
                  value: cat.id,
                  label: cat.name,
                }))}
                placeholder="CATEGORIA"
                onChange={handleChangeCategories}
              />
            </div>
          </div>
          {/*Sub-Categories*/}
          <div className="flex flex-col gap-4 mt-4">
            <div className="border-l-4 border-primary-600">
              <Typography variant="h6" className="ml-5 my-0">
                Subcategorias
              </Typography>
            </div>
            <div className="ml-5 flex flex-col gap-2">
              {categoriesLoading && "Loading..."}
              <Select
                options={subCatSelected?.map((subCat) => ({
                  label: subCat.name,
                  value: subCat.value,
                }))}
                name="subcategories"
                placeholder="SUBCATEGORIA"
                onChange={handleSubcategorieChange}
              />
              {inputError.subcategories !== "" ? (
                <ErrorMensage message={inputError.subcategories} />
              ) : null}
            </div>
          </div>
          {/*Editor Data*/}
          <div className="flex flex-col gap-4 mt-4">
            <div className="border-l-4 border-primary-600">
              <Typography variant="h6" className="ml-5 my-0">
                Detalles De La Licitación
              </Typography>
            </div>
            <div className="ml-5 flex flex-col gap-2">
              <EditorForm dataSet={handleDescriptionChange} />
              {inputError.description !== "" ? (
                <ErrorMensage message={inputError.description} />
              ) : null}
            </div>
          </div>
          {/*Location Data*/}
          <div className="flex flex-col gap-4 mt-4">
            <div className="border-l-4 border-primary-600">
              <Typography variant="h6" className="ml-5 my-0">
                Ubicación
              </Typography>
            </div>
            <div className="ml-5 flex flex-col gap-2">
              {loadingLocations && "Loading..."}
              <Select
                options={locations?.map((loc) => ({
                  value: loc.id,
                  label: loc.name,
                }))}
                placeholder="SELECCIONAR UBICACIÓN"
                onChange={handleChangeLocation}
              />
              {inputError.locationId !== "" ? (
                <ErrorMensage message={inputError.locationId} />
              ) : null}
              <input
                className="w-full border-1 border-gray-300 rounded-md p-3"
                type="text"
                name="address"
                placeholder="Su Dirección"
                onChange={handleInputsChanges}
              />
            </div>
          </div>
          {/*suscription plus*/}
          <div className="flex flex-col gap-4 mt-4">
            <div className="border-l-4 border-primary-600 flex justify-between">
              <Typography variant="h6" className="ml-5 my-0">
                Licitación Destacada
              </Typography>
              <div className="flex gap-4">
                <label
                  class="inline-block pl-[0.15rem] hover:cursor-pointer"
                  for="flexSwitchCheckDefault"
                >
                  {isSponsoredCheqed ? "Destacar" : "No destacar"}
                </label>
                <input
                  class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={handleSponsoredChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-4">
            <div className="border-l-4 border-primary-600 flex justify-between">
              <Typography variant="h6" className="ml-5 my-0">
                Licitación Privada
              </Typography>
              <div className="flex gap-4">
                <label
                  class="inline-block pl-[0.15rem] hover:cursor-pointer"
                  for="flexSwitchCheckDefault"
                >
                  {isPrivateCheqed ? "Privada" : "Publica"}
                </label>

                <input
                  class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  onChange={handlePrivateChange}
                />
              </div>
            </div>
          </div>
          <button
            className="bg-primary-600 text-white font-semibold rounded-md p-2 mt-4"
            onClick={handleSubmit}
          >
            Crear Licitación
          </button>
        </Card>
        <ToastContainer style={{ marginTop: "100px" }} />
      </FormGroup>
    </>
  );
}


export default CreateTenderForm;