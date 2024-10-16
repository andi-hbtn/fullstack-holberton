import { useCategoryContext } from "../context/CategoryContext";

const Category = () => {

	const { categories } = useCategoryContext();

	console.log("categories------", categories);

	return (
		<>
			{
				categories.map((el, index) => {
					return (
						<ul key={index}>
							<li>{el.name}</li>
						</ul>
					)
				})
			}
		</>
	)
}


export default Category;