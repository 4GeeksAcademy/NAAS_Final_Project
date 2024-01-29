import React, { useState } from 'react';
import "../../styles/termsandconditions.css"

const TermsAndConditions = () => {

    const [section, setSection] = useState({});

    const expandSection = (sectionName) => {
        setSection(prevState => ({
            ...prevState,
            [sectionName]: !prevState[sectionName]
        }));
    };

    return (
        <div className='terms-conditions container-fluid mt-4'>
            <h1 className='main-title text-center mb-4 mt-5'>Bases y Condiciones del Concurso de Fotografía Amateur de Snapify</h1>
            &nbsp;
            <h3 className='secondary-title mb-4 mt-4'>¡Bienvenidos al Concurso Amateur de Fotografía de Snapify! Nos complace enormemente presentar esta oportunidad para que nuestra comunidad exhiba su talento y creatividad a través de la lente de una cámara. ¡Esperamos ansiosos ver las maravillosas imágenes que capturarán!
            </h3>
            <h3 className='third-title'>A continuación, detallamos las Bases y Condiciones para poder participar en este evento:</h3>
            &nbsp;
            <div className='accordion' id='accordionExample1'>
                <div className='bases-section accordion-item'>
                    <h5 className='category-title accordion-header' id='headingOne'>
                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapseOne' aria-expanded='true' aria-controls='collapseOne' onClick={() => expandSection('category')}>
                            1. Categorías: Explora tu Pasión Fotográfica
                        </button>
                    </h5>
                    <div id='collapseOne' className={`accordion-collapse collapse${section['category'] ? 'show' : ''}`} aria-labelledby='headingOne' data-bs-parent='#accordionExample'>
                        <div className='accordion-body'>
                            <ul>
                                <li>Los participantes pueden enviar hasta 5 fotos por categoría.</li>
                                <li>Las categorías incluyen, pero no se limitan, a: <em>Retrato</em>, <em>Paisaje</em>, <em>Macrofotografía</em>, <em>Vida Salvaje</em>, <em>Arte Abstracto</em>, y cualquier otra Categoría que pueda anunciarse en la plataforma.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='accordion' id='accordionExample2'>
                <div className='bases-section accordion-item'>
                    <h5 className='category-title accordion-header' id='headingTwo'>
                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapseTwo' aria-expanded='true' aria-controls='collapseTwo' onClick={() => expandSection('participation')}>
                            2. Requisitos para Participar: Prepara tu SNAP!
                        </button>
                    </h5>
                    <div id='collapseTwo' className={`accordion-collapse collapse${section['participation'] ? ' show' : ''}`} aria-labelledby='headingTwo' data-bs-parent='#accordionExample'>
                        <div className='accordion-body'>
                            <ul>
                                <li>Para participar, los usuarios deben estar registrados en Snapify.</li>
                                <li>Debes tener al menos 13 (trece) años de edad para poder utilizar este sitio web. Al usar este sitio web, garantizas que tienes al menos 13 años de edad y que puedes adherirte legalmente a este Acuerdo. Snapify no asume responsabilidad por responsabilidades relacionadas con la representación incorrecta de la edad.</li>
                                <li>Todas las fotos enviadas deben cumplir con las normas de contenido de la comunidad y no infringir ningún derecho de autor.</li>
                                <li>Cada participante es responsable de garantizar que tenga los derechos necesarios para enviar las fotos y que estás representen su propio trabajo original.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='accordion' id='accordionExample3'>
                <div className='bases-section accordion-item'>
                    <h5 className='category-title accordion-header' id='headingThree'>
                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapseThree' aria-expanded='true' aria-controls='collapseThree' onClick={() => expandSection('dates')}>
                            3. Fechas Claves: No te Pierdas Ningún Evento
                        </button>
                    </h5>
                    <div id='collapseThree' className={`accordion-collapse collapse${section['dates'] ? ' show' : ''}`} aria-labelledby='headingThree' data-bs-parent='#accordionExample'>
                        <div className='accordion-body'>
                            <ul>
                                <li>La fecha de inicio y cierre del concurso se anunciará en la web y se notificará a todos los usuarios registrados.</li>
                                <li>Es crucial marcar las fechas en tu calendario para asegurarte no perder la oportunidad de participar.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='accordion' id='accordionExample4'>
                <div className='bases-section accordion-item'>
                    <h5 className='category-title accordion-header' id='headingFour'>
                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapseFour' aria-expanded='true' aria-controls='collapseFour' onClick={() => expandSection('votation')}>
                            4. Proceso de Votación: Tu Opinión Importa
                        </button>
                    </h5>
                    <div id='collapseFour' className={`accordion-collapse collapse${section['votation'] ? ' show' : ''}`} aria-labelledby='headingFour' data-bs-parent='#accordionExample'>
                        <div className='accordion-body'>
                            <ul>
                                <li>La votación será realizada por los usuarios registrados en la web.</li>
                                <li>Cada usuario puede dar "like" a sus fotos favoritas. Solo se permite un like por foto por usuario.</li>
                                <li>La votación se cerrará en la fecha indicada en la plataforma.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='accordion' id='accordionExample5'>
                <div className='bases-section accordion-item'>
                    <h5 className='category-title accordion-header' id='headingFive'>
                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapseFive' aria-expanded='true' aria-controls='collapseFive' onClick={() => expandSection('prizes')}>
                            5. Reconocimiento Especial: Premios y Logros.
                        </button>
                    </h5>
                    <div id='collapseFive' className={`accordion-collapse collapse${section['prizes'] ? ' show' : ''}`} aria-labelledby='headingFive' data-bs-parent='#accordionExample'>
                        <div className='accordion-body'>
                            <ul>
                                <li>No hay premios externos en efectivo o físicos para este concurso.</li>
                                <li>Sin embargo, los ganadores recibirán insignias especiales para la plataforma, las cuales destacarán su logro y reconocimiento de habilidades fotográficas.</li>
                                <li>Además, todos los votos contribuirán a un ranking general que destacará a los usuarios más talentosos de nuestra vibrante comunidad.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='accordion' id='accordionExample6'>
                <div className='bases-section accordion-item'>
                    <h5 className='category-title accordion-header' id='headingSix'>
                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapseSix' aria-expanded='true' aria-controls='collapseSix' onClick={() => expandSection('results')}>
                            6. Anuncio de Resultados: Conoce a los Ganadores
                        </button>
                    </h5>
                    <div id='collapseSix' className={`accordion-collapse collapse${section['results'] ? ' show' : ''}`} aria-labelledby='headingSix' data-bs-parent='#accordionExample'>
                        <div className='accordion-body'>
                            <ul>
                                <li>Los resultados del concurso se anunciarán en la web después de la finalización del evento.</li>
                                <li>Los ganadores serán notificados personalmente y recibirán acceso a sus insignias especiales.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='accordion' id='accordionExample7'>
                <div className='bases-section accordion-item'>
                    <h5 className='category-title accordion-header' id='headingSeven'>
                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapseSeven' aria-expanded='true' aria-controls='collapseSeven' onClick={() => expandSection('photos-usage')}>
                            7. Uso Responsable de las Fotos: Protegiendo tu Creatividad
                        </button>
                    </h5>
                    <div id='collapseSeven' className={`accordion-collapse collapse${section['photos-usage'] ? ' show' : ''}`} aria-labelledby='headingSeven' data-bs-parent='#accordionExample'>
                        <div className='accordion-body'>
                            <ul>
                                <li>Al participar en el evento, los concursantes otorgan a Snapify el derecho a mostrar sus fotos en la plataforma con fines promocionales y para destacar los logros de la comunidad.</li>
                                <li>Es importante que los participantes estén conscientes de que sus imágenes pueden ser utilizadas con éste propósito una vez enviadas al concurso.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className='accordion' id='accordionExample8'>
                <div className='bases-section accordion-item'>
                    <h5 className='category-title accordion-header' id='headingEight'>
                        <button className='accordion-button' type='button' data-bs-toggle='collapse' data-bs-target='#collapseEight' aria-expanded='true' aria-controls='collapseEight' onClick={() => expandSection('good-faith')}>
                            8. Fomento de la Buena Fe y Colaboración: Construyendo Comunidad
                        </button>
                    </h5>
                    <div id='collapseEight' className={`accordion-collapse collapse${section['good-faith'] ? ' show' : ''}`} aria-labelledby='headingEight' data-bs-parent='#accordionExample'>
                        <div className='accordion-body'>
                            <ul>
                                <li>Fomentamos un ambiente positivo y colaborativo dentro de nuestra comunidad.</li>
                                <li>Es fundamental respetar el trabajo de los demás participantes y disfrutar del proceso creativo compartido, manteniendo siempre una actitud de buena fe y apoyo mutuo.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default TermsAndConditions