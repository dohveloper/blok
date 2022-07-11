import { useState } from 'react';
import axios from 'axios';

function AxiosTest() {
  const [message, setMessage] = useState('');

  const onNonCorsHeaderHandler = () => {
    axios
      .get('/api/123')
      .then((res) => {
        setMessage(res.data);
        return res.data;
      })
      .catch((res) => {
        setMessage(res.message);
        return message;
      });
  };

  const onCorsHeaderHandler = () => {
    axios.get('/api/cors').then((res) => {
      setMessage(res.data);
      return res.data;
    });
  };

  const onNonProxyHandler = () => {
    axios
      .get('api/cors')
      .then((res) => {
        setMessage(res.data);
        return res.data;
      })
      .catch((res) => {
        setMessage(res.message);
        return message;
      });
  };

  const onProxyHandler = () => {
    axios.get('api/proxy').then((res) => {
      setMessage(res.data);
      return res.data;
    });
  };

  return (
    <div className='AxiosTest'>
      <p>{message}</p>
      <div>
        <button onClick={onNonCorsHeaderHandler}>non cors header</button>
        <button onClick={onCorsHeaderHandler}>cors header</button>
        <button onClick={onNonProxyHandler}>nonProxy</button>
        <button onClick={onProxyHandler}>proxy</button>
      </div>
    </div>
  );
}

export default AxiosTest;
