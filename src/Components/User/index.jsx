import React, { useState } from 'react'
import axios from 'axios';
import { useApi } from '../../Services/api';

const User = () => {
    const [userData, setUserData] = useState(null);
    const [healthCheckStatus, setHealthCheckStatus] = useState('');
    const api = useApi();

    const fetchUser = async () => {
        try {
            const response = await api.get('/randomuser');
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const performHealthCheck = async () => {
        try {
          // Use a direct axios call for the health check to avoid sending the authorization header
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/health`);
          setHealthCheckStatus(`Health Check Status: ${response.status} - ${response.statusText}`);
        } catch (error) {
          console.error('Error performing health check:', error);
          setHealthCheckStatus('Health Check Failed');
        }
      };

    return (
        <>
            <div className="flex flex-col gap-y-2 items-center justify-center">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={fetchUser}
                >
                    Get Random User
                </button>
                {userData && (
                    <div className="m-4 p-5 max-w-4xl border rounded shadow-lg whitespace-wrap">
                        {JSON.stringify(userData, null, 2)}
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-y-2 items-center justify-center">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={performHealthCheck}
                >
                    Perform Health Check
                </button>
                {healthCheckStatus && (
                    <div className="p-4 border rounded shadow">
                        {healthCheckStatus}
                    </div>
                )}
            </div>
        </>

    );
};

export default User