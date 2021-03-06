import {h, Component, render} from 'https://unpkg.com/preact@latest?module';
import {useState} from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

export default function Form(props) {
	const [name, setName] = useState('');
	
	function handleSubmit(e) {
		e.preventDefault();
		if (name === '') {
			alert('Task is empty');
		}
		else {
			props.addTask(name);
			setName('');
		}
	}
	function handleChange(e) {
		setName(e.target.value);
	}
	
	return html`
		<form class="Add-Task-Form" onSubmit=${handleSubmit}>
			<label htmlFor="New-Task-Input" className="Add-Task-Label">Add New Task</label>
			<input type="text" id="New-Task-Input" className="Add-Task-Input" name="text" autoComplete="off" value="${name}" onChange=${handleChange} />
			<button type="submit" className="Add-Task-Button" title="Add Task">+</button>
		</form>
	`;
}