import { createContext, useContext, useState } from 'react';
const ParentContext = createContext({});

const ParentProvider = (props) => {

	const [parent, setParent] = useState({ name: "parent,", type: "javascript", developer: "Facebook" })

	const values = { parent };
	return (
		<ParentContext.Provider value={values}>
			{props.children}
		</ParentContext.Provider>
	)
}

const useParentContext = () => { return useContext(ParentContext) }
export { ParentProvider, useParentContext }

