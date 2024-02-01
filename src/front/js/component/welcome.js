import React from 'react';
import { testData3 } from './testData';

export const Welcome = () => {
  return (
    <div className='container-fluid m-5 color-grad3 rounded-3'>
    <div className="container d-flex-column text-center">
      <div className=" color-text">
        <h1 style={{ fontSize: "65px" }}>Bienvenido!</h1>
        <h3 className="p-5 color-text">Ingresa para explorar y compartir tus momentos fotográfico</h3>
      </div>
      <img src={testData3[13].fotoUrl} className="card-img-top" style={{ height: "auto", width: "350px", objectFit: "cover" }} alt="..." />
    </div>
    </div>
  );
};
