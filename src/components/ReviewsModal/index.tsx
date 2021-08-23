import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import {Loader} from "../Loader";
import {GET_REVIEWS} from "constants/urls";
import {DataToRender, ReviewToDisplay} from "./interface";
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};
export const ReviewsModal = ({filterType, filterValues}: {filterType: string, filterValues: string[]}) => {
	const [modalIsOpen, setIsOpen] = React.useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}
	const [isLoaded, setIsLoaded] = useState<Boolean>(true);
	const [dataToRender, setDataToRender] = useState<DataToRender[]>([]);
	useEffect(() => {
		getReviews();
		setIsLoaded(true);
	}, [filterType, filterValues]);
	const getReviews = async () => {
		const arr = await Promise.allSettled(filterValues.map((filterValue) => fetchReview(filterType, filterValue)));
		console.log(arr);
		const dataToRender: DataToRender[] = filterValues.map((filterValue, index) => ({
			filterType,
			filterValue,
			//@ts-ignore
			reviews: arr[index]?.value.map((review: ReviewToDisplay) => ({
				title: review.review_title,
				author: review.guest_name,
				creationTime: review.creation_date,
			})),
		}));
		setDataToRender(dataToRender);
	}
	const renderReviewsList = (dataToRender: DataToRender[]) => {
		return dataToRender.map((data) => (
			<div>
				<h3>{`
					For ${data.filterType} we have ${data.reviews.length} reviews where ${data.filterType} is 
						${data.filterValue}
					`}
				</h3>
				<ul>
					{
						data.reviews.map((review) => (
							<>
								<li>{review.review_title}</li>
								<li>{review.guest_name}</li>
								<li>{review.creation_date}</li>
							</>
						))
					}
				</ul>
			</div>

		))
	}
	// @ts-ignore
	return (
		<Modal
			isOpen={modalIsOpen}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel="Example Modal"
		>
			{
				isLoaded ?
					renderReviewsList(dataToRender)
				 : <Loader />
			}
		</Modal>
	)
}
async function fetchReview(filterType: string, filterValue: string) {
	const res = await fetch(`${GET_REVIEWS}?filter_type=${filterType}&filter_value=${filterValue}`);
	const reviews = await res.json();
	console.log(filterType, filterValue)
	console.log(reviews.data);
	return reviews.data;
}