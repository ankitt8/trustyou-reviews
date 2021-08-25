import {ReviewsPieChartProps} from "components/ReviewsPieChart/interface";
export type PieChartWrapperData = Record<string, ReviewsPieChartProps>;
export interface StatePieChartWrapperData {
	isLoaded: Boolean,
	data: PieChartWrapperData;
}

export interface ReviewsPieChartContainerProps {
	data: Record<string, Record<string,number>> | null;
	error: Boolean;
}
