import React from 'react'
import { Link } from 'react-router-dom';
import "../../styles/aboutus.css";

export const AboutUs = () => {
    return (
        <div className='about-us-container container-fluid p-5'>
            <div className='row'>
                <div className='col-md-6 text-center'>
                    <img src='https://apertura.cl/tienda/modules/ph_simpleblog/featured/19.jpg' alt='placeholder image' className='about-us-img img-fluid rounded-circle mb-4' />
                    <h2 className='display-4 about-us-title'>Nuestro Objetivo</h2>
                    <p className='lead'>
                        Ser el destino definitivo para todos los amantes de la fotografía, desde aficionados entusiastas hasta profesionales consumados. Queremos fomentar una comunidad inclusiva y vibrante donde cada miembro pueda compartir su pasión por la fotografía, encontrar inspiración en el trabajo de otros y mejorar sus habilidades a través de la colaboración y el intercambio de conocimientos.
                    </p>
                </div>
                <div className='col-md-6'>
                    <div className='card text-white p-4' style={{ backgroundColor: '#2B2B2B' }}>
                        <h2 className='fw-bold mb-4'>¡Únete a nuestra Comunidad!</h2>
                        <p className='mb-4'>
                            Únete a nuestra comunidad de fotógrafos apasionados y encuentra un lugar donde puedas expresar tu creatividad, aprender nuevas técnicas y conectarte con personas que comparten tu amor por la fotografía. Ya seas un principiante emocionado o un profesional experimentado, todos son bienvenidos aquí para compartir su trabajo, recibir retroalimentación constructiva y celebrar juntos la belleza del mundo a través de la lente.
                        </p>
                        <div className='d-flex justify-content-center'>
                            <Link to="/signUp"><button type='button' className='btn about-us-btn text-white rounded-pill px-4 py-2 me-3'>¡Regístrate!</button></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-5'>
                <div className='col-md-4'>
                    <div className='card about-us-card text-white p-4'>
                        <h2 className='display-6 fw-bold'>Fotógrafos</h2>
                        <p>
                            Sumérgete en un mundo de creatividad y descubre nuevas perspectivas a través de la fotografía. Nuestra comunidad está formada por fotógrafos de todos los niveles y estilos, desde los que están empezando hasta los profesionales establecidos. Comparte tus obras, obtén inspiración de otros y haz conexiones significativas en un ambiente de apoyo y aprendizaje mutuo.
                        </p>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card about-us-card text-white p-4'>
                        <h2 className='display-6 fw-bold'>Dona</h2>
                        <p>
                            Tu generosidad nos ayuda a mantener esta comunidad viva y en crecimiento. Cada donación, por pequeña que sea, contribuye a financiar eventos, premios y mejoras en nuestra plataforma para que podamos seguir inspirando y apoyando a la comunidad fotográfica. Únete a nosotros y sé parte de este viaje emocionante para promover la fotografía como forma de expresión y conexión.
                        </p>
                        <div className='d-flex justify-content-center'>
                            <a href='https://www.buymeacoffee.com/snapify'target='_blank'>
                                <button type='button' className='btn about-us-btn text-white rounded-pill px-4 py-2'>¡Apóyenos!</button>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card about-us-card text-white p-4'>
                        <h2 className='display-6 fw-bold'>¡Colabora con Nosotros!</h2>
                        <p>
                            Buscamos personas comprometidas y entusiastas que deseen colaborar con nuestra comunidad fotográfica. Ya sea que puedas dedicar tiempo como voluntario, compartir tus habilidades en talleres o contribuir con recursos, ¡tu colaboración es valiosa y apreciada! Juntos, podemos seguir creando un espacio vibrante y enriquecedor para todos los amantes de la fotografía.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};
