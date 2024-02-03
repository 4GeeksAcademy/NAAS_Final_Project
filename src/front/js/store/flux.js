import React from "react";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			userRankings: [
				{ rank: 1, imageUrl: 'URL_DEL_USUARIO_1', username: 'Usuario 1', numbers: [456, 789, 123] },
				{ rank: 2, imageUrl: 'URL_DEL_USUARIO_2', username: 'Usuario 2', numbers: [789, 456, 123] },
			  ],
			photoRankings: [
				{ rank: 1, imageUrl: 'URL_DEL_USUARIO_1', username: 'nombre 1', numbers: [45, 7, 12] },
				{ rank: 1, imageUrl: 'URL_DEL_USUARIO_1', username: 'nombre 2', numbers: [3, 2, 62] },

			],
			cardLikes: {},
			likes: [],
			cardFavorites: {},
			vistaProfile: null,
			favorites: [],
			isUserLoggedIn: false,
			isAdminLoggedIn: false,
			events: [],
			currentEvent: [],
			statusActive: false,
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

			addFavoritePhoto: (photo) => {
				const store = getStore();
				const updatedFavorites = store.favorites.some((fav) => fav.index === photo.index)
				  ? store.favorites.filter((fav) => fav.index !== photo.index)
				  : [...store.favorites, photo];
		
				const updatedCardFavorites = {
				  ...store.cardFavorites,
				  [photo.index]: updatedFavorites.filter((fav) => fav.index === photo.index).length,
				};
		
				setStore({
				  favorites: updatedFavorites,
				  cardFavorites: updatedCardFavorites,
				});
			  },
		
			  deleteFavoritePhoto: (index) => {
				const store = getStore();
				const updatedFavorites = store.favorites.filter((fav, i) => i !== index);
		
				// Actualiza el recuento de favoritos por tarjeta
				const updatedCardFavorites = {
				  ...store.cardFavorites,
				  [index]: updatedFavorites.length,
				};
		
				setStore({
				  favorites: updatedFavorites,
				  cardFavorites: updatedCardFavorites,
				});
			  },

			  addLikePhoto: (photo) => {
				const store = getStore();
				const updatedLikes = store.likes.some((like) => like.index === photo.index)
				  ? store.likes.filter((like) => like.index !== photo.index)
				  : [...store.likes, photo];
		
				const updatedCardLikes = {
				  ...store.cardLikes,
				  [photo.index]: updatedLikes.filter((like) => like.index === photo.index).length,
				};
		
				setStore({
				  likes: updatedLikes,
				  cardLikes: updatedCardLikes,
				});
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
				logout: () => {
					setStore({ isUserLoggedIn: false, isAdminLoggedIn: false })
					sessionStorage.removeItem("token")
					console.log(sessionStorage.getItem("token"))
				},

			getEvent: async (event_id) => {
				try {
					const url = `${process.env.BACKEND_URL}/events/${event_id}`;
					const response = await fetch(url);
				
					if (!response.ok) {
							throw new Error(`Status: ${response.status}`);
					}
				
					const data = await response.json();
				
					// Verificar si data es un objeto JSON válido antes de actualizar el store
					if (data && typeof data === 'object') {
						setStore({ currentEvent: data });
					} else {
						console.error('La respuesta no es un objeto JSON válido:', data);
					}
					} catch (err) {
						console.error(`Error al obtener el evento ${event_id}:`, err);
					}
				},
				getAllEvents: () => {
					fetch(process.env.BACKEND_URL + "/events")
						.then(response => {
							if (!response.ok) {
								throw new Error(`Status: ${response.status}`);
							}
							return response.json();
						})
						.then(data => {
							if (data && typeof data === 'object') {
								setStore({ events: data });
								console.log(data)
							} else {
								console.error('La respuesta no es un array JSON válido:', data);
							}
						})
						.catch(err => {
							console.error("Error:", err);
						});
				}
				
				
}}}
export default getState;