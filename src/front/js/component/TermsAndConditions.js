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
            <h3 className='mb-4'>¡Bienvenidos al Concurso Amateur de Fotografía de Snapify! Nos complace enormemente presentar esta oportunidad para que nuestra comunidad exhiba su talento y creatividad a través de la lente de una cámara. ¡Esperamos ansiosos ver las maravillosas imágenes que capturarán!
            </h3>
            <h3>A continuación, detallamos las Bases y Condiciones para poder participar en este evento:</h3>
            &nbsp;
            <div className='bases-section'>
                <h5 className='category-title' onClick={() => expandSection('category')}>
                    Categorías: Explora tu Pasión
                </h5>
                {section['category'] && (
                    <ul>
                        <li>Los participantes pueden enviar hasta 5 fotos por categoría.</li>
                        <li>Las categorías incluyen, pero no se limitan, a: Retrato, Paisaje, Macrofotografía, Vida Salvaje, Arte Abstracto, y cualquier otra Categoría que pueda anunciarse en la plataforma.</li>
                    </ul>
                )}
            </div>
            &nbsp;
            <div className='bases-section'>
                <h5 className='category-title' onClick={() => expandSection('dates')}>
                    Fechas Claves: No te Pierdas Nada
                </h5>
                {section['dates'] && (
                    <ul>
                        <li>La fecha de inicio y cierre del concurso se anunciará en la web y se notificará a todos los usuarios registrados.</li>
                        <li>Es crucial marcar las fechas en tu calendario para asegurarte no perder la oportunidad de participar.</li>
                    </ul>
                )}
            </div>
            &nbsp;
            <div className='bases-section'>
                <h5 className='category-title' onClick={() => expandSection('votation')}>
                    Proceso de Votación: Tu Opinión Cuenta
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
                    Reconocimiento Especial: Premios y Logros.
                </h5>
                {section['prizes'] && (
                    <ul>
                        <li>No hay premios externos en efectivo o físicos para este concurso.</li>
                        <li>Sin embargo, los ganadores recibirán insignias especiales para la plataforma, las cuales destacarán su logro y reconocimiento de habilidades fotográficas.</li>
                        <li>Además, todos los votos contribuirán a un ranking general que destacará a los usuarios más talentosos de nuestra vibrante comunidad.</li>
                    </ul>
                )}
            </div>
            &nbsp;
            <div className='bases-section'>
                <h5 className='category-title' onClick={() => expandSection('participation')}>
                    Requisitos para Participar: Prepara tu SNAP!
                </h5>
                {section['participation'] && (
                    <ul>
                        <li>Para participar, los usuarios deben estar registrados en Snapify.</li>
                        <li>Todas las fotos enviadas deben cumplir con las normas de contenido de la comunidad y no infringir ningún derecho de autor.</li>
                        <li>Cada participante es responsable de garantizar que tenga los derechos necesarios para enviar las fotos y que estás representen su propio trabajo original.</li>
                    </ul>
                )}
            </div>
            &nbsp;
            <div className='bases-section'>
                <h5 className='category-title' onClick={() => expandSection('results')}>
                    Anuncio de Resultados: Descubre a los Ganadores
                </h5>
                {section['results'] && (
                    <ul>
                        <li>Los resultados del concurso se anunciarán en la web después de la finalización del evento.</li>
                        <li>Los ganadores serán notificados personalmente y recibirán acceso a sus insignias especiales.</li>
                    </ul>
                )}
            </div>
            &nbsp;
            <div className='bases-section'>
                <h5 className='category-title' onClick={() => expandSection('photos-usage')}>
                    Uso Responsable de las Fotos: Protegiendo tu Creatividad
                </h5>
                {section['photos-usage'] && (
                    <ul>
                        <li>Al participar en el evento, los concursantes otorgan a Snapify el derecho a mostrar sus fotos en la plataforma con fines promocionales y para destacar los logros de la comunidad.</li>
                        <li>Es importante que los participantes estén conscientes de que sus imágenes pueden ser utilizadas con éste propósito una vez enviadas al concurso.</li>
                    </ul>
                )}
            </div>
            &nbsp;
            <div className='bases-section'>
                <h5 className='category-title' onClick={() => expandSection('good-faith')}>
                    Fomento de la Buena Fe y Colaboración: Construyendo Comunidad
                </h5>
                {section['good-faith'] && (
                    <ul>
                        <li>Fomentamos un ambiente positivo y colaborativo dentro de nuestra comunidad.</li>
                        <li>Es fundamental respetar el trabajo de los demás participantes y disfrutar del proceso creativo compartido, manteniendo siempre una actitud de buena fe y apoyo mutuo.</li>
                    </ul>
                )}
            </div>
            &nbsp;
        </div>
    )
}
export default TermsAndConditions