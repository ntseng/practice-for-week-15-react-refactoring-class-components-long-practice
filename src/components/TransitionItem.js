import { useRef } from "react"
import { CSSTransition } from "react-transition-group"

export default function TransitionItem({ result, selectName }) {
	const nodeRef = useRef();
	return (
		<CSSTransition
			nodeRef={nodeRef}
			key={result}
			classNames="result"
			timeout={{ enter: 500, exit: 300 }}
		>
			<li ref={nodeRef} className="nameLi" onClick={selectName}>
				{result}
			</li>
		</CSSTransition>
	)
}
