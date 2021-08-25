import React from "react";
import {ReviewsPieChart} from "components/ReviewsPieChart";
import {Loader} from "components/Loader";
import {PieChartWrapperData, ReviewsPieChartContainerProps} from "./interface";
export const ReviewsPieChartContainer = ({
	data,
	error
}: ReviewsPieChartContainerProps) => {
	const render = () => {
		if(error) {
			return <p>Failed to load data</p>
		} else if(data) {
			 return <ReviewsPieChartWrapper reviewsPieChartWrapperData={createPieChartWrapperData(data)}/>
		} else {
			return <Loader />
		}
	}
	return <div>
		{render()}
	</div>

}
function createPieChartWrapperData(data: Record<string, Record<string, number>>): PieChartWrapperData {
	const result: PieChartWrapperData = {};
	for(const filterType in data) {
		const pieChartData = Object.entries(data[filterType])
		.filter(([key]) => key !== 'null')
		.reduce((acc: [string, number][], [filterValue,amount]) => acc = [...acc, [filterValue, amount]], []);
		result[filterType] = {
			data: pieChartData,
			title: filterType
		}
	}
	return result;
}

const ReviewsPieChartWrapper = ({reviewsPieChartWrapperData}: {reviewsPieChartWrapperData:PieChartWrapperData})  => {
	return <div style={{display: 'flex', width: '80vw', flexWrap: 'wrap'}}>
		{
			Object.values(reviewsPieChartWrapperData)
			.map(({data, title}) =>
				<ReviewsPieChart key={title} data={data} title={title}/>)
		}
	</div>
}
