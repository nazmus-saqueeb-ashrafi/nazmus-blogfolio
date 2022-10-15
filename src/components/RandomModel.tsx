import React from 'react'
import PlaneAnimation from '../components/PlaneAnimation';
import MonitorAnimation from '../components/MonitorAnimation';

const RandomModel = () => {
    var random_boolean = Math.random() < 0.5;

  if(random_boolean){
    return (<MonitorAnimation/>)
  }

  return (<PlaneAnimation/>)
}

export default RandomModel