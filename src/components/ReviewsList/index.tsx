import {DataToRender} from "../ReviewsModal/interface";
import React from "react";
import styles from "./styles.module.scss";
import {formatString} from "../../utility";
export const ReviewsList = (dataToRender: DataToRender[]) => {
	return (
		<div className={styles.reviewsListWrapper}>
			{
				dataToRender.map((data) => (
					<div key={data.filterValue}>
						<h3>
							For {formatString(data.filterType)} we have
							<span> {data.reviews.length} </span>
							reviews where {data.filterType} is
							<span> {formatString(data.filterValue)}</span>
						</h3>
						<table>
							<thead>
								<tr>
									<th>Title</th>
									<th>Guest Name</th>
									<th>Creation Time</th>
								</tr>
								{
									data.reviews.map((review) => (
										<tr key={review.creation_date} className={styles.listItem}>
											<td>{review.review_title ? review.review_title: 'title not found'}</td>
											<td>{review.guest_name ? review.guest_name : 'guest name not found'}</td>
											<td>{review.creation_date ? new Date(review.creation_date).toISOString() : 'creation date not found'}</td>
										</tr>
									))
								}
							</thead>
						</table>
					</div>
				))
			}
		</div>
	)


}