import React, { useState, useCallback } from 'react';
import "../../styles/TermsAndConditions.css"

const TermsAndConditions = () => {

    const [section, setSection] = useState({});

    const expandSection = useCallback((section) => {
        setSection(prevState => ({
            ...prevState,
            [section]: !prevState[section]
        }));
    }, []);

    return (
        <div className='mt-5'>
            <h1 className='text-center mb-4'>Concurso Amateur de Fotografía - Bases y Condiciones</h1>
            &nbsp;
            <h3 className='mb-4'>¡Sean bienvenidos al Concurso Amateur de Fotografía de Snapify!
                ¡Estamos emocionados de poder ver el talento y la creatividad de nuestra increíble comunidad en acción!
            </h3>
            <h3>A continuación, detallamos las Bases y Condiciones para poder participar en este evento:</h3>
            &nbsp;
            <div className='bases-section'>
                <h5 className='category-title' onClick={() => expandSection('category')}>
                    Categorías del Concurso
                </h5>
                {section['category'] && (
                    <ul>
                        <li>Los participantes pueden enviar hasta 5 fotos por categoría.</li>
                        <li>Las categorías incluyen—pero no se limitan— a Retrato, Paisaje, Macrofotografía, Vida Salvaje, Arte Abstracto, y cualquier otra Categoría que pueda anunciarse en la plataforma.</li>
                    </ul>
                )}
            </div>
            &nbsp;
            <div className='bases-section'>
                <h5 className='category-title' onClick={() => expandSection('dates')}>
                    Fechas Importantes
                </h5>
                {section['dates'] && (
                    <ul>
                        <li>La fecha de inicio y cierre del concurso se anunciará en la web y se notificará a todos los usuarios registrados.</li>
                        <li>Asegúrate de marcar las fechas en tu calendario para no perder la oportunidad de participar.</li>
                    </ul>
                )}
            </div>
            &nbsp;
            <div className='bases-section'>
                <h5 className='category-title' onClick={() => expandSection('votation')}>
                    Método de Votación
                </h5>
                {section['votation'] && (
                    <ul>
                        <li>La votación será realizada por los usuarios registrados en la web.</li>
                        <li>Cada usuario puede dar "like" a sus fotos favoritas. Solo se permite un like por foto por usuario.</li>
                        <li>La votación se cerrará en la fecha indicada en la plataforma.</li>
                    </ul>
                )}
            </div>
            &nbsp;
            <div className='bases-section'>
                <h5 className='category-title' onClick={() => expandSection('prizes')}>
                    Premios
                </h5>
                {section['prizes'] && (
                    <ul>
                        <li>No hay premios externos en efectivo o físicos para este concurso.</li>
                        <li>Los ganadores recibirán insignias especiales para la aplicación, destacando su logro y habilidades fotográficas.</li>
                        <li>Todos los votos también contribuirán a un ranking general que destacará a los usuarios más talentosos de nuestra comunidad.</li>
                    </ul>
                )}
            </div>
            &nbsp;
            <div className='bases-section'>
                <h5 className='category-title' onClick={() => expandSection('participation')}>
                    Participación
                </h5>
                {section['participation'] && (
                    <ul>
                        <li>Para participar, los usuarios deben estar registrados en Snapify.</li>
                        <li>Las fotos deben cumplir con las normas de contenido de la comunidad.</li>
                        <li>Cada participante es responsable de garantizar que tenga los derechos necesarios para enviar las fotos.</li>
                    </ul>
                )}
            </div>
            &nbsp;
            <div className='bases-section'>
                <h5 className='category-title' onClick={() => expandSection('results')}>
                    Publicación de Resultados
                </h5>
                {section['results'] && (
                    <ul>
                        <li>Los resultados se anunciarán en la web después de la finalización del concurso.</li>
                        <li>Los ganadores recibirán notificaciones y tendrán acceso a sus insignias.</li>
                    </ul>
                )}
            </div>
            &nbsp;
            <div className='bases-section'>
                <h5 className='category-title' onClick={() => expandSection('photos-usage')}>
                    Uso de las Fotos
                </h5>
                {section['photos-usage'] && (
                    <ul>
                        <li>Al participar, los concursantes otorgan el derecho a Snapify para mostrar sus fotos en la plataforma con fines promocionales y destacar los logros de la comunidad.</li>
                    </ul>
                )}
            </div>
            &nbsp;
            <div className='bases-section'>
                <h5 className='category-title' onClick={() => expandSection('good-faith')}>
                    Buena Fé y Colaboración
                </h5>
                {section['good-faith'] && (
                    <ul>
                        <li>Fomentamos un ambiente positivo y colaborativo. Respeten las obras de los demás y disfruten del proceso creativo compartido.</li>
                    </ul>
                )}
            </div>
            &nbsp;
        </div>
    )
}
export default TermsAndConditions