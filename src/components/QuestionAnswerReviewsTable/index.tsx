import React, {useEffect, useState} from 'react';
import {GET_REVIEW_DISTRIBUTION} from "constants/urls";
import {ReviewsTypeAmount} from "./interface";
import {ReviewsModal} from "components/ReviewsModal";

export const QuestionAnswerReviewsTable = () => {
	const [reviewsTypeAmount, setReviewsTypeAmount] = useState<ReviewsTypeAmount[] | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
	const [selectedFilterType, setSelectedFilterType] = useState<string>('');
	const [selectedFilterValues, setSelectedFilterValues] = useState<string[]>([]);
	const createTableRows = (reviewsTypeAmount: ReviewsTypeAmount[]) => (
		reviewsTypeAmount.map(({type, amount,filterValues}) => (
		<tr key={type}>
			<td>{type}</td>
			<td onClick={() => handleAnswerClick(type, filterValues)}>{amount}</td>
		</tr>))
	)
	const handleAnswerClick = (filterType: string, filterValues: string[]) => {
		setIsModalOpen(true);
		setSelectedFilterType(filterType);
		setSelectedFilterValues(filterValues);
	}
	const getReviewDistribution = async (url: string) => {
		const res = await fetch(url);
		const {data} = await res.json();
		const reviewsTypeAmount = createReviewsTypeAmount(data);
		setReviewsTypeAmount(reviewsTypeAmount);
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
					reviewsTypeAmount ? createTableRows(reviewsTypeAmount) : <tr>
						<td>Loading...</td>
					</tr>
				}
				</tbody>
			</table>
			{isModalOpen && <ReviewsModal closeModal={() => setIsModalOpen(false)} filterType={selectedFilterType} filterValues={selectedFilterValues} />}
		</div>
	)
}

function createReviewsTypeAmount(data: Record<string, Record<string, number>>): ReviewsTypeAmount[] {
		return Object.entries(data).map(([type, obj]) => ({
			type,
			amount: Object.entries(obj)
			.filter(([key]) => key !== 'null')
			.reduce((totalReviews, curr) => totalReviews += curr[1], 0),
			filterValues: Object.keys(obj).filter(key => key !== 'null')
		}));
}