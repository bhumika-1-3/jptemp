import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import {
	RenderIf,
	SectionHeader,
	Button,
	TransitionBtoT,
	NoteText,
} from "../../../../components"
import ProductTable from "./ProductTable"
import { fetchProducts } from "../../../../store/slices/inventory/inventorySlice"
import { HiPlusCircle } from "react-icons/hi"
const Products = () => {
	const { products } = useSelector((state) => state.inventory)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const navigateToDetails = (id) => {
		navigate(`product-details/${id}`)
	}

	useEffect(() => {
		dispatch(fetchProducts())
	}, [dispatch])
	return (
		<div>
			<SectionHeader text="All the products">
				<Button Icon={HiPlusCircle} onClick={() => navigate("add-product")}>
					Add
				</Button>
			</SectionHeader>
			<RenderIf isTrue={products && products?.length > 0}>
				<TransitionBtoT>
					<NoteText>Click on product name to view details</NoteText>
					<ProductTable
						content={products}
						rowsPerPage={10}
						onClick={navigateToDetails}
					/>
				</TransitionBtoT>
			</RenderIf>
		</div>
	)
}

export default Products
