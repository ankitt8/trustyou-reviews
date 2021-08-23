export interface ReviewToDisplay {
	review_title: string;
	guest_name: string;
	creation_date: string;
}

export interface DataToRender {
	filterType: string;
	filterValue: string;
	reviews: ReviewToDisplay[];
}