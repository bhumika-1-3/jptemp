import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import {
	// Suppliers
	getSuppliers,
	getSupplierDetails,
	createSupplier,
	modifySupplier,
	removeSupplier,
	// Supplier contacts
	getSuppliersContacts,
	createSupplierContact,
	modifySupplierContact,
	removeSupplierContact,
	// indents
	getIndents,
	getIndentDetails,
	createIndent,
	modifyIndent,
	removeIndent,
	// Purchases
	getPurchases,
	getPurchaseDetails,
	createPurchase,
	modifyPurchase,
	removePurchase,
} from "../../../Services/inventoryService"

const initialState = {
	suppliers: null,
	supplierDetails: null,
	contacts: null,
	indents: null,
	indentDetails: null,
	purchases: null,
	purchaseDetails: null,
	isLoading: false,
	success: null,
	message: "",
	showToast: false,
}

const errorMessageHandler = (error) => {
	const message = error?.response?.data || error.message || error.toString()
	return message
}

// ====>> Suppliers
export const fetchSuppliers = createAsyncThunk(
	"inventory/fetchSuppliers",
	async (_, thunkAPI) => {
		try {
			const res = await getSuppliers()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addSupplier = createAsyncThunk(
	"inventory/addSupplier",
	async (data, thunkAPI) => {
		try {
			const res = await createSupplier(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchSupplierDetails = createAsyncThunk(
	"inventory/fetchSupplierDetails",
	async (data, thunkAPI) => {
		try {
			const res = await getSupplierDetails(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateSupplier = createAsyncThunk(
	"inventory/updateSupplier",
	async (data, thunkAPI) => {
		try {
			const res = await modifySupplier(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const deleteSupplier = createAsyncThunk(
	"inventory/deleteSupplier",
	async (data, thunkAPI) => {
		try {
			const res = await removeSupplier(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// ====>> Contact <-- Supplier
export const fetchSupplierContacts = createAsyncThunk(
	"inventory/fetchSupplierContacts",
	async (data, thunkAPI) => {
		try {
			const res = await getSuppliersContacts(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addSupplierContact = createAsyncThunk(
	"inventory/addSupplierContact",
	async (data, thunkAPI) => {
		try {
			const res = await createSupplierContact(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateSupplierContact = createAsyncThunk(
	"inventory/updateSupplierContact",
	async (data, thunkAPI) => {
		try {
			const res = await modifySupplierContact(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const deleteSupplierContact = createAsyncThunk(
	"inventory/deleteSupplierContact",
	async (data, thunkAPI) => {
		try {
			const res = await removeSupplierContact(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

// ====>> Indents
export const fetchIndents = createAsyncThunk(
	"inventory/fetchIndents",
	async (_, thunkAPI) => {
		try {
			const res = await getIndents()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addIndent = createAsyncThunk(
	"inventory/addIndent",
	async (data, thunkAPI) => {
		try {
			const res = await createIndent(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchIndentDetails = createAsyncThunk(
	"inventory/fetchIndentDetails",
	async (data, thunkAPI) => {
		try {
			const res = await getIndentDetails(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updateIndent = createAsyncThunk(
	"inventory/updateIndent",
	async (data, thunkAPI) => {
		try {
			const res = await modifyIndent(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const deleteIndent = createAsyncThunk(
	"inventory/deleteIndent",
	async (data, thunkAPI) => {
		try {
			const res = await removeIndent(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
// ====>> Purchases
export const fetchPurchases = createAsyncThunk(
	"inventory/fetchPurchases",
	async (_, thunkAPI) => {
		try {
			const res = await getPurchases()
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const addPurchase = createAsyncThunk(
	"inventory/addPurchase",
	async (data, thunkAPI) => {
		try {
			const res = await createPurchase(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const fetchPurchaseDetails = createAsyncThunk(
	"inventory/fetchPurchaseDetails",
	async (data, thunkAPI) => {
		try {
			const res = await getPurchaseDetails(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const updatePurchase = createAsyncThunk(
	"inventory/updatePurchase",
	async (data, thunkAPI) => {
		try {
			const res = await modifyPurchase(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)
export const deletePurchase = createAsyncThunk(
	"inventory/deletePurchase",
	async (data, thunkAPI) => {
		try {
			const res = await removePurchase(data)
			return res
		} catch (error) {
			const message = errorMessageHandler(error)
			return thunkAPI.rejectWithValue(message)
		}
	}
)

const inventory2Slice = createSlice({
	name: "inventory2",
	initialState,
	reducers: {
		toastReset: (state) => {
			state.showToast = false
		},
	},
	extraReducers: {
		// Get suppliers
		[fetchSuppliers.pending]: (state) => {
			state.suppliers = null
		},
		[fetchSuppliers.fulfilled]: (state, action) => {
			state.suppliers = action.payload.data
		},
		[fetchSuppliers.rejected]: (state, action) => {
			state.suppliers = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Create supplier
		[addSupplier.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addSupplier.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.suppliers.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[addSupplier.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get supplier details
		[fetchSupplierDetails.pending]: (state) => {
			state.isLoading = true
			state.supplierDetails = null
		},
		[fetchSupplierDetails.fulfilled]: (state, action) => {
			state.isLoading = false
			state.supplierDetails = action.payload.data
		},
		[fetchSupplierDetails.rejected]: (state, action) => {
			state.isLoading = false
			state.supplierDetails = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Update supplier
		[updateSupplier.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateSupplier.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateSupplier.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Delete supplier
		[deleteSupplier.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[deleteSupplier.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[deleteSupplier.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get suppliers contact
		[fetchSupplierContacts.pending]: (state) => {
			state.contacts = null
		},
		[fetchSupplierContacts.fulfilled]: (state, action) => {
			state.contacts = action.payload.data
		},
		[fetchSupplierContacts.rejected]: (state, action) => {
			state.contacts = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Create supplier contact
		[addSupplierContact.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addSupplierContact.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			if (!state.contacts) {
				state.contacts = []
			}
			state.contacts.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[addSupplierContact.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Update supplier conatct
		[updateSupplierContact.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateSupplierContact.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateSupplierContact.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Delete supplier contact
		[deleteSupplierContact.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[deleteSupplierContact.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[deleteSupplierContact.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get indents
		[fetchIndents.pending]: (state) => {
			state.indents = null
		},
		[fetchIndents.fulfilled]: (state, action) => {
			state.indents = action.payload.data
		},
		[fetchIndents.rejected]: (state, action) => {
			state.indents = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Create indent
		[addIndent.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addIndent.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.indents.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[addIndent.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get indent details
		[fetchIndentDetails.pending]: (state) => {
			state.isLoading = true
			state.indentDetails = null
		},
		[fetchIndentDetails.fulfilled]: (state, action) => {
			state.isLoading = false
			state.indentDetails = action.payload.data
		},
		[fetchIndentDetails.rejected]: (state, action) => {
			state.isLoading = false
			state.indentDetails = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Update indent
		[updateIndent.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updateIndent.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updateIndent.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Delete indent
		[deleteIndent.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[deleteIndent.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[deleteIndent.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get purchases
		[fetchPurchases.pending]: (state) => {
			state.purchases = null
		},
		[fetchPurchases.fulfilled]: (state, action) => {
			state.purchases = action.payload.data
		},
		[fetchPurchases.rejected]: (state, action) => {
			state.purchases = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Create purchase
		[addPurchase.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[addPurchase.fulfilled]: (state, action) => {
			state.isLoading = false
			state.showToast = true
			state.purchases.push(action.payload.data)
			state.message = action.payload.detail
			state.success = action.payload.success
		},
		[addPurchase.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Get purchase details
		[fetchPurchaseDetails.pending]: (state) => {
			state.isLoading = true
			state.purchaseDetails = null
		},
		[fetchPurchaseDetails.fulfilled]: (state, action) => {
			state.isLoading = false
			state.purchaseDetails = action.payload.data
		},
		[fetchPurchaseDetails.rejected]: (state, action) => {
			state.isLoading = false
			state.purchaseDetails = null
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Update purchase
		[updatePurchase.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[updatePurchase.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[updatePurchase.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		// Delete purchase
		[deletePurchase.pending]: (state) => {
			state.isLoading = true
			state.showToast = false
		},
		[deletePurchase.fulfilled]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
		[deletePurchase.rejected]: (state, action) => {
			state.isLoading = false
			state.message = action.payload.detail
			state.success = action.payload.success
			state.showToast = true
		},
	},
})

export const { toastReset } = inventory2Slice.actions
export default inventory2Slice.reducer
