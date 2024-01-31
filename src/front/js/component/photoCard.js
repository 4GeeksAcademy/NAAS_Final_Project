import React, { useContext } from "react";
import { testData3 } from "./testData";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const PhotoCard = (props) => {
	const { store, actions } = useContext(Context);

	const handleFavoriteClick = () => {
		actions.addFavoritePhoto({
		  photo: props.photo,
		  url: props.url,
		  name: props.name,
		  index: props.index,
		});
	  };
	  
	  
	  

	return (
		<div className="mx-3 bg-gra">
			<div className="card mb-2" style={{ width: "18rem" }}>
				<img src={testData3[2].fotoUrl} className="card-img-top" alt="Photo" />

				<div className="card-body color-back px-4">
					<h4 className="color-text">{props.photo}</h4>

					<div className="d-flex align-items-center">
						<img
							style={{ width: "20%" }}
							className="h-25 rounded-circle"
							src={testData3[1].fotoUrl}
							alt="Avatar"
						/>
						<h5 className="card-title p-3 color-text ">{props.name}</h5>
					</div>

					<div className="buttons d-flex justify-content-between mt-3">
						{/* Botón de Like */}
						<button
							onClick={() => {
								// Lógica para manejar el like
							}}
							type="button"
							className="btn p-1 btn-outline-success border-2"
						>
							<i className="far fa-thumbs-up"></i> Like
						</button>

						{/* Botón de Favorito */}
						<button
							onClick={handleFavoriteClick}
							type="button"
							className={`btn p-1 border-2 ${store.favorites.some(
								(fav) => fav.index === props.index
							)
									? "btn-danger" // Cambia a color danger si está en favoritos
									: "btn-outline-success" // De lo contrario, color verde
								}`}
						>
							<i className="far fa-heart"></i> Favorito
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
		</div >
	);
};

PhotoCard.propTypes = {
	photo: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	// Elimina "index" de las PropTypes ya que no lo necesitas aquí
	likes: PropTypes.number.isRequired,
	favorites: PropTypes.number.isRequired,
};

PhotoCard.defaultProps = {
	likes: 0,
	favorites: 0,
};