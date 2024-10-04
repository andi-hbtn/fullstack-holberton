import { useState } from "react"

const ChildTwo = () => {
	const [childTwo, setchildTwo] = useState({ position: "backend", framework: "Node" })
	return (
		<>
			<p>Child Two state <strong>: position: {childTwo.position} framework:{childTwo.framework}</strong></p>
		</>
	)
}

export default ChildTwo