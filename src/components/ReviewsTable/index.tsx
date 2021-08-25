import React, {useState} from 'react';
import {ReviewsTableProps, ReviewsTypeAmount} from "./interface";
import {ReviewsModal} from "components/ReviewsModal";
import {formatString} from "utility";
import styles from "./styles.module.scss";
export const ReviewsTable = ({
	data,
	error
}: ReviewsTableProps) => {
	const [isModalOpen, setIsModalOpen] = useState<Boolean>(false);
	const [selectedFilterType, setSelectedFilterType] = useState<string>('');
	const [selectedFilterValues, setSelectedFilterValues] = useState<string[]>([]);
	const createTableRows = (data: Record<string, Record<string, number>>) => {
		const reviewsTypeAmount: ReviewsTypeAmount[] = createReviewsTypeAmount(data);
		return reviewsTypeAmount.map(({type, amount, filterValues}) => (
			<tr key={type}>
				<td>{formatString(type)}</td>
				<td>
					{amount}
					<span className={styles.eye} onClick={() => handleAnswerClick(type, filterValues)}>    &#128065;</span></td>
			</tr>));
	}
	const handleAnswerClick = (filterType: string, filterValues: string[]) => {
		setIsModalOpen(true);
		setSelectedFilterType(filterType);
		setSelectedFilterValues(filterValues);
	}
	return (
		<div className={styles.reviewsTableWrapper}>
			<table>
				<thead>
					<tr>
						<th>Type</th>
						<th>Amount of Reviews</th>
					</tr>
				</thead>
				<tbody>
				{
					error ? <td>Failed to load data</td> :

							data ? createTableRows(data) :
								<tr>
									<td>Loading...</td>
									<td>Loading...</td>
								</tr>

				}
				</tbody>
			</table>
			{isModalOpen && <ReviewsModal
				closeModal={() => setIsModalOpen(false)}
				filterType={selectedFilterType}
				filterValues={selectedFilterValues}
			/>}
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