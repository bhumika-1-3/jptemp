import axios from "../Services/axios"

// =====>>>>> Category <<<<<===== //
export const getInventoryCategories = async () => {
	const res = await axios.get("/inventory/category/")
	return res.data
}
export const createInventoryCategory = async (data) => {
	const res = await axios.post("/inventory/category/", data)
	return res.data
}
export const getInventoryCategoryDetails = async (data) => {
	const res = await axios.get(`/inventory/category/${data}/`)
	return res.data
}
export const modifyInventoryCategory = async (data) => {
	const res = await axios.patch(`/inventory/category/${data.id}/`, data.content)
	return res.data
}
export const removeInventoryCategory = async (data) => {
	const res = await axios.delete(`/inventory/category/${data}/`)
	return res.data
}

// =====>>>>> Sub category <<<<<===== //
export const getInventorySubcategories = async () => {
	const res = await axios.get("/inventory/subcategory/")
	return res.data
}
export const createInventorySubcategory = async (data) => {
	const res = await axios.post("/inventory/subcategory/", data)
	return res.data
}
export const getInventorySubcategoryDetails = async (data) => {
	const res = await axios.get(`/inventory/subcategory/${data}/`)
	return res.data
}
export const modifyInventorySubcategory = async (data) => {
	const res = await axios.patch(
		`/inventory/subcategory/${data.id}/`,
		data.content
	)
	return res.data
}
export const removeInventorSubcategory = async (data) => {
	const res = await axios.delete(`/inventory/subcategory/${data}/`)
	return res.data
}

// =====>>>>> Units <<<<<===== //
export const getUnits = async () => {
	const res = await axios.get("/inventory/units/")
	return res.data
}
export const createUnit = async (data) => {
	const res = await axios.post("/inventory/units/", data)
	return res.data
}
export const getUnitDetails = async (data) => {
	const res = await axios.get(`/inventory/units/${data}/`)
	return res.data
}
export const modifyUnit = async (data) => {
	const res = await axios.patch(`/inventory/units/${data.id}/`, data.content)
	return res.data
}
export const removeUnit = async (data) => {
	const res = await axios.delete(`/inventory/units/${data}/`)
	return res.data
}

// =====>>>>> Manufacturers <<<<<===== //
export const getManufacturers = async () => {
	const res = await axios.get("/inventory/manufacturers/")
	return res.data
}
export const createManufacturer = async (data) => {
	const res = await axios.post("/inventory/manufacturers/", data)
	return res.data
}
export const getManufacturerDetails = async (data) => {
	const res = await axios.get(`/inventory/manufacturers/${data}/`)
	return res.data
}
export const modifyManufacturer = async (data) => {
	const res = await axios.patch(
		`/inventory/manufacturers/${data.id}/`,
		data.content
	)
	return res.data
}
export const removeManufacturer = async (data) => {
	const res = await axios.delete(`/inventory/manufacturers/${data}/`)
	return res.data
}

// =====>>>>> Places <<<<<===== //
export const getPlaces = async () => {
	const res = await axios.get("/inventory/places/")
	return res.data
}
export const createPlace = async (data) => {
	const res = await axios.post("/inventory/places/", data)
	return res.data
}
export const getPlaceDetails = async (data) => {
	const res = await axios.get(`/inventory/places/${data}/`)
	return res.data
}
export const modifyPlace = async (data) => {
	const res = await axios.patch(`/inventory/places/${data.id}/`, data.content)
	return res.data
}
export const removePlace = async (data) => {
	const res = await axios.delete(`/inventory/places/${data}/`)
	return res.data
}

// =====>>>>> Locations <<<<<===== //
export const getLocations = async () => {
	const res = await axios.get("/inventory/locations/")
	return res.data
}
export const createLocation = async (data) => {
	const res = await axios.post("/inventory/locations/", data)
	return res.data
}
export const getLocationDetails = async (data) => {
	const res = await axios.get(`/inventory/locations/${data}/`)
	return res.data
}
export const modifyLocation = async (data) => {
	const res = await axios.patch(
		`/inventory/locations/${data.id}/`,
		data.content
	)
	return res.data
}
export const removeLocation = async (data) => {
	const res = await axios.delete(`/inventory/locations/${data}/`)
	return res.data
}

