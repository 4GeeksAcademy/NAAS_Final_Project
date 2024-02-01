import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { ArtistCard } from "../component/artistCard";
import { testData, testData2, testData3 } from "../component/testData";
import { CategoryCard } from "../component/categoryCard";
import { Timer } from "../component/Timer";



export const Landing = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <div className="d-flex px-4 py-5 color-text color-back container-fluid">
                <div className="text-center col-6 p-4">
                    <h1>Descubre Una Comunidad De Artistas</h1>
                    <h4 className="p-3">Para fotógrafos aficionados y profesionales, con categorías que abarcan desde retratos hasta fotografía de paisajes.</h4>
                    <Link to="/signUp">
                    <button
                        type="button"
                        className="px-5 btn brd color-call color-text mt-5">
                        <i className="pe-2 fa-solid fa-rocket"></i>Get Started
                    </button>
                    </Link>
                </div>
                <div className="col-6">
                    <img src={testData3[10].fotoUrl} className="card-img-top" alt="Photo" />
                </div>
            </div>
            <div className="d-flex px-5 py-5 color-back container-fluid justify-content-between">
                <div>
                    <h2 className="color-text2 px-5">Como Funciona</h2>
                    <h3 className="color-text px-5">Descubra Cómo Empezar</h3>
                </div>
                <Link to="/tips">
                <button
                    type="button"
                    className="px-5 btn btn-outline-success color-text brd mt-5">
                    <i className="pe-2 fa-solid fa-rocket"></i>Ver Consejos
                </button>
                </Link>
            </div>
            <div className="d-flex justify-content-around color-back color-text container-fluid">
                <div className="card card-info">
                    <img src={testData3[6].fotoUrl} className="card-img-top" style={{ height: "350px", objectFit: "cover" }} alt="..." />
                    <div className="card-body">
                        <h4>Elige Tu Cámara</h4>
                        <p>
                            Toma tu cámara, celular o lo que pueda sacar una foto y comienza a
                            capturar esas imágenes.
                        </p>
                    </div>
                </div>
                <div className="card card-info">
                    <img src={testData3[13].fotoUrl} className="card-img-top" style={{ height: "350px", objectFit: "cover" }} alt="..." />
                    <div className="card-body">
                        <h4>Crea Una Colección</h4>
                        <p>
                            Sube tu trabajo y configura tu colección. Agrega una descripción,
                            enlaces sociales y regístrate a los concursos.
                        </p>
                    </div>
                </div>
                <div className="card card-info">
                    <img src={testData3[9].fotoUrl} className="card-img-top" style={{ height: "350px", objectFit: "cover" }} alt="..." />
                    <div className="card-body">
                        <h4>Comienza A Recibir Logros</h4>
                        <p>
                            Interactúa con otros artistas, vota en los concursos, guarda fotos
                            en favoritos y asciende en el ranking.
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <div className="d-flex px-5 py-5 color-back container-fluid justify-content-between">
                    <div>
                        <h2 className="color-text2 px-5">Colecciones Populares</h2>
                        <h3 className="color-text px-5">Consulte Nuestra Colección De Tendencias Actualizada Semanalmente</h3>
                    </div>
                    <Link to="/galeria">
                    <button
                        type="button"
                        className="px-5 btn btn-outline-success color-text brd mt-5">
                        <i className="pe-2 fa-solid fa-rocket"></i>Ver Colecciones
                    </button>
                    </Link>
                </div>
                <div className="d-flex justify-content-around color-back color-text container-fluid">
                    <div className="card card-info">
                        <img src={testData3[5].fotoUrl} className="card-img-top" style={{ height: "320px", width: "320px", objectFit: "cover" }} alt="..." />
                        <div className="d-flex justify-content-between" >
                            <img src={testData3[5].fotoUrl} className="card-img-top brd" style={{ width: "100px", height: "100px" }} alt="..." />
                            <img src={testData3[10].fotoUrl} className="card-img-top brd" style={{ width: "100px", height: "100px" }} alt="..." />
                            <button
                                type="button"
                                className="btn color-call color-text brd fs-4" style={{ height: "100px", width: "100px" }}>
                                1025+
                            </button>
                        </div>
                        <div className="card-body">
                            <h4>DSGN Animals</h4>
                            <p>
                                <i className="pe-2 fa-solid fa-paw"></i> MrFox
                            </p>
                        </div>
                    </div>
                    <div className="card card-info">
                        <img src={testData3[11].fotoUrl} className="card-img-top" style={{ height: "320px", width: "320px", objectFit: "cover" }} alt="..." />
                        <div className="d-flex justify-content-between" >
                            <img src={testData3[11].fotoUrl} className="card-img-top brd" style={{ width: "100px", height: "100px" }} alt="..." />
                            <img src={testData3[13].fotoUrl} className="card-img-top brd" style={{ width: "100px", height: "100px" }} alt="..." />
                            <button
                                type="button"
                                className="btn color-call color-text brd fs-4" style={{ height: "100px", width: "100px" }}>
                                1025+
                            </button>
                        </div>
                        <div className="card-body">
                            <h4>Magic Mushrooms</h4>
                            <p>
                                <i className="fa-solid fa-bug pe-2"></i>Shroomie
                            </p>
                        </div>
                    </div>
                    <div className="card card-info">
                        <img src={testData3[4].fotoUrl} className="card-img-top" style={{ height: "320px", width: "320px", objectFit: "cover" }} alt="..." />
                        <div className="d-flex justify-content-between" >
                            <img src={testData3[4].fotoUrl} className="card-img-top brd" style={{ width: "100px", height: "100px" }} alt="..." />
                            <img src={testData3[6].fotoUrl} className="card-img-top brd" style={{ width: "100px", height: "100px" }} alt="..." />
                            <button
                                type="button"
                                className="btn color-call color-text brd fs-4" style={{ height: "100px", width: "100px" }}>
                                1025+
                            </button>
                        </div>
                        <div className="card-body">
                            <h4>Disco Machines</h4>
                            <p>
                                <i className="pe-2 fa-solid fa-robot"></i> BeKind2Robots
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex px-5 py-5 color-back container-fluid justify-content-between">
                <div>
                    <h2 className="color-text2 px-5">Top Creadores</h2>
                    <h3 className="color-text px-5">Consulte A Los Creadores Mejor Calificados En Snapify</h3>
                </div>
                <Link to="/ranking-user">
                <button
                    type="button"
                    className="px-5 btn btn-outline-success color-text brd mt-5">
                    <i className="pe-2 fa-solid fa-rocket"></i>Ver Rankings
                </button>
                </Link>
            </div>
            <div className="color-back pb-5 d-flex justify-content-evenly flex-wrap pt-3">
                {testData.map((data, index) => (
                    <ArtistCard key={index} {...data} />
                ))}
            </div>
            <div className="d-flex px-5 py-5 color-back container-fluid justify-content-between">
                <div>
                    <h2 className="color-text2 px-5">Categorías</h2>
                </div>
            </div>
            <div className="color-back d-flex justify-content-evenly flex-wrap pt-3">
                {testData2.map((data, index) => (
                    <CategoryCard key={index} {...data} />
                ))}
            </div>
            <div className="container-fluid p-5 color-back justify-content-around align-items-center">
                <div className="d-flex rounded-3 px-5 py-5 color-text color-back2 container align-items-center">
                    <div className="col-6">
                        <img src={testData3[3].fotoUrl} className="card-img-top rounded-3" alt="Photo" />
                    </div>
                    <div className="text-center col-6 p-5">
                        <h2>Únase A Nuestro Boletín Semanal</h2>
                        <h4 className="p-3">Obtenga Promociones Y Actualizaciones Exclusivas Directamente En Su Bandeja De Entrada.</h4>
                        <div className="input-group d-flex align-items-baseline">
						<input type="text" className="form-control" placeholder="Enter your email here" aria-label="Enter your email here">
						</input>
						<button type="button" className=" btn rounded color-call color-text"><i className="pe-2 fa-regular fa-envelope"></i>Suscribe</button>
					</div>
                    </div>
                </div>
            </div>
            <div className="container-fluid color-back">
                <div className="container position-relative pb-5">
                    <img src={testData3[14].fotoUrl} className="w-100" alt="Photo" />

                    <div className="position-absolute d-flex-column justify-content-center text-center m-5 top-0 end-0">
                        <h1>Magic Mashrooms</h1>
                        
                        <button type="button" className="px-5 btn rounded color-call color-text">
                            <i className="pe-2 fa-regular fa-eye"></i>Ver Evento
                        </button>
                        {/* <Timer/> */}
                    </div>
                </div>
            </div>

        </div>
    );
};