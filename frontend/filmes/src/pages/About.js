import React, { useState, useEffect } from 'react';
import Usuarios from '../components/Usuarios';

import axios from 'axios';

const About = () => {
  return (
    <div>
      <h2>Home</h2>
      <p>Bem-vindo à página About!</p>
      <Usuarios />
    </div>
  );
};

export default About;
