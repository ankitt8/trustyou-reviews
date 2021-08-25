export interface StateHomePageData {
	loaded: Boolean;
	data: Record<string, Record<string, number>> | null;
	error: Boolean;
}