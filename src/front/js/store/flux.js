import React from "react";

const getState = ({ getStore, getActions, setStore }) => {
    const isUserAlreadyRegistered = (event_id, userEvents) => {
        return userEvents.some(userEvent => userEvent.event_id === event_id);
    };

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
            userEvents: [],
            joiningEvent: false,
            leavingEvent: false,
            userJoinedEvent: false,
            userData: [],
            userPhotosData: [],
        },
        actions: {
            exampleFunction: () => {
                getActions().changeColor1(0, "green");
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
                setStore({ isUserLoggedIn: false, isAdminLoggedIn: false });
                sessionStorage.removeItem("token");
                console.log(sessionStorage.getItem("token"));
            },
            getEvent: async (event_id) => {
                try {
                    const url = `${process.env.BACKEND_URL}/api/events/${event_id}`;
                    const response = await fetch(url);

                    if (!response.ok) {
                        throw new Error(`Error: ${response.status}`);
                    }

                    const contentType = response.headers.get('content-type');
                    console.log("Tipo de contenido de la respuesta:", contentType);

                    if (!contentType || !contentType.includes('application/json')) {
                        throw new Error('La respuesta no es de tipo JSON');
                    }

                    const data = await response.json();
                    setStore({ currentEvent: data });
                    console.log(data.name)
                    return data;
                } catch (err) {
                    console.error(`Error al obtener el evento ${event_id}:`, err);
                    throw err;
                }
            },
            getAllEvents: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/events`);
                    console.log(response); // Log the full response to inspect it

                    if (!response.ok) {
                        throw new Error('Failed to fetch events');
                    }

                    const contentType = response.headers.get('content-type');
                    console.log("Tipo de contenido de la respuesta:", contentType);

                    if (!contentType || !contentType.includes('application/json')) {
                        throw new Error('La respuesta no es de tipo JSON');
                    }

                    const data = await response.json();
                    console.log(data);
                    setStore({ events: data });
                } catch (err) {
                    console.error("Error fetching all events:", err);
                    throw err;
                }
            },
            joinEvent: async (event_id) => {
                try {
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
                    });

                    console.log(response);
                    console.log(event_id);
                    if (response.ok) {
                        console.log("usuario unido al evento con exito");
                        // Actualizar userEvents en el almacenamiento
                        const updatedUserEvents = [...getStore().userEvents, { event_id }];
                    } else {
                        console.error("error al unirse al evento", response.status);
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            },
            leaveEvent: async (event_id) => {
                try {
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
                    } else {
                        console.error("Error al darse de baja del evento", response.status);
                    }
                } catch (error) {
                    console.error("Error:", error);
                }
            },
            getUserJoinedEvent: async () => {
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
                        setStore({ userEvents: data });
                        return data;
                    } else {
                        console.error("Error al obtener eventos del usuario:", response.status);
                        return [];
                    }
                } catch (error) {
                    console.error("Error al obtener eventos del usuario:", error);
                    return [];
                }
            },
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

            getUserPhotosData: async (user_id) => {
                try {
                    const token = sessionStorage.getItem('token');

                    if (!token) {
                        console.error("Token not found");
                        return;
                    }

                    if (!user_id) {
                        console.error("User ID not found");
                        return;
                    }

                    const response = await fetch(`${process.env.BACKEND_URL}/api/get-user-photos/${user_id}`, {
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

                    // Verificar si se recibieron fotos
                    if (data && data.photos && data.photos.length > 0) {
                        setStore({ userPhotosData: data.photos });
                    } else {
                        console.log("No se encontraron fotos para el usuario");
                    }
                } catch (error) {
                    console.error("Error fetching user photos:", error);
                }
            },
        }
    };
};

export default getState;
