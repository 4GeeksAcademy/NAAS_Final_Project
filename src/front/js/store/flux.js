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
			statusActive: false,
			events: [],
			currentEvent: [],
			joiningEvent: false,
			leavingEvent: false,
			userJoinedEvent: false,
			userData: []

		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor1(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
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
						return data
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
						} else {
							console.error('La respuesta no es un array JSON válido:', data);
						}
					})
					.catch(err => {
						console.error("Error:", err);
					});

			},
			joinEvent: async (event_id) => {
				try {
					setStore({ joiningEvent: true })

					// Recuperar el token desde sessionStorage
					const token = sessionStorage.getItem('token');
					console.log('Token:', token);
					if (!token) {
						console.error("Token no encontrado en sessionStorage");
						return;
					}

					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${event_id}/join`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					})
					if (response.ok) {
						console.log("usuario unido al evento con exito")
						setStore({ userJoinedEvent: true });
					}
					else {
						console.error("error al unirse al evento", response.status)
					}
				}
				catch (error) {
					console.error("Error:", error);
				}
				finally {
					setStore({ joiningEvent: false });
				}
			},
			leaveEvent: async (event_id) => {
				try {
					setStore({ leavingEvent: true });

					// Recuperar el token desde sessionStorage
					const token = sessionStorage.getItem('token');
					console.log('Token:', token);

					if (!token) {
						console.error("Token no encontrado");
						return;
					}

					const response = await fetch(`${process.env.BACKEND_URL}/api/events/${event_id}/leave`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					});

					if (response.ok) {
						console.log("Usuario dado de baja del evento con éxito");
						setStore({ userJoinedEvent: false });
					} else {
						console.error("Error al darse de baja del evento", response.status);
					}
				} catch (error) {
					console.error("Error:", error);
				} finally {
					setStore({ leavingEvent: false });
				}
			},
			getUserJoinedEvent: async()=>{
				try {
					const token = sessionStorage.getItem('token');
				
					if (!token) {
					  console.error("Token no encontrado en sessionStorage");
					  return;
					}
				
					const response = await fetch(`${process.env.BACKEND_URL}/api/events/user-joined`, {
					  method: "GET",
					  headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					  },
					});
				
					if (response.ok) {
					  const data = await response.json();
					  return data; // Devuelve la lista de eventos a los que el usuario está unido
					} else {
					  console.error("Error al obtener eventos del usuario:", response.status);
					  return [];
					}
				  } catch (error) {
					console.error("Error al obtener eventos del usuario:", error);
					return [];
				  }
				},

				toggleGlobalStyle: (className, targetSelector) => {
					const isStyleActive = !getStore().isStyleActive;
					const elements = document.querySelectorAll(targetSelector);
				
					if (isStyleActive) {
						elements.forEach(element => {
							element.classList.add(className);
						});
					} else {
						elements.forEach(element => {
							element.classList.remove(className);
						});
					}
				
					localStorage.setItem("isStyleActive", isStyleActive.toString());
					setStore({ isStyleActive });
				}

				getUserData: async () => {
					try {
						const token = sessionStorage.getItem('token');
				
						if (!token) {
							console.error("Token no encontrado en sessionStorage");
							return;
						}
				
						const response = await fetch(process.env.BACKEND_URL + "/api/user-data", {
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								"Authorization": `Bearer ${token}`
							}
						});
				
						if (!response.ok) {
							throw new Error(`Status: ${response.status}`);
						}
				
						const data = await response.json();
						setStore({ userData: data });
						console.log(data)
					} catch (error) {
						console.error("Error:", error);
					}
				},
				updateUserData: async (UserData) => {
					try {
						const token = sessionStorage.getItem('token');
						if (!token) {
							console.error("Token no encontrado en sessionStorage");
							return;
						}
	
						const response = await fetch(`${process.env.BACKEND_URL}/api/update-user-data`, {
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${token}`,
							},
							body: JSON.stringify(UserData),
						});
	
						if (!response.ok) {
							throw new Error(`Status: ${response.status}`);
						}
	
						const data = await response.json();
						setStore({ userData: data });
						console.log("Datos del usuarios actualizados con exito:", data);
					} catch (error) {
						console.error("error al actualizar los datos:", error);
						throw error;
					}
				},


			}
		}
	}

export default getState;