import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import banner from "../../img/banner.png";
import avatar from "../../img/avatar.png";

export const PhotoCard = (props) => {
	const { store, actions } = useContext(Context);

	return (
		<div className="mx-3 bg-gra">
			<div className="card mb-2" style={{ width: "18rem" }}>
				<img src={banner} className="card-img-top" alt="Photo" />

				<div className="card-body color-back px-4">
					<h4 className="color-text">{props.photo}</h4>

					<div className="d-flex align-items-center">
						<img style={{ width: "20%" }} className="h-25 rounded-circle" src={avatar} alt="Avatar" />
						<h5 className="card-title p-3 color-text ">{props.name}</h5>
					</div>

					<div className="buttons d-flex justify-content-between mt-3">
						{/* Botón de Like */}
						<button
							onClick={() => {
								// Lógica para manejar el like
							}}
							type="button"
							className="btn p-1 btn-outline-success border-2">
							<i className="far fa-thumbs-up"></i> Like
						</button>

						{/* Botón de Favorito */}
						<button
							onClick={() => {
								// Lógica para manejar los favoritos
							}}
							type="button"
							className={`btn p-1 btn-outline-success border-2 ${store.favorites.includes(props.name) ? "active" : ""}`}>
							<i className="far fa-heart"></i> Favorite
						</button>
					</div>
                    <div className="d-flex justify-content-between mt-3 color-text">
					{/* Contador de Likes */}
					<p>Likes: {props.likes}</p>

					{/* Contador de Favoritos */}
					<p>Favorites: {props.favorites}</p>
                    </div>        

				</div>
			</div>
		</div>
	);
};

PhotoCard.propTypes = {
    photo: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	likes: PropTypes.number.isRequired,
	favorites: PropTypes.number.isRequired,
};

PhotoCard.defaultProps = {
	likes: 0,
	favorites: 0,
};