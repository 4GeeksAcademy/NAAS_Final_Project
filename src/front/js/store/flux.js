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
			favorites: []
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
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
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
			changeColor1: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const vistaProfile = store.vistaProfile.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ vistaProfile: vistaProfile });
			}
		}
	};
};

export default getState;