// =====>>>>> Attributes <<<<<===== //
export const getAttributes = async () => {
	const res = await axios.get("/inventory/attributes/")
	return res.data
}
export const createAttribute = async (data) => {
	const res = await axios.post("/inventory/attributes/", data)
	return res.data
}
export const getAttributeDetails = async (data) => {
	const res = await axios.get(`/inventory/attributes/${data}/`)
	return res.data
}
export const modifyAttribute = async (data) => {
	const res = await axios.patch(
		`/inventory/attributes/${data.id}/`,
		data.content
	)
	return res.data
}
export const removeAttribute = async (data) => {
	const res = await axios.delete(`/inventory/attributes/${data}/`)
	return res.data
}

// =====>>>>> Products <<<<<===== //
export const getAllProducts = async () => {
	const res = await axios.get("/inventory/products/")
	return res.data
}
export const createProducts = async (data) => {
	const res = await axios.post("/inventory/products/", data)
	return res.data
}
export const getProductDetails = async (data) => {
	const res = await axios.get(`/inventory/products/${data}/`)
	return res.data
}
export const modifyProduct = async (data) => {
	const res = await axios.patch(`/inventory/products/${data.id}/`, data.content)
	return res.data
}

// =====>>>>> Specifications <<<<<===== //
export const getProductSpecifications = async (data) => {
	const res = await axios.get(`/inventory/products/${data}/specifications/`)
	return res.data
}
export const createProductSpecification = async (data) => {
	const res = await axios.post(
		`/inventory/products/${data.id}/specifications/`,
		data.content
	)
	return res.data
}
export const getProductSpecificationsDetails = async (data) => {
	const res = await axios.get(
		`/inventory/products/${data.prodId}/specifications/${data.specId}/`
	)
	return res.data
}
export const modifyProductSpecification = async (data) => {
	const res = await axios.patch(
		`/inventory/products/${data.prodId}/specifications/${data.specId}/`,
		data.content
	)
	return res.data
}
export const removeProductSpecification = async (data) => {
	const res = await axios.delete(
		`/inventory/products/${data.prodId}/specifications/${data.specId}/`
	)
	return res.data
}

// Suppliers
export const getSuppliers = async () => {
	const res = await axios.get("/inventory/suppliers/")
	return res.data
}
export const createSupplier = async (data) => {
	const res = await axios.post("/inventory/suppliers/", data)
	return res.data
}
export const getSupplierDetails = async (data) => {
	const res = await axios.get(`/inventory/suppliers/${data}/`)
	return res.data
}
export const modifySupplier = async (data) => {
	const res = await axios.patch(
		`/inventory/suppliers/${data.id}/`,
		data.content
	)
	return res.data
}
export const removeSupplier = async (data) => {
	const res = await axios.delete(`/inventory/suppliers/${data}/`)
	return res.data
}

// Contacts <-- Suppliers
export const getSuppliersContacts = async (data) => {
	const res = await axios.get(`/inventory/suppliers/${data}/contact/`)
	return res.data
}
export const createSupplierContact = async (data) => {
	const res = await axios.post(
		`/inventory/suppliers/${data.supplierId}/contact/`,
		data.content
	)
	return res.data
}
export const modifySupplierContact = async (data) => {
	const res = await axios.patch(
		`/inventory/suppliers/${data.supplierId}/contact/${data.contactId}`,
		data.content
	)
	return res.data
}
export const removeSupplierContact = async (data) => {
	const res = await axios.delete(
		`/inventory/suppliers/${data.supplierId}/contact/${data.contactId}`
	)
	return res.data
}

// Indents
export const getIndents = async () => {
	const res = await axios.get("/inventory/indents/")
	return res.data
}
export const createIndent = async (data) => {
	const res = await axios.post("/inventory/indents/", data)
	return res.data
}
export const getIndentDetails = async (data) => {
	const res = await axios.get(`/inventory/indents/${data}/`)
	return res.data
}
export const modifyIndent = async (data) => {
	const res = await axios.patch(`/inventory/indents/${data.id}/`, data.content)
	return res.data
}
export const removeIndent = async (data) => {
	const res = await axios.delete(`/inventory/indents/${data}/`)
	return res.data
}

// Purchase orders
export const getPurchases = async () => {
	const res = await axios.get("/inventory/purchases/")
	return res.data
}
export const createPurchase = async (data) => {
	const res = await axios.post("/inventory/purchases/", data)
	return res.data
}
export const getPurchaseDetails = async (data) => {
	const res = await axios.get(`/inventory/purchases/${data}/`)
	return res.data
}
export const modifyPurchase = async (data) => {
	const res = await axios.patch(
		`/inventory/purchases/${data.id}/`,
		data.content
	)
	return res.data
}
export const removePurchase = async (data) => {
	const res = await axios.delete(`/inventory/purchases/${data}/`)
	return res.data
}
