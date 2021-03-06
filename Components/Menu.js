import { h, Component, render } from 'https://unpkg.com/preact@latest?module';
import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

import Group from "./Group.js";

export default function Menu(props) {
	const groupList = props.groups.map(group => (
		html`<${Group} id=${group.id} name=${group.name} active=${group.active} selectGroup=${props.selectGroup} deleteGroup=${props.deleteGroup} />`
	));	
	
	return html`
		<div class="Menu" role="navigation" aria-label="Menu">
			<div class="Menu-Toggle-Container">
				<input type="checkbox" autocomplete="off" id="Menu-Toggle" class="Menu-Toggle-Input" checked="" />
				<label for="Menu-Toggle" class="Menu-Toggle" ></label>
				<div class="Menu-Slide" aria-label="Slide Out Menu">
					<div class="Menu-Slide-Logo">
						<h1 class="Menu-Slide-Logo-Text">Tasker</h1>
						<IMG class="Menu-Slide-Logo-IMG" src="Assets/Logo.svg" alt="Website Logo" />
					</div>
					<div class="Task-Groups-Container" aria-label="Task Groups">
						<h2 class="Task-Groups-Title">Task Groups</h2>
						<div class="Task-Groups-Divider"></div>
						<div id="Groups" class="Task-Groups">
							<IMG class="Task-Groups-Add" src="Assets/Add.svg" onClick="${props.addGroup}" />
							${groupList}
						</div>
					</div>
				</div>
			</div>
			<div class="Menu-IO" id="IO">
				<IMG id="IO-Import" class="Menu-IO-Icon" title="Import" src="Assets/Import.svg" onClick="${props.loadImportDialog}" /><!--
			 --><IMG id="IO-Export" class="Menu-IO-Icon" title="Export" src="Assets/Export.svg" onClick="${props.exportData}" />
				<a id="IO-Export-Hidden" class="Hidden" href=""></a>
				<form class="Hidden"><input id="IO-Import-Hidden" type="file" onchange="${props.importData}" /></form>
			</div>
		</div>
	`;
}