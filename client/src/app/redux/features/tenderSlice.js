import { createSlice } from "@reduxjs/toolkit";

const tendersReducer = createSlice({
  name: "tenders",
  initialState: {
    tenders: [],
    filterTenders: [],
  },
  reducers: {
    setAllTenders: (state, action) => {
      state.tenders = action.payload;
      state.filterTenders = action.payload;
    },
    filterTendersByName: (state, action) => {
      state.filterTenders = state.tenders.filter((tender) =>
        tender.company.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    filterTendersByCompanyId: (state, action)=> {
      if(action.payload === tenders.company.Id) {
        state.filterTenders = state.tenders.filter((comp) => action.payload !== comp.company.id)
      }
    },
    fiterTendersByLocation: (state, action) => {
      if (action.payload.length === 0) {
        state.filterTenders = [...state.tenders];
      } else {
        state.filterTenders = state.tenders.filter((tender) =>
          action.payload.every((locId) => tender.location.id === locId)
        );
      }
    },
    filterTendersByCategorie: (state, action) => {
      state.filterTenders = state.tenders.filter((tender) =>
        tender.subcategories.CategoryId === action.payload
        
      );
    },
    filterTendersBySubcategorie: (state, action) => {
      state.filterTenders = state.tenders.filter((tender) =>
        tender.subcategories.some((subcat) => subcat.id === action.payload)
      );
    },
  },
});

export const {
  setAllTenders,
  filterTendersByName,
  fiterTendersByLocation,
  filterTendersByCategorie,
  filterTendersBySubcategorie,
  filterTendersByCompanyId,
} = tendersReducer.actions;
export default tendersReducer.reducer;
