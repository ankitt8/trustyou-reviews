import React, {useCallback, useEffect, useState} from 'react';
import {ReviewsPieChartContainer} from "container/ReviewsPieChart";
import { ReviewsTable} from "components/ReviewsTable";
import {GET_REVIEW_DISTRIBUTION} from "constants/urls";
import {StateHomePageData} from "./interface";
export const HomePage = () => {
	const [homePageState, setHomePageState] = useState<StateHomePageData>({
		loaded: false,
		data: null,
		error: false
	});
	const getReviewDistribution = useCallback(
		async (url: string) => {
			const res = await fetch(url);
			const {data} = await res.json();
			setHomePageState({
				loaded: true,
				data,
				error: false
			});
		}, []
	)
	useEffect(() => {
		try {
			getReviewDistribution(GET_REVIEW_DISTRIBUTION);
		} catch {
			setHomePageState({
				loaded: true,
				data: null,
				error: true
			});
		}
	}, [getReviewDistribution]);
	return (
		<>
			<ReviewsTable data={homePageState.data} error={homePageState.error} />
			<ReviewsPieChartContainer data={homePageState.data} error={homePageState.error}/>
		</>

	)
}