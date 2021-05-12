// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let secretDecorationType = vscode.window.createTextEditorDecorationType(getConfigObj());
let isinit = true;
export function activate(context: vscode.ExtensionContext) {
	vscode.window.onDidChangeActiveTextEditor(e => {
		let config = vscode.workspace.getConfiguration();
		let hide = config.get("hide-my-code.hide") as boolean;
		secretDecorationType =
			vscode.window.createTextEditorDecorationType(getConfigObj());
		let editor = vscode.window.activeTextEditor;
		if(editor) {
			FindRangesAndDecorate(editor, hide);
		}
	});


	// let config = vscode.workspace.getConfiguration();
	// let hide = config.get("hide-my-code.hide") as boolean;
	// let editor = vscode.window.activeTextEditor;
	// if (editor) {
	// 	FindRangesAndDecorate(editor, hide);
	// }

	let disposable = vscode.commands.registerCommand('hide-my-code.HideUnhidecode', async () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			let config = vscode.workspace.getConfiguration();
			let hide = !config.get("hide-my-code.hide") as boolean;
			// if(isinit && hide) {
			// 	isinit = false;
			// 	hide = true;
			// }
			await config.update("hide-my-code.hide", hide, vscode.ConfigurationTarget.Global);
			FindRangesAndDecorate(editor, hide);
		}
	});

	context.subscriptions.push(disposable);
}
function getConfigObj() {
	let config = vscode.workspace.getConfiguration();
	let bgColor = config.get("hide-my-code.bgColor") as string;
	let style = config.get("hide-my-code.style") as object;
	return {
		...style,
		backgroundColor: bgColor||'green',
		color: bgColor||'green',
		after: {
			"contentText": "代码隐藏中，请勿删除！",
			"color": "red",
			"border": "1px solid red"
		}
	}
}
function FindRangesAndDecorate(editor: vscode.TextEditor, hide: boolean) {

	if (hide) {
		const range: vscode.Range[] = []

		let config = vscode.workspace.getConfiguration();
		let hideList = config.get("hide-my-code.hideList");
		fillRange(editor,hideList,range)

		setDecoration(editor, range);
	}
	else {
		editor.setDecorations(secretDecorationType, []);
	}
}
function type(params:any) {
	return Object.prototype.toString.call(params).slice(8,-1).toLowerCase()

}

function fillRange(editor: vscode.TextEditor,hideList:any,range:vscode.Range[]) {
	if(type(hideList) === 'string'){
		const text =  editor.document.getText();
		let hideListReg = new RegExp(hideList,'ig');
		let arr:any[] = text.match(hideListReg) || [];
		arr.map(v => {
			const  i = text.indexOf(v);
			const start = editor.document.positionAt(text.indexOf(v));
			const end = editor.document.positionAt(i +v.length);
			range.push(new vscode.Range(start,end));
		})
	}else if(type(hideList) === 'array'){
		hideList.map((item:any) => {
			fillRange(editor,item,range)
		})
	}
}

function setDecoration(editor: vscode.TextEditor, ranges: vscode.Range[]) {
	editor.setDecorations(secretDecorationType, ranges);
}
// this method is called when your extension is deactivated
export function deactivate() { }
