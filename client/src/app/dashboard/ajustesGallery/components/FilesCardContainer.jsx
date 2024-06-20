import FilesCard from "./FilesCard";

function FilesCardContainer({gallery, openModal, onDelete, onSaveDescription  } ) {

return (
    <div>
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 justify-between">
          {gallery.length > 0 ? (
            gallery.map((image) => (   
              <FilesCard
                key={image.id}
                imageUrl={image.imageUrl}
                id={image.id}
                description={image.description}
                openModal={openModal}
                onDelete={onDelete}
                onSaveDescription={onSaveDescription}
              />
            )
        )
          ) : (
            <h1>La compañia no tiene imagenes cargadas</h1>
          )}
        </div>    
    </div>

)

}

export default FilesCardContainer