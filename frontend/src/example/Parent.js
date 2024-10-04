import { useParentContext } from "../context/ParentContext";
import ChildOne from "./Child_one";
import ChildTwo from "./Child_two";
const Parent = () => {

	const { parent } = useParentContext();

	console.log("parent----", parent)

	return (
		<>
			<h4>I am the parent</h4>
			<p>Child One state <strong>: name:  type:</strong></p>
			<div style={{ width: "60%", margin: "0 auto", border: "1px solid black" }}>
				<ChildOne />
				<ChildTwo />
			</div>
		</>
	)
}

export default Parent