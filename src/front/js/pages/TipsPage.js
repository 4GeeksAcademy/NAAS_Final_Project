import React from "react";
import "../../styles/tipsPage.css"

function tipsPage() {
  const photographyTechniques = [
    {
      title: "Exposición",
      concept:
        "La exposición se refiere a la cantidad de luz que llega al sensor de la cámara. Comprender cómo controlar la exposición es fundamental para obtener imágenes bien equilibradas.",
    },
    {
      title: "Apertura",
      concept:
        "La apertura del diafragma afecta la cantidad de luz que entra en la cámara y también controla la profundidad de campo.",
    },
    {
      title: "Velocidad de Obturación",
      concept:
        "La velocidad de obturación determina cuánto tiempo está abierto el obturador, afectando la cantidad de movimiento capturado en una imagen.",
    },
    {
      title: "Enfoque",
      concept:
        "El enfoque adecuado es crucial para obtener imágenes nítidas y claras. Aprende a utilizar los modos de enfoque automático y manual de tu cámara.",
    },
    {
      title: "ISO",
      concept:
        "El ajuste de ISO controla la sensibilidad del sensor a la luz. Conoce cómo afecta la calidad de la imagen y aprende a elegir el valor adecuado en diferentes situaciones.",
    },
    {
      title: "Composición",
      concept:
        "La composición es la disposición de elementos en tu imagen. Explora reglas como la regla de los tercios y la simetría para mejorar la estética de tus fotografías.",
    },
  ];
  return (
    <div className="container mt-5">
      <h2 className="display-4 orange" >Bienvenido</h2>
      <p className="lead color-text">
        Esta es nuestra sección de Consejos para Principiantes en Fotografía, donde te guiaremos en tus primeros pasos hacia la creación de imágenes extraordinarias.
      </p>
      <hr />
      <h2 className="mt-5 orange">Conoce tu equipo</h2>
      <p className="lead color-text">
        Conocer tu equipo fotográfico es esencial para aprovechar al máximo sus capacidades. Aquí hay algunos puntos clave para comenzar:
      </p>
      <div className="row mt-4">
        <div className="col-md-4">
          <h4 className="green">Consejos para elegir la cámara adecuada:</h4>
          <p className="color-text">Descubre cómo seleccionar la cámara que mejor se adapte a tus necesidades fotográficas. Considera factores como el tipo de fotografía que te interesa, el presupuesto y las características clave de las cámaras.</p>
        </div>
        <div className="col-md-4">
          <h4 className="green">Introducción a los diferentes tipos de lentes y sus usos:</h4>
          <p className="color-text">Explora el mundo de las lentes fotográficas. Conoce los distintos tipos de lentes disponibles y aprende cómo cada tipo puede afectar tus fotografías. Descubre cuándo usar un gran angular, teleobjetivo o un objetivo macro.</p>
        </div>
        <div className="col-md-4">
          <h4 className="green">Configuración básica de la cámara</h4>
          <p className="color-text">Sumérgete en la configuración esencial de tu cámara. Desde ajustes de exposición hasta conceptos clave como apertura, velocidad de obturación e ISO. Obtén una comprensión sólida de estos elementos para mejorar tu creatividad fotográfica.</p>
        </div>
      </div>
      <hr />
      <div className="inspiration-section">
  <div className="inspiration-info">
    <div className="card" style={{ width: "18rem" }}>
      <img src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg" className="card-img-top" alt="Nature" />
      <div className="card-body">
        <h5 className="card-title orange">Explora la Naturaleza</h5>
        <p className="card-text">La belleza de la naturaleza ofrece infinitas posibilidades. Sal y encuentra la armonía en paisajes, flores o animales.</p>
      </div>
    </div>

    <div className="card" style={{ width: "18rem" }}>
      <img src="https://cdn.pixabay.com/photo/2018/05/12/19/20/mosaic-3394375_1280.jpg" className="card-img-top" alt="Art" />
      <div className="card-body">
        <h5 className="card-title orange">Observa el Arte</h5>
        <p className="card-text">Sumérgete en otras formas de arte. La pintura, la música o la literatura pueden despertar ideas y emociones que luego puedes traducir a tus fotografías.</p>
      </div>
    </div>

    <div className="card" style={{ width: "18rem" }}>
      <img src="https://cdn.pixabay.com/photo/2016/11/08/05/01/airplane-1807486_1280.jpg" className="card-img-top" alt="Change Perspective" />
      <div className="card-body">
        <h5 className="card-title orange">Cambia tu Perspectiva</h5>
        <p className="card-text">Experimenta con ángulos y puntos de vista inusuales. A veces, cambiar la forma en que ves el mundo puede revelar nuevas oportunidades para la creatividad.</p>
      </div>
    </div>

    <div className="card" style={{ width: "18rem" }}>
      <img src="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010_1280.jpg" className="card-img-top" alt="Personal Projects" />
      <div className="card-body">
        <h5 className="card-title orange">Crea Proyectos Personales</h5>
        <p className="card-text">Desafía tus habilidades con proyectos personales. Define temas que te apasionen y trabaja en desarrollar una serie de fotografías coherentes.</p>
      </div>
    </div>
  </div>
</div>
<hr/>
<div className="tips-container">
        <div className="image-container">
          <img src="https://cdn.pixabay.com/photo/2016/03/05/22/53/camera-1239384_1280.jpg" alt="cámara" />
        </div>
        <div className="text-container">
          <h2 className="orange">Acerca de las Cámaras</h2>
          <p className="lead color-text">
            Elegir tu primera cámara es un paso emocionante. Aquí te dejamos algunas preguntas clave que te ayudarán a tomar la mejor decisión:
          </p>
          <ul className="color-text">
            <li>¿Cuál es tu presupuesto?</li>
            <li>¿Cuál es el propósito principal de la cámara (fotografía casual, profesional, etc.)?</li>
            <li>¿Prefieres una cámara compacta o una réflex digital?</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="frustration-section">
        <h2 className="text-center mb-5 orange">¿Cómo Manejar la Frustración?</h2>
        <div className="frustration-info">
          <div className="box">
            <h3 className="green">Acepta los Desafíos</h3>
            <p className="color-text">La frustración es parte del crecimiento. Acepta los desafíos y aprende de cada experiencia, incluso de los momentos difíciles.</p>
          </div>
          <div className="box">
            <h3 className="green">Celebra los Pequeños Logros</h3>
            <p className="color-text">Reconoce y celebra tus logros, por pequeños que sean. Cada foto capturada es un paso más hacia tu mejora.</p>
          </div>
          <div className="box">
            <h3 className="green">Aprende de tus Errores</h3>
            <p className="color-text">En lugar de ver los errores como fracasos, concédeles el poder de enseñarte. Analiza tus fotos y descubre áreas de mejora.</p>
          </div>
          <div className="box">
            <h3 className="green">Comparte tus Experiencias</h3>
            <p className="color-text">Habla con otros fotógrafos sobre tus desafíos. La comunidad puede ofrecer consejos valiosos y apoyo emocional.</p>
          </div>
        </div>
      </div>
      <hr/>
      <div className="camera-container mt-4">
        <h2 className="orange">Tipos de Cámara</h2>
        <p className="lead color-text">
          Descubre el mundo de la fotografía y elige la cámara perfecta para tus primeros pasos. Explora desde cámaras compactas, ideales para principiantes que buscan portabilidad, hasta las potentes DSLR y sin espejo, diseñadas para aquellos que buscan un mayor control creativo. <br />Para quienes inician su viaje fotográfico, recomendamos las cámaras compactas, combinando simplicidad y calidad para capturar momentos inolvidables. ¡Empieza tu aventura fotográfica con la elección adecuada!</p>
        <div className="camera-types-grid mt-3">
          <div className="camera-type">
            <h3 className="green">Cámaras Compactas</h3>
            <p className="color-text">Son portátiles y fáciles de usar, ideales para principiantes y para llevarlas a todas partes.</p>
          </div>
          <div className="camera-type">
            <h3 className="green">Cámaras DSLR (Réflex)</h3>
            <p className="color-text">Ofrecen mayor control sobre la configuración y la calidad de imagen. Son excelentes para fotografía avanzada.</p>
          </div>
          <div className="camera-type">
            <h3 className="green">Cámaras sin Espejo (Mirrorless)</h3>
            <p className="color-text">Combinan la calidad de las DSLR con la portabilidad de las compactas. Perfectas para usuarios intermedios y avanzados.</p>
          </div>
        </div>

      </div>
      <hr />
      <div className="container mt-5">
        <h2 className="text-center mb-4 orange">Importancia de la Luz</h2>
        <p className="lead color-text">La luz es esencial en la fotografía, definiendo la atmósfera, el tono y los detalles de una imagen. Aprender a aprovechar la luz de manera efectiva es clave para lograr fotografías impactantes. La dirección, intensidad y temperatura de la luz influyen en cómo se perciben los sujetos, creando sombras y resaltando detalles. Experimentar con diferentes condiciones de luz permite a los fotógrafos expresar creativamente su visión y capturar momentos de manera única. Conocer cómo utilizar la luz natural y artificial de manera estratégica eleva la calidad visual de las fotografías, creando composiciones memorables.</p>
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title green">Tipo de Luz</h3>
                <p className="card-text">Comprende la diferencia entre la luz natural y artificial. Cada tipo tiene sus propias características y afectará tus fotos de manera única.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title green">Ángulos y Dirección</h3>
                <p className="card-text">Experimenta con diferentes ángulos de luz. La dirección desde la que proviene la luz puede resaltar o suavizar detalles en tus fotos.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title green">Temperatura de Color</h3>
                <p className="card-text">Entiende la temperatura de color de la luz. Ajusta la configuración de balance de blancos según la iluminación para obtener colores precisos.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr/>
      <div className="tips-section">
        <h2 className="orange">Técnicas Fotográficas Básicas</h2>
        <div className="tips-content">
          {photographyTechniques.map((technique, index) => (
            <div key={index} className="tip-box">
              <h3>{technique.title}</h3>
              <p>{technique.concept}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default tipsPage