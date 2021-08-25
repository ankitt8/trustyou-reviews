import React from "react";
import {ReviewsPieChart} from "components/ReviewsPieChart";
import {Loader} from "components/Loader";
import {PieChartWrapperData, ReviewsPieChartContainerProps} from "./interface";
import styles from "./styles.module.scss";
import {formatString} from "../../utility";
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
	return render();
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
	return <div className={styles.reviewsChartWrapper}>
		{
			Object.values(reviewsPieChartWrapperData)
			.map(({data, title}) =>
				<ReviewsPieChart key={title} data={data} title={formatString(title)}/>)
		}
	</div>
}
