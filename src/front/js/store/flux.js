import React from "react";
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
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