export function formatString(str: string): string {
	return str.split('_').map(str => str.charAt(0).toUpperCase() + str.substr(1)).join(' ');
}