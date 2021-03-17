import { h, Component, render } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

export default function FilterButton(props) {
	return html`
		<button type="button" className="Filter-Button" aria-pressed=${props.isPressed} onClick=${() => props.setFilter(props.name)} title="Filter ${props.name} Tasks">
			<span className="Hidden">Show</span>
			<span>${props.name}</span>
			<span className="Hidden">tasks</span>
		</button>
	`;
}