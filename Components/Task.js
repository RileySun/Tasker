import { h, Component, render } from 'https://unpkg.com/preact@latest?module';
import {useState, useEffect, useRef} from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

export default function Task(props) {
	const [isEditing, setEditing] = useState(false);
	const [newName, setNewName] = useState('');
	const editFieldRef = useRef(null);
	const editButtonRef = useRef(null);
	
	function handleChange(e) {
		setNewName(e.target.value);
	}
	function handleSubmit(e) {
		const submitName = (newName !== '') ? newName : props.name;
		e.preventDefault();
		props.editTask(props.id, submitName);
		setNewName("");
		setEditing(false);
	}
	
	const editingTemplate = html`
		<form id="Edit-Task-Form" onSubmit=${handleSubmit}>
			<div class="Task-Container">
				<div class="Task-Check">
					<input class="Task-Text-Input" id=${props.id} type="text" onChange=${handleChange} ref=${editFieldRef} value=${props.name} />
				</div>
				<div class="Task-Controls">
					<IMG class="Task-Control" src="Assets/Cancel.svg" title="Edit Task" onClick=${() => setEditing(false)} />
					<IMG class="Task-Control" src="Assets/Save.svg" title="Delete Task" onClick=${(e) => {setEditing(false);handleSubmit(e);}} />
				</div>
			</div>
		</form>
	`;
//
/*
		
			
		
*/
	
	const viewTemplate = html`
		<div class="Task-Container">
			<div class="Task-Check">
				<input class="Task-Check-Input" id=${props.id} type="checkbox" defaultChecked=${props.completed} onChange=${() => props.toggleTaskCompleted(props.id)} />
				<label class="Task-Check-Label" for=${props.id}>${props.name}</label>
			</div>
			<div class="Task-Controls">
				<IMG class="Task-Control" src="Assets/Edit.svg" title="Edit Task" onClick=${() => setEditing(true)} ref=${editButtonRef} />
				<IMG class="Task-Control" src="Assets/Delete_White.svg" title="Delete Task" onClick=${() => props.deleteTask(props.id)} />
			</div>
		</div>
	`;
	
	useEffect(() => {
		if (isEditing) {
			editFieldRef.current.focus();
		}
		else {
			editButtonRef.current.focus();
		}
	}, [isEditing]);
	
	return html`${isEditing ? editingTemplate : viewTemplate}`;
}