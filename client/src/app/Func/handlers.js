export const handleCategoryChange = (e) => {
  const categoryId = e.target.value;
  console.log("categoryId:", categoryId);
  const filteredSubcategories = subcategories.filter(
    (subcategory) => subcategory.categoryId === categoryId
  );
  setSubcategoriesOptions(filteredSubcategories);
  console.log("nuevas opciones de subcat:", filteredSubcategories);
};

export const handleSubcategoryChange = (e) => {
  const subcategoryId = e.target.value;
  setSubcategorySelected((prevSubcategories) => {
    if (prevSubcategories.includes(subcategoryId)) {
      return prevSubcategories.filter((id) => id !== subcategoryId);
    } else {
      return [...prevSubcategories, subcategoryId];
    }
  });
  console.log("Subcategorias seleccionadas:", subcategoryId);
};
