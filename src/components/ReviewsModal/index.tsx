import React, {useEffect, useState, useCallback} from 'react';
import Modal from 'react-modal';
import {Loader} from "../Loader";
import {GET_REVIEWS} from "constants/urls";
import {DataToRender, ReviewsModalProps, ReviewToDisplay} from "./interface";
import { ReviewsList } from 'components/ReviewsList';
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		maxWidth: '95vw',
		maxHeight: '90vh'
	},
};
export const ReviewsModal = ({
		closeModal,
		filterType,
		filterValues
	}: ReviewsModalProps
) => {

	const [isLoaded, setIsLoaded] = useState<Boolean>(true);
	const [dataToRender, setDataToRender] = useState<DataToRender[]>([]);
	const getReviews = useCallback(
		async () => {
			const arr = await Promise.allSettled(filterValues.map((filterValue) => fetchReview(filterType, filterValue)));
			const dataToRender: DataToRender[] = filterValues.map((filterValue, index) => ({
				filterType,
				filterValue,
				//@ts-ignore
				reviews: arr[index]?.value.map((review: ReviewToDisplay) => ({
					review_title: review.review_title,
					guest_name: review.guest_name,
					creation_date: review.creation_date,
				})),
			}));
			setDataToRender(dataToRender);
		}, [filterType, filterValues]
	);
	useEffect(() => {
		getReviews();
		setIsLoaded(true);
	}, [filterType, filterValues, getReviews]);



	// @ts-ignore
	return (
			<Modal
				isOpen={true}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				{
					isLoaded ?
						ReviewsList(dataToRender)
						: <Loader />
				}
			</Modal>
	);
}

async function fetchReview(filterType: string, filterValue: string) {
	const res = await fetch(`${GET_REVIEWS}?filter_type=${filterType}&filter_value=${filterValue}`);
	const reviews = await res.json();
	return reviews.data;
}