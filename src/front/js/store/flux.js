import React from "react";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			userRankings: [
				//ejemplo de rankings
				{ rank: 1, imageUrl: 'URL_DEL_USUARIO_1', username: 'Usuario 1', numbers: [456, 789, 123] },
				{ rank: 2, imageUrl: 'URL_DEL_USUARIO_2', username: 'Usuario 2', numbers: [789, 456, 123] },
				// ... más datos
			  ],
			photoRankings: [
				{ rank: 1, imageUrl: 'URL_DEL_USUARIO_1', username: 'nombre 1', numbers: [45, 7, 12] },
				{ rank: 1, imageUrl: 'URL_DEL_USUARIO_1', username: 'nombre 2', numbers: [3, 2, 62] },

			],
			vistaProfile: null,
			favorites: [],
			isUserLoggedIn: false,
			isAdminLoggedIn: false,
			statusActive: false,
			likesCount: 0,
      		favoritesCount: 0,
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor1(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			
			// Incrementa el contador de likes
			incrementLikesCount: () => {
				const store = getStore();
				setStore({ likesCount: store.likesCount + 1 });
			  },
		
			  // Incrementa el contador de favoritos
			  incrementFavoritesCount: () => {
				const store = getStore();
				setStore({ favoritesCount: store.favoritesCount + 1 });
			  },

			addFavoritePhoto: (photo) => {
				const store = getStore();
				const updatedFavorites = store.favorites.some((fav) => fav.index === photo.index)
				  ? store.favorites.filter((fav) => fav.index !== photo.index)
				  : [...store.favorites, photo];
			  
				setStore({ favorites: updatedFavorites });
			  },
			  
			  

			  deleteFavoritePhoto: (index) => {
				const store = getStore();
				const updatedFavorites = store.favorites.filter((fav, i) => i !== index);
				setStore({ favorites: updatedFavorites });
			  },

			toggleStatus: () => {
				const store = getStore();
				setStore({ statusActive: !store.statusActive });
			  },
			
			setVistaElement: (componentType) => {
				setStore({ vistaProfile: componentType });
				},
			clearVista: () => {
				setStore({ vistaProfile: null });
				},	
				loginUser: () => setStore({ isUserLoggedIn: true, isAdminLoggedIn: false }),
				loginAdmin: () => setStore({ isUserLoggedIn: false, isAdminLoggedIn: true }),
				logout: () => setStore({ isUserLoggedIn: false, isAdminLoggedIn: false }),
		}
	};
};

export default getState;