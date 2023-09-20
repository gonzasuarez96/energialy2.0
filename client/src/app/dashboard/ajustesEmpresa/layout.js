import Nav from "../ajustesProfile/components/Nav"

const optionsNav = [
    'Datos Básicos',
    'Detalles de la Empresa',
    'Imágenes',
    'Tipo de Organización',
  ]

export default function AjustesCompany({children }) {
    return (
        <div className="flex">
            <Nav options={optionsNav}/>
            <main className="w-full p-3">
                {children}
            </main>
        </div>
    )
}