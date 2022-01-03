import React, { useEffect, useRef, useState } from 'react';
import { TransitionGroup } from 'react-transition-group';
import TransitionItem from './TransitionItem';

function AutoComplete({ names }) {
	const [inputVal, setInputVal] = useState("");
	const [showList, setShowList] = useState(false);
	const inputRef = useRef();

	useEffect(() => {
		if (showList) {
			document.addEventListener('click', handleOutsideClick);
		}
		return () => {
			console.log("Cleaning up event listener from Autocomplete!");
			document.removeEventListener('click', handleOutsideClick);
		}
	}, [showList])

	let handleInput = (e) => {
		setInputVal(e.target.value);
	}

	let selectName = ({ target: { innerText: name } }) => {
		setInputVal(name);
		setShowList(false);
	}

	// Set focus to input field if user clicks anywhere inside the Autocomplete
	// section (unless they have selected a name from the dropdown list)
	let handleAutocompleteSectionClick = ({ target }) => {
		if (!target.classList.contains("nameLi")) {
			inputRef.current.focus();
		}
	}

	let handleOutsideClick = () => {
		// Leave dropdown visible as long as input is focused
		if (document.activeElement === inputRef.current) return;
		else setShowList(false);
	}

	let matches = () => {
		const inputLength = inputVal.length;
		const matches = [];

		if (inputLength === 0) return names;

		names.forEach(name => {
			const nameSegment = name.slice(0, inputLength);
			if (nameSegment.toLowerCase() === inputVal.toLowerCase()) {
				matches.push(name);
			}
		});

		if (matches.length === 0) matches.push('No matches');

		return matches;
	}

	const results = matches().map((result) => {
		return (<TransitionItem key={result} result={result} selectName={selectName} />)
	});

	return (
		<section
			className="autocomplete-section"
			onClick={handleAutocompleteSectionClick}
		>
			<h1>Autocomplete</h1>
			<div className="auto">
				<input
					placeholder="Search..."
					ref={inputRef}
					onChange={handleInput}
					value={inputVal}
					onFocus={() => setShowList(true)}
				/>
				{showList && (
					<ul className="auto-dropdown">
						<TransitionGroup>
							{results}
						</TransitionGroup>
					</ul>
				)}
			</div>
		</section>
	);
}

export default AutoComplete;
