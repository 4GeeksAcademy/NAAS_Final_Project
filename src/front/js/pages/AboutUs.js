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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eget nisl vehicula, auctor massa sed, auctor risus. Donec ac augue leo. In ullamcorper mollis sapien, at ullamcorper elit imperdiet at. Pellentesque pretium metus nec ipsum molestie auctor. Cras eu sem ligula. Nunc aliquam posuere elit, vitae fermentum lectus tempus ac.
                    </p>
                </div>
                <div className='col-md-6'>
                    <div className='card text-white p-4' style={{ backgroundColor: '#2B2B2B' }}>
                        <h2 className='fw-bold mb-4'>¡Únete a nuestra Comunidad!</h2>
                        <p className='mb-4'>
                            Fusce pharetra condimentum lorem, egestas venenatis diam consequat nec. Nunc varius risus eu congue rhoncus. Aenean eu rutrum lorem. Aenean ante mauris, aliquam eget lorem vitae, congue dictum dolor. In rhoncus, felis nec viverra feugiat, sapien mi tincidunt metus, eget ultricies nisi ex sed massa. Cras convallis arcu nec fringilla viverra.
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
                            Fusce pharetra condimentum lorem, egestas venenatis diam consequat nec. Nunc varius risus eu congue rhoncus. Aenean eu rutrum lorem. Aenean ante mauris, aliquam eget lorem vitae, congue dictum dolor. In rhoncus, felis nec viverra feugiat, sapien mi tincidunt metus, eget ultricies nisi ex sed massa. Cras convallis arcu nec fringilla viverra.
                        </p>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card about-us-card text-white p-4'>
                        <h2 className='display-6 fw-bold'>Dona</h2>
                        <p>
                            Fusce pharetra condimentum lorem, egestas venenatis diam consequat nec. Nunc varius risus eu congue rhoncus. Aenean eu rutrum lorem. Aenean ante mauris, aliquam eget lorem vitae, congue dictum dolor. In rhoncus, felis nec viverra feugiat, sapien mi tincidunt metus, eget ultricies nisi ex sed massa. Cras convallis arcu nec fringilla viverra.
                        </p>
                        <div className='d-flex justify-content-center'>
                            <a href='https://www.buymeacoffee.com/snapify'>
                                <button type='button' className='btn about-us-btn text-white rounded-pill px-4 py-2'>¡Apóyenos!</button>
                            </a>
                        </div>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='card about-us-card text-white p-4'>
                        <h2 className='display-6 fw-bold'>¡Danos una mano!</h2>
                        <p>
                            Fusce pharetra condimentum lorem, egestas venenatis diam consequat nec. Nunc varius risus eu congue rhoncus. Aenean eu rutrum lorem. Aenean ante mauris, aliquam eget lorem vitae, congue dictum dolor. In rhoncus, felis nec viverra feugiat, sapien mi tincidunt metus, eget ultricies nisi ex sed massa. Cras convallis arcu nec fringilla viverra.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
};
