import { h, Component, render } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

export default function Group(props) {
	const isActive = (props.active) ? 'Task-Group-Selected' : '';
	
	return html`
		<div id=${props.id} class="Task-Group ${isActive}">
			<div class="Task-Group-Name" onClick=${() => props.selectGroup(props.id)}>${props.name}</div>
			<IMG class="Task-Group-Delete" src="Assets/Delete.svg" onClick=${() => props.deleteGroup(props.id)} />
		</div>
	`;
}