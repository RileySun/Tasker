import { h, Component, render} from 'https://unpkg.com/preact@latest?module';
import {useState, useCallback} from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';

import Task from "./Components/Task.js";
import Form from "./Components/Form.js";
import FilterButton from "./Components/FilterButton.js";
import Menu from "./Components/Menu.js";

const html = htm.bind(h);

//CONSTs
const REALDATA = [
	{id:"Group-0", name:"Group", active:true, contents:[
		{id:"Task-0", name:"Task", completed:true},
	]},
];
const FILTER_MAP = {
	All: () => true,
	Active: task => !task.completed,
	Complete: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

//Globals
window.currentGroup = 0;
window.groups = REALDATA;

function App(props) {
	//Mobile Menu (Closes Menu When Clicking Main Content Screen)
	const isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
	function mobileMenuClose() {
		const toggle = document.getElementById('Menu-Toggle');
		if (toggle.checked === false) {
			toggle.click();	
		}
	}
	const contentMobileClick = (isMobile) ? mobileMenuClose : '';
	
	//State Intialization
	const [,setState] = useState();
	const [groups, setGroups] = useState(props.data);
	const [tasks, setTasks] = useState(groups[window.currentGroup].contents);
	const [filter, setFilter] = useState('All');
	
	//Group Stuff
	function selectGroup(id) {
		const newGroupList = groups.map(group => {
			if (id === group.id) {
				group.active = true;
				window.currentGroup = groups.indexOf(group);
				return group;
			}
			else {
				group.active = false;
				return group;
			}
		});
		setGroups(newGroupList);
		setTasks(groups[window.currentGroup].contents);
	}
	function addGroup() {
		const newGroupName = prompt('Task Group Name');
		const random = (Math.random().toString(36)+'00000000000000000').slice(2, 10); //Max Number is 18 current is 10 (number of chars + 2)
		const groupID = 'Group-'+random;
		const newGroup = {id:groupID, name:newGroupName, active:false, contents:[]};
		const newGroupList = groups.map(group => {
			return group;
		});
		newGroupList.push(newGroup);
		setGroups(newGroupList);
		window.groups = newGroupList;
	}
	function deleteGroup(id) {
		if (groups.length > 1) {
			const remainingGroups = groups.filter(groups => id !== groups.id);
			window.currentGroup = 0;
			setGroups(remainingGroups);
		}
		else {
			alert('Must have at least 1 task group.');
		}
	}
	
	//Task Stuff
	function addTask(name) {
		const random = (Math.random().toString(36)+'00000000000000000').slice(2, 10); //Max Number is 18 current is 10 (number of chars + 2)
		const newTask = {id:'id-'+random, name:name, completed:false};
		window.groups[window.currentGroup].contents.push(newTask);
		setState([]);
	}
	function editTask(id, newName) {
		const editedTaskList = tasks.map(task => {
			if (id === task.id) {
				task.name = newName;
				return task;
			}
			return task;
		});
		window.groups[window.currentGroup].contents = editedTaskList;
		setTasks(editedTaskList);
		setState([]);
	}
	function deleteTask(id) {
		if (tasks.length > 1) {
			const remainingTasks = tasks.filter(task => id !== task.id);
			window.groups[window.currentGroup].contents = remainingTasks;
			setTasks(remainingTasks);
		}
		else {
			alert('Must have at least one task');
		}
	}
	function toggleTaskCompleted(id) {
		const updatedTasks = tasks.map(task => {
			if (id === task.id) {
				return {...task, completed: !task.completed};
			}
			return task;
		});
		setTasks(updatedTasks);
	}
	
	//Import & Export
	function loadImportDialog() {
		document.getElementById('IO-Import-Hidden').click();
	}
	function importData(e) {
		e.preventDefault;
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.readAsText(file, "UTF-8");
			reader.onload = (evt) => {
				window.groups = JSON.parse(evt.target.result); 
				setGroups(window.groups);
				alert('Task Groups Loaded');
			}
			reader.onerror = (evt) => {alert('Invalid Data');}
		}
	}
	function exportData() {
		const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(window.groups));
		const exportButton = document.getElementById('IO-Export-Hidden');
		exportButton.setAttribute("href", data);
		exportButton.setAttribute("download", "Tasker-Data.json");
		exportButton.click();
	}
	
	//Component Creation
	const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
		html`<${Task} id=${task.id} name=${task.name} completed=${task.completed} key=${task.id} toggleTaskCompleted=${toggleTaskCompleted} deleteTask=${deleteTask} editTask=${editTask} />`
	));
	const filterList = FILTER_NAMES.map(name => (
 		html`<${FilterButton} key=${name} name=${name} isPressed=${name === filter} setFilter=${setFilter}/>`
	));
	const menuContent = html`
		<${Menu} groups=${groups} selectGroup=${selectGroup} addGroup=${addGroup} deleteGroup=${deleteGroup} loadImportDialog=${loadImportDialog} exportData=${exportData} importData=${importData} />
	`;

	return html`
		${menuContent}
		<div id="Content" class="Content" aria-label="Content" tabindex="0" onClick=${contentMobileClick}>
			<${Form} addTask=${addTask}/>
			<div class="Filters">${filterList}</div>
			<div class="Task-List">${taskList}</div>
		</div>
		<div class="Footer">Tasker © 2021</div>	
	`;
}

render(html`<${App} name="Content" data=${window.groups} />`, document.getElementById('Tasker'));