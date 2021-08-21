import React, {useEffect, useState} from 'react';
import {GET_REVIEW_DISTRIBUTION} from "../constants/urls";
import {ReviewsTypeAmount} from "./interface";

export const QuestionAnswerReviewsTable = () => {
	const [reviewsTypeAmount, setReviewsTypeAmount] = useState<ReviewsTypeAmount[] | null>(null);
	const createTableRows = (reviewsTypeAmount: ReviewsTypeAmount[]) => (
		reviewsTypeAmount.map(({type, amount}) => (<tr>
			<td>{type}</td>
			<td>{amount}</td>
		</tr>))
	)
	const getReviewDistribution = async (url: string) => {
		const res = await fetch(url);
		const {data} = await res.json();
		const reviewsTypeAmount = createReviewsTypeAmount(data);
		setReviewsTypeAmount(reviewsTypeAmount);
		console.log(data);
	}
	useEffect(() => {
		try {
			getReviewDistribution(GET_REVIEW_DISTRIBUTION);
		} catch {
			console.error('Failed to load data');
		}
	}, []);

	return (
		<div className='wrapper'>
			<table>
				<thead>
					<tr>
						<th>Type</th>
						<th>Amount of Reviews</th>
					</tr>
				</thead>
				<tbody>
				{
					reviewsTypeAmount ? createTableRows(reviewsTypeAmount) : <p>Loading ...</p>
				}
				</tbody>
			</table>
		</div>
	)
}

function createReviewsTypeAmount(data: Record<string, Record<string, number>>): ReviewsTypeAmount[] {
		return Object.entries(data).map(([type, obj]) => ({
			type,
			amount: Object.entries(obj)
			.filter(([key]) => key !== 'null')
			.reduce((totalReviews, curr) => totalReviews += curr[1], 0)
		}));
}