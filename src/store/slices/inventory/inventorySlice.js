import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
	// Categories
	getInventoryCategories,
	createInventoryCategory,
	getInventoryCategoryDetails,
	modifyInventoryCategory,
	removeInventoryCategory,
	// Sub categories
	getInventorySubcategories,
	createInventorySubcategory,
	getInventorySubcategoryDetails,
	modifyInventorySubcategory,
	removeInventorSubcategory,
	// Units
	getUnits,
	createUnit,
	getUnitDetails,
	modifyUnit,
	removeUnit,
	// Manufacturers
	getManufacturers,
	createManufacturer,
	getManufacturerDetails,
	modifyManufacturer,
	removeManufacturer,
	// Place
	getPlaces,
	getPlaceDetails,
	createPlace,
	modifyPlace,
	removePlace,
	// Locations
	getLocations,
	createLocation,
	getLocationDetails,
	modifyLocation,
	removeLocation,
	// Attributes
	getAttributes,
	createAttribute,
	getAttributeDetails,
	modifyAttribute,
	removeAttribute,
	// Products
	getAllProducts,
	createProducts,
	modifyProduct,
	getProductDetails,
	// Specification
	getProductSpecifications,
	createProductSpecification,
	getProductSpecificationsDetails,
	modifyProductSpecification,
	removeProductSpecification,
} from "../../../Services/inventoryService"

const initialState = {
	categories: null,
	categoryDetails: null,
	subCategories: null,
	subCategoryDetails: null,
	units: null,
	unitDetails: null,
	manufacturers: null,
	manufacturerDetails: null,
	places: null,
	placeDetails: null,
	locations: null,
	locationDetails: null,
	attributes: null,
	attributeDetails: null,
	products: null,
	productDetails: null,
	specifications: null,
	specificationDetails: null,
	isLoading: false,
	success: null,
	message: "",
	showToast: false,
}

const errorMessageHandler = (error) => {
	const message = error?.response?.data || error.message || error.toString()
	return message
}

