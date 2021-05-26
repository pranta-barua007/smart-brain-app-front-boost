let SMART_BRAIN_API_URL = 'https://polar-waters-41859.herokuapp.com';

if (process.env.NODE_ENV !== 'production') {
    SMART_BRAIN_API_URL = 'http://localhost:5000'  
};

export default SMART_BRAIN_API_URL;