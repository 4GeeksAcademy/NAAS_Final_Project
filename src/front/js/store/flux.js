import React from "react";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			vistaProfile: [
				{
					title: "Galería",
				},
				{
					title: "Mis Eventos",
					background: "white",
					initial: "white"
				},
				{
					title: "Mis Logros",
					background: "white",
					initial: "white"
				}
			],
			favorites: [],
			userRankings: [
				//ejemplo de rankings
				{ rank: 1, imageUrl: 'URL_DEL_USUARIO_1', username: 'Usuario 1', numbers: [456, 789, 123] },
				{ rank: 2, imageUrl: 'URL_DEL_USUARIO_2', username: 'Usuario 2', numbers: [789, 456, 123] },
				// ... más datos
			  ],
			photoRankings: [
				{ rank: 1, imageUrl: 'URL_DEL_USUARIO_1', username: 'nombre 1', numbers: [45, 7, 12] },
				{ rank: 1, imageUrl: 'URL_DEL_USUARIO_1', username: 'nombre 2', numbers: [3, 2, 62] },

			]
			vistaProfile: null,
			favorites: [],
			isUserLoggedIn: false,
			isAdminLoggedIn: false,
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
			
			addFavorite: (item) => {
				const store = getStore();
                const favorite = store.favorites.concat(item);
                setStore({ favorites: favorite });
			},

			deleteFavorite: (index) => {
				const store = getStore();
                const favorite = store.favorites.filter((_c, i) => {
                    return index !== i
                });
                setStore({ favorites: favorite });
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