// ====>> Category
export const fetchInventoryCategories = createAsyncThunk(
	"inventory/fetchInventoryCategories",
	async (_, thunkAPI) => {
		try {
			const res = await getInventoryCategories()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addInventoryCategories = createAsyncThunk(
	"inventory/addInventoryCategories",
	async (data, thunkAPI) => {
		try {
			const res = await createInventoryCategory(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchInventoryCategoryDetails = createAsyncThunk(
	"inventory/fetchInventoryCategoryDetails",
	async (data, thunkAPI) => {
		try {
			const res = await getInventoryCategoryDetails(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateInventoryCategory = createAsyncThunk(
	"inventory/updateInventoryCategory",
	async (data, thunkAPI) => {
		try {
			const res = await modifyInventoryCategory(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const deleteInventoryCategory = createAsyncThunk(
	"inventory/deleteInventoryCategory",
	async (data, thunkAPI) => {
		try {
			const res = await removeInventoryCategory(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// ====>> Sub Category
export const fetchInventorySubcategories = createAsyncThunk(
	"inventory/fetchInventorySubcategories",
	async (_, thunkAPI) => {
		try {
			const res = await getInventorySubcategories()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addInventorySubcategories = createAsyncThunk(
	"inventory/addInventorySubcategories",
	async (data, thunkAPI) => {
		try {
			const res = await createInventorySubcategory(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchInventorySubcategoryDetails = createAsyncThunk(
	"inventory/fetchInventorySubcategoryDetails",
	async (data, thunkAPI) => {
		try {
			const res = await getInventorySubcategoryDetails(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateInventorySubcategory = createAsyncThunk(
	"inventory/updateInventorySubcategory",
	async (data, thunkAPI) => {
		try {
			const res = await modifyInventorySubcategory(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const deleteInventorySubcategory = createAsyncThunk(
	"inventory/deleteInventorySubcategory",
	async (data, thunkAPI) => {
		try {
			const res = await removeInventorSubcategory(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
// ====>> Units
export const fetchUnits = createAsyncThunk(
	"inventory/fetchUnits",
	async (_, thunkAPI) => {
		try {
			const res = await getUnits()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addUnit = createAsyncThunk(
	"inventory/addUnit",
	async (data, thunkAPI) => {
		try {
			const res = await createUnit(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchUnitDetails = createAsyncThunk(
	"inventory/fetchUnitDetails",
	async (data, thunkAPI) => {
		try {
			const res = await getUnitDetails(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateUnit = createAsyncThunk(
	"inventory/updateUnit",
	async (data, thunkAPI) => {
		try {
			const res = await modifyUnit(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const deleteUnit = createAsyncThunk(
	"inventory/deleteUnit",
	async (data, thunkAPI) => {
		try {
			const res = await removeUnit(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
// ====>> Manufacturers
export const fetchManufacturers = createAsyncThunk(
	"inventory/fetchManufacturers",
	async (_, thunkAPI) => {
		try {
			const res = await getManufacturers()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addManufacturer = createAsyncThunk(
	"inventory/addManufacturer",
	async (data, thunkAPI) => {
		try {
			const res = await createManufacturer(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchManufacturerDetails = createAsyncThunk(
	"inventory/fetchManufacturerDetails",
	async (data, thunkAPI) => {
		try {
			const res = await getManufacturerDetails(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateManufacturer = createAsyncThunk(
	"inventory/updateManufacturer",
	async (data, thunkAPI) => {
		try {
			const res = await modifyManufacturer(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const deleteManufacturer = createAsyncThunk(
	"inventory/deleteManufacturer",
	async (data, thunkAPI) => {
		try {
			const res = await removeManufacturer(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// ====>> Places
export const fetchPlaces = createAsyncThunk(
	"inventory/fetchPlaces",
	async (_, thunkAPI) => {
		try {
			const res = await getPlaces()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addPlace = createAsyncThunk(
	"inventory/addPlace",
	async (data, thunkAPI) => {
		try {
			const res = await createPlace(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchPlaceDetails = createAsyncThunk(
	"inventory/fetchPlaceDetails",
	async (data, thunkAPI) => {
		try {
			const res = await getPlaceDetails(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updatePlace = createAsyncThunk(
	"inventory/updatePlace",
	async (data, thunkAPI) => {
		try {
			const res = await modifyPlace(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const deletePlace = createAsyncThunk(
	"inventory/deletePlace",
	async (data, thunkAPI) => {
		try {
			const res = await removePlace(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
// ====>> Locations
export const fetchLocations = createAsyncThunk(
	"inventory/fetchLocations",
	async (_, thunkAPI) => {
		try {
			const res = await getLocations()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addLocation = createAsyncThunk(
	"inventory/addLocation",
	async (data, thunkAPI) => {
		try {
			const res = await createLocation(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchLocationDetails = createAsyncThunk(
	"inventory/fetchLocationDetails",
	async (data, thunkAPI) => {
		try {
			const res = await getLocationDetails(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateLocation = createAsyncThunk(
	"inventory/updateLocation",
	async (data, thunkAPI) => {
		try {
			const res = await modifyLocation(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const deleteLocation = createAsyncThunk(
	"inventory/deleteLocation",
	async (data, thunkAPI) => {
		try {
			const res = await removeLocation(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// ====>> Attributes
export const fetchAttributes = createAsyncThunk(
	"inventory/fetchAttributes",
	async (_, thunkAPI) => {
		try {
			const res = await getAttributes()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addAttribute = createAsyncThunk(
	"inventory/addAttribute",
	async (data, thunkAPI) => {
		try {
			const res = await createAttribute(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchAttributeDetails = createAsyncThunk(
	"inventory/fetchAttributeDetails",
	async (data, thunkAPI) => {
		try {
			const res = await getAttributeDetails(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateAttribute = createAsyncThunk(
	"inventory/updateAttribute",
	async (data, thunkAPI) => {
		try {
			const res = await modifyAttribute(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const deleteAttribute = createAsyncThunk(
	"inventory/deleteAttribute",
	async (data, thunkAPI) => {
		try {
			const res = await removeAttribute(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// ====>> Products
export const fetchProducts = createAsyncThunk(
	"inventory/fetchProducts",
	async (_, thunkAPI) => {
		try {
			const res = await getAllProducts()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addProducts = createAsyncThunk(
	"inventory/addProducts",
	async (data, thunkAPI) => {
		try {
			const res = await createProducts(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchProductDetails = createAsyncThunk(
	"inventory/fetchProductDetails",
	async (data, thunkAPI) => {
		try {
			const res = await getProductDetails(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateProduct = createAsyncThunk(
	"inventory/updateProduct",
	async (data, thunkAPI) => {
		try {
			const res = await modifyProduct(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// ====>> Specification
export const fetchProductSpecification = createAsyncThunk(
	"inventory/fetchProductSpecification",
	async (data, thunkAPI) => {
		try {
			const res = await getProductSpecifications(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addProductSpecification = createAsyncThunk(
	"inventory/addProductSpecification",
	async (data, thunkAPI) => {
		try {
			const res = await createProductSpecification(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchProductSpecificationDetails = createAsyncThunk(
	"inventory/fetchProductSpecificationDetails",
	async (data, thunkAPI) => {
		try {
			const res = await getProductSpecificationsDetails(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateProductSpecification = createAsyncThunk(
	"inventory/updateProductSpecification",
	async (data, thunkAPI) => {
		try {
			const res = await modifyProductSpecification(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const deleteProductSpecification = createAsyncThunk(
	"inventory/deleteProductSpecification",
	async (data, thunkAPI) => {
		try {
			const res = await removeProductSpecification(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

const inventorySlice = createSlice({
	name: "inventory",
	initialState,
	reducers: {
		toastReset: (state) => {
			state.showToast = false
		},
	},
	extraReducers: {
		// Get categories
		[fetchInventoryCategories.pending]: (state) => {
			state.categories = null
		},
		[fetchInventoryCategories.fulfilled]: (state, action) => {
			state.categories = action.payload.data
		},
		[fetchInventoryCategories.rejected]: (state, action) => {
			state.categories = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Create category
		[addInventoryCategories.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addInventoryCategories.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.categories.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[addInventoryCategories.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get category details
		[fetchInventoryCategoryDetails.pending]: (state) => {
			state.isLoading = true
			state.categoryDetails = null
		},
		[fetchInventoryCategoryDetails.fulfilled]: (state, action) => {
			state.isLoading = false
			state.categoryDetails = action.payload.data
		},
		[fetchInventoryCategoryDetails.rejected]: (state, action) => {
			state.isLoading = false
			state.categoryDetails = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Update category
		[updateInventoryCategory.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateInventoryCategory.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateInventoryCategory.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Delete category
		[deleteInventoryCategory.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[deleteInventoryCategory.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[deleteInventoryCategory.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get Sub categories
		[fetchInventorySubcategories.pending]: (state) => {
			state.subCategories = null
		},
		[fetchInventorySubcategories.fulfilled]: (state, action) => {
			state.subCategories = action.payload.data
		},
		[fetchInventorySubcategories.rejected]: (state, action) => {
			state.subCategories = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Create sub category
		[addInventorySubcategories.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addInventorySubcategories.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.subCategories.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[addInventorySubcategories.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get sub category details
		[fetchInventorySubcategoryDetails.pending]: (state) => {
			state.isLoading = true
			state.subCategoryDetails = null
		},
		[fetchInventorySubcategoryDetails.fulfilled]: (state, action) => {
			state.isLoading = false
			state.subCategoryDetails = action.payload.data
		},
		[fetchInventorySubcategoryDetails.rejected]: (state, action) => {
			state.isLoading = false
			state.subCategoryDetails = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Update sub category
		[updateInventorySubcategory.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateInventorySubcategory.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateInventorySubcategory.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Delete sub category
		[deleteInventorySubcategory.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[deleteInventorySubcategory.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[deleteInventorySubcategory.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get Units
		[fetchUnits.pending]: (state) => {
			state.units = null
		},
		[fetchUnits.fulfilled]: (state, action) => {
			state.units = action.payload.data
		},
		[fetchUnits.rejected]: (state, action) => {
			state.units = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Create unit
		[addUnit.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addUnit.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.units.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[addUnit.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get unit details
		[fetchUnitDetails.pending]: (state) => {
			state.isLoading = true
			state.unitDetails = null
		},
		[fetchUnitDetails.fulfilled]: (state, action) => {
			state.isLoading = false
			state.unitDetails = action.payload.data
		},
		[fetchUnitDetails.rejected]: (state, action) => {
			state.isLoading = false
			state.unitDetails = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Update unit
		[updateUnit.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateUnit.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateUnit.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Delete unit
		[deleteUnit.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[deleteUnit.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[deleteUnit.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get Manufacturer
		[fetchManufacturers.pending]: (state) => {
			state.manufacturers = null
		},
		[fetchManufacturers.fulfilled]: (state, action) => {
			state.manufacturers = action.payload.data
		},
		[fetchManufacturers.rejected]: (state, action) => {
			state.manufacturers = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Create Manufacturer
		[addManufacturer.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addManufacturer.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.manufacturers.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[addManufacturer.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get Manufacturer details
		[fetchManufacturerDetails.pending]: (state) => {
			state.isLoading = true
			state.manufacturerDetails = null
		},
		[fetchManufacturerDetails.fulfilled]: (state, action) => {
			state.isLoading = false
			state.manufacturerDetails = action.payload.data
		},
		[fetchManufacturerDetails.rejected]: (state, action) => {
			state.isLoading = false
			state.manufacturerDetails = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Update Manufacturer
		[updateManufacturer.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateManufacturer.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateManufacturer.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Delete Manufacturer
		[deleteManufacturer.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[deleteManufacturer.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[deleteManufacturer.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get Places
		[fetchPlaces.pending]: (state) => {
			state.places = null
		},
		[fetchPlaces.fulfilled]: (state, action) => {
			state.places = action.payload.data
		},
		[fetchPlaces.rejected]: (state, action) => {
			state.places = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Create place
		[addPlace.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addPlace.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.places.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[addPlace.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get place details
		[fetchPlaceDetails.pending]: (state) => {
			state.isLoading = true
			state.placeDetails = null
		},
		[fetchPlaceDetails.fulfilled]: (state, action) => {
			state.isLoading = false
			state.placeDetails = action.payload.data
		},
		[fetchPlaceDetails.rejected]: (state, action) => {
			state.isLoading = false
			state.placeDetails = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Update place
		[updatePlace.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updatePlace.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updatePlace.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Delete place
		[deletePlace.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[deletePlace.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[deletePlace.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get Locations
		[fetchLocations.pending]: (state) => {
			state.locations = null
		},
		[fetchLocations.fulfilled]: (state, action) => {
			state.locations = action.payload.data
		},
		[fetchLocations.rejected]: (state, action) => {
			state.locations = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Create Location
		[addLocation.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addLocation.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.locations.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[addLocation.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get location details
		[fetchLocationDetails.pending]: (state) => {
			state.isLoading = true
			state.locationDetails = null
		},
		[fetchLocationDetails.fulfilled]: (state, action) => {
			state.isLoading = false
			state.locationDetails = action.payload.data
		},
		[fetchLocationDetails.rejected]: (state, action) => {
			state.isLoading = false
			state.locationDetails = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Update location
		[updateLocation.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateLocation.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateLocation.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Delete location
		[deleteLocation.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[deleteLocation.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[deleteLocation.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},

		// Get Attributes
		[fetchAttributes.pending]: (state) => {
			state.attributes = null
		},
		[fetchAttributes.fulfilled]: (state, action) => {
			state.attributes = action.payload.data
		},
		[fetchAttributes.rejected]: (state, action) => {
			state.attributes = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Create Attributes
		[addAttribute.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addAttribute.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.attributes.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[addAttribute.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get Attributes details
		[fetchAttributeDetails.pending]: (state) => {
			state.isLoading = true
			state.attributeDetails = null
		},
		[fetchAttributeDetails.fulfilled]: (state, action) => {
			state.isLoading = false
			state.attributeDetails = action.payload.data
		},
		[fetchAttributeDetails.rejected]: (state, action) => {
			state.isLoading = false
			state.attributeDetails = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Update Attributes
		[updateAttribute.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateAttribute.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateAttribute.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Delete Attributes
		[deleteAttribute.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[deleteAttribute.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[deleteAttribute.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get Products
		[fetchProducts.pending]: (state) => {
			state.products = null
		},
		[fetchProducts.fulfilled]: (state, action) => {
			state.products = action.payload.data
		},
		[fetchProducts.rejected]: (state, action) => {
			state.products = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Create product
		[addProducts.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addProducts.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			if (state.products) {
				state.products.push(action.payload.data)
			}
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[addProducts.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get product details
		[fetchProductDetails.pending]: (state) => {
			state.isLoading = true
			state.productDetails = null
		},
		[fetchProductDetails.fulfilled]: (state, action) => {
			state.isLoading = false
			state.productDetails = action.payload.data
		},
		[fetchProductDetails.rejected]: (state, action) => {
			state.isLoading = false
			state.productDetails = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Update products
		[updateProduct.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateProduct.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateProduct.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get Product Specification
		[fetchProductSpecification.pending]: (state) => {
			state.specifications = null
		},
		[fetchProductSpecification.fulfilled]: (state, action) => {
			state.specifications = action.payload.data
		},
		[fetchProductSpecification.rejected]: (state, action) => {
			state.specifications = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Create product specification
		[addProductSpecification.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addProductSpecification.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.specifications.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[addProductSpecification.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get product specification details
		[fetchProductSpecificationDetails.pending]: (state) => {
			state.isLoading = true
			state.specificationDetails = null
		},
		[fetchProductSpecificationDetails.fulfilled]: (state, action) => {
			state.isLoading = false
			state.specificationDetails = action.payload.data
		},
		[fetchProductSpecificationDetails.rejected]: (state, action) => {
			state.isLoading = false
			state.specificationDetails = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Update product specifications
		[updateProductSpecification.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateProductSpecification.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateProductSpecification.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Delete product specifications
		[deleteProductSpecification.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[deleteProductSpecification.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[deleteProductSpecification.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
	},
})

export const { toastReset } = inventorySlice.actions
export default inventorySlice.reducer
