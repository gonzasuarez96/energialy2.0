import GalleryCard from "./GalleryImageCard";

function GalleryCardContainer({gallery,openModal} ) {

return (
    <div>
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-4 justify-between">
          {gallery.length > 0 ? (
            gallery.map((image) => (   
              <GalleryCard
                key={image.id}
                imageUrl={image.imageUrl}
                description={image.description}
                openModal={openModal}
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

export default GalleryCardContainer