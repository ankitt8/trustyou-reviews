import {DataToRender} from "../ReviewsModal/interface";
import React from "react";

export const ReviewsList = (dataToRender: DataToRender[]) => {
	return (
		<div style={{overflow: 'scroll', height: '80vh'}}>
			{
				dataToRender.map((data) => (
					<div key={data.filterValue}>
						<h3>{`
					For ${data.filterType} we have ${data.reviews.length} reviews where ${data.filterType} is 
						${data.filterValue}
					`}
						</h3>
						<ul>
							{
								data.reviews.map((review) => (
									<div key={review.creation_date} style={{border: '1px solid black'}}>
										<li>{review.review_title ? review.review_title: 'title not found'}</li>
										<li>{review.guest_name ? review.guest_name : 'guest name not found'}</li>
										<li>{review.creation_date ? review.creation_date : 'creation date not found'}</li>
									</div>
								))
							}
						</ul>
					</div>
				))
			}
		</div>
	)


}