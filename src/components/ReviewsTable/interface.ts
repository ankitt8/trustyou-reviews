export interface ReviewsTypeAmount {
	type: string;
	amount: number;
	filterValues: string[]
}

export interface ReviewsTableProps {
	data: Record<string, Record<string, number>> | null;
	error: Boolean;
}