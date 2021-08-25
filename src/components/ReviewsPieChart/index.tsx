import React from "react";
import Chart from "react-google-charts";
import {ReviewsPieChartProps} from "./interface";
export const ReviewsPieChart = ({
	data,
	title
}: ReviewsPieChartProps) => {
	return <Chart
		width={'500px'}
		height={'300px'}
		chartType="PieChart"
		loader={<div>Loading Chart</div>}
		data={[
			['FilterValue', 'Amount of reviews'],
			...data
		]}
		options={{
			title: title,
		}}
	/>
}
