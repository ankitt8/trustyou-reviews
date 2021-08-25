import React from "react";
import Chart from "react-google-charts";
import {ReviewsPieChartProps} from "./interface";
import styles from './styles.module.scss';
export const ReviewsPieChart = ({
	data,
	title
}: ReviewsPieChartProps) => {
	return <Chart
		width={'550px'}
		height={'300px'}
		chartType="PieChart"
		loader={<div className={styles.loader}>Loading Chart</div>}
		data={[
			['FilterValue', 'Amount of reviews'],
			...data
		]}
		options={{
			title: title,
		}}
	/>
}
