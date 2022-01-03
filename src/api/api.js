const SMART_BRAIN_API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://smart-brain-backend-boost.herokuapp.com'
    : 'http://localhost:5000';

export default SMART_BRAIN_API_URL;