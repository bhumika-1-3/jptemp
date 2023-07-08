import { useEffect, useState } from "react"
import { HiPlusCircle } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"
import {
	BigText,
	RenderIf,
	LoadingSpinner,
	TransitionBtoT,
	SelectTag,
	InputTag,
	Button,
	TextareaTag,
	SubHeading,
} from "../../../components"
import {
	updateProduct,
	fetchProductDetails,
	fetchUnits,
	fetchInventoryCategories,
	fetchInventorySubcategories,
	fetchManufacturers,
	fetchLocations,
	fetchPlaces,
} from "../../../store/slices/inventory/inventorySlice"
import Specifications from "./components/Specifications"

const ProductDetails = () => {
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
		productDetails,
		isLoading,
		categories,
		subCategories,
		units,
		manufacturers,
		places,
		locations,
	} = useSelector((state) => state.inventory)
	const dispatch = useDispatch()
	const { id } = useParams()

	const updateProductHandler = (e) => {
		e.preventDefault()
		dispatch(updateProduct({ id: productDetails?.id, content: product }))
		setTimeout(() => {
			dispatch(fetchProductDetails(id))
		}, 500)
	}

	useEffect(() => {
		if (id) {
			dispatch(fetchProductDetails(id))
		}
	}, [dispatch, id])

	useEffect(() => {
		// if (!units) {
		dispatch(fetchUnits())
		// }
		// if (!categories) {
		dispatch(fetchInventoryCategories())
		// }
		// if (!subCategories) {
		dispatch(fetchInventorySubcategories())
		// }
		// if (!manufacturers) {
		dispatch(fetchManufacturers())
		// }
		// if (!locations) {
		dispatch(fetchLocations())
		// }
		// if (!places) {
		dispatch(fetchPlaces())
		// }
	}, [dispatch])

	useEffect(() => {
		if (productDetails) {
			setProduct({
				name: productDetails?.name || "",
				sku: productDetails?.sku || "",
				description: productDetails?.description || "",
				price: productDetails?.price || "",
				quantity: productDetails?.quantity || 0,
				unit: productDetails?.unit?.id || 0,
				category: productDetails?.category?.id,
				subcategory: productDetails?.subcategory?.id || "",
				manufacturer: productDetails?.manufacturer?.id || "",
				location: productDetails?.location?.id || "",
				place: productDetails?.place?.id || "",
			})
		}
	}, [productDetails])

	return (
		<>
			{isLoading && <LoadingSpinner />}
			<BigText>Product details</BigText>
			<div className="w-full flex space-x-6">
				<div className="w-[40%]">
					<RenderIf isTrue={productDetails}>
						<TransitionBtoT>
							<div className="mb-4 p-6 rounded-xl overflow-hidden custom_shadow bg-gray-100 dark:bg-purple_5">
								<h3 className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Name:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{productDetails?.name}
									</span>
								</h3>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Sku:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{productDetails?.sku}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Price:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										&#8377; {productDetails?.price}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Description:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{productDetails?.description}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Quantity:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{productDetails?.quantity}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Unit:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{productDetails?.unit?.name}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Category:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{productDetails?.category?.name}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Sub category:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{productDetails?.subcategory?.name}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Manufacturer:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{productDetails?.manufacturer?.name}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 mb-2 font-bold">
									Location:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{productDetails?.location?.name}
									</span>
								</p>
								<p className="text-slate-500 dark:text-slate-400 font-bold">
									Place:{" "}
									<span className="text-slate-800 dark:text-slate-200 ml-2 font-normal">
										{productDetails?.place?.name}
									</span>
								</p>
							</div>
						</TransitionBtoT>
					</RenderIf>

					{/* Product Specifications */}
					<Specifications prodId={id} />
				</div>

				{/* Edit product */}
				<RenderIf isTrue={productDetails}>
					<section className="p-6 rounded-xl overflow-hidden custom_shadow bg-gray-100 dark:bg-purple_5 md:w-[60%]">
						<SubHeading>Update</SubHeading>
						<form onSubmit={updateProductHandler}>
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
									setProduct((prev) => ({
										...prev,
										description: e.target.value,
									}))
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
										setProduct((prev) => ({
											...prev,
											category: e.target.value,
										}))
									}
									label="Category"
									content={categories || []}
								/>
							</RenderIf>
							<RenderIf isTrue={subCategories && subCategories?.length > 0}>
								<SelectTag
									value={product.subcategory}
									onChange={(e) =>
										setProduct((prev) => ({
											...prev,
											subcategory: e.target.value,
										}))
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
										setProduct((prev) => ({
											...prev,
											location: e.target.value,
										}))
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
								<Button Icon={HiPlusCircle}>Update</Button>
							</div>
						</form>
					</section>
				</RenderIf>
			</div>
		</>
	)
}

export default ProductDetails
