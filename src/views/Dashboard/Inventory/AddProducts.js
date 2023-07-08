import { useState, useEffect } from "react"
import { HiPlusCircle } from "react-icons/hi"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {
	LoadingSpinner,
	RenderIf,
	SelectTag,
	InputTag,
	Button,
	BigText,
	TextareaTag,
} from "../../../components"

import {
	addProducts,
	toastReset,
	fetchUnits,
	fetchInventoryCategories,
	fetchInventorySubcategories,
	fetchManufacturers,
	fetchLocations,
	fetchPlaces,
} from "../../../store/slices/inventory/inventorySlice"

const AddProducts = () => {
	const [product, setProduct] = useState({
		name: "",
		sku: "",
		description: "",
		price: "",
		quantity: "",
		unit: "",
		category: "",
		subcategory: "",
		manufacturer: "",
		location: "",
		place: "",
	})
	const {
		isLoading,
		categories,
		subCategories,
		units,
		manufacturers,
		places,
		locations,
		showToast,
		success,
		message,
	} = useSelector((state) => state.inventory)
	const dispatch = useDispatch()

	const addProductHandler = (e) => {
		e.preventDefault()
		dispatch(addProducts(product))
	}

	useEffect(() => {
		if (!units) {
			dispatch(fetchUnits())
		}
		if (!categories) {
			dispatch(fetchInventoryCategories())
		}
		if (!subCategories) {
			dispatch(fetchInventorySubcategories())
		}
		if (!manufacturers) {
			dispatch(fetchManufacturers())
		}
		if (!locations) {
			dispatch(fetchLocations())
		}
		if (!places) {
			dispatch(fetchPlaces())
		}
	}, [
		dispatch,
		units,
		categories,
		subCategories,
		manufacturers,
		locations,
		places,
	])

	useEffect(() => {
		if (showToast) {
			toast[success ? "success" : "error"](message)
		}
		return () => dispatch(toastReset())
	}, [showToast, message, dispatch, success])

	return (
		<>
			{isLoading && <LoadingSpinner />}
			<BigText>Add a new product</BigText>
			<section className="p-6 rounded-xl overflow-hidden custom_shadow bg-gray-100 dark:bg-purple_5 max-w-2xl">
				<form onSubmit={addProductHandler}>
					<InputTag
						value={product.name}
						onChange={(e) =>
							setProduct((prev) => ({ ...prev, name: e.target.value }))
						}
						label="Name"
						type="text"
						placeholder="Enter the product name"
					/>
					<InputTag
						value={product.sku}
						onChange={(e) =>
							setProduct((prev) => ({ ...prev, sku: e.target.value }))
						}
						label="Sku"
						type="text"
						placeholder="Enter sku"
					/>
					<TextareaTag
						value={product.description}
						onChange={(e) =>
							setProduct((prev) => ({ ...prev, description: e.target.value }))
						}
						label="Desciption"
						placeholder="Enter product description"
					/>
					<InputTag
						value={product.price}
						onChange={(e) =>
							setProduct((prev) => ({ ...prev, price: e.target.value }))
						}
						label="Price"
						type="number"
						placeholder="Enter product price"
					/>
					<InputTag
						value={product.quantity}
						onChange={(e) =>
							setProduct((prev) => ({ ...prev, quantity: e.target.value }))
						}
						label="Quantity"
						type="number"
						placeholder="Enter product quantity"
					/>
					<RenderIf isTrue={units && units?.length > 0}>
						<SelectTag
							value={product.unit}
							onChange={(e) =>
								setProduct((prev) => ({ ...prev, unit: e.target.value }))
							}
							label="Unit"
							content={units || []}
						/>
					</RenderIf>
					<RenderIf isTrue={categories && categories?.length > 0}>
						<SelectTag
							value={product.category}
							onChange={(e) =>
								setProduct((prev) => ({ ...prev, category: e.target.value }))
							}
							label="Category"
							content={categories || []}
						/>
					</RenderIf>
					<RenderIf isTrue={subCategories && subCategories?.length > 0}>
						<SelectTag
							value={product.subcategory}
							onChange={(e) =>
								setProduct((prev) => ({ ...prev, subcategory: e.target.value }))
							}
							label="Sub category"
							content={subCategories || []}
						/>
					</RenderIf>
					<RenderIf isTrue={manufacturers && manufacturers?.length > 0}>
						<SelectTag
							value={product.manufacturer}
							onChange={(e) =>
								setProduct((prev) => ({
									...prev,
									manufacturer: e.target.value,
								}))
							}
							label="Manufacturers"
							content={manufacturers || []}
						/>
					</RenderIf>
					<RenderIf isTrue={locations && locations?.length > 0}>
						<SelectTag
							value={product.location}
							onChange={(e) =>
								setProduct((prev) => ({ ...prev, location: e.target.value }))
							}
							label="Locations"
							content={locations || []}
						/>
					</RenderIf>
					<RenderIf isTrue={places && places?.length > 0}>
						<SelectTag
							value={product.place}
							onChange={(e) =>
								setProduct((prev) => ({ ...prev, place: e.target.value }))
							}
							label="Places"
							content={places || []}
						/>
					</RenderIf>
					<div className="mt-6">
						<Button Icon={HiPlusCircle}>Add</Button>
					</div>
				</form>
			</section>
		</>
	)
}

export default AddProducts
