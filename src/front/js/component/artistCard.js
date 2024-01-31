import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const ArtistCard = (props) => {
	const { store, actions } = useContext(Context);

	return (
		<div className="mx-2 bg-gra">
			<div className="card color-back" style={{ width: "240px"}}>
				<div className="card-body color-back2 p-3 m-2" style={{borderRadius: "50px" }}>
					<div className="d-flex-column text-center align-items-center">
						<img style={{ width: "90%" }} className=" rounded-circle" src={props.avatarUrl} alt="Avatar" />
						<h4 className="card-title color-text ">{props.name}</h4>
					</div>
                    <div className="d-flex-column text-center justify-content-between color-text">
					{/* Ranking */}
					<p>Ranking: {props.ranking}</p>
					{/* Contador de fotos */}
					<p>Fotos subidas: {props.fotos}</p>
                    </div>        
				</div>
			</div>
		</div>
	);
};

ArtistCard.propTypes = {
	name: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	ranking: PropTypes.number.isRequired,
	fotos: PropTypes.number.isRequired,
    // Nueva propiedad para la URL del avatar
  avatarUrl: PropTypes.string.isRequired,
};

ArtistCard.defaultProps = {
	ranking: 0,
	fotos: 0,
};