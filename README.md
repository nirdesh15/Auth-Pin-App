# Engineering Challenge

## Overview
Thank you for reviewing my submission for the Software Engineer Intern position at Blys. This README file provides instructions for installing and running the project locally.

## Project Links
- **Deployed App:** [Link to Deployed App](https://client-vercel-webapp.vercel.app/)

## Installation Instructions
1. **Clone the Repository:**
    ```bash
    git clone https://github.com/nirdesh15/Auth-Pin-App.git
    cd Auth-Pin-App
    ```

2. **Install Dependencies:**
    Ensure you have [Yarn](https://yarnpkg.com/) installed. If not, install it following the instructions on their official website.
    ```bash
    yarn install
    ```

## Running the Project
The project consists of two main parts: the Express server and the React client. You need to start them separately.

### Running the Express Server
1. **Navigate to the Server Directory:**
    ```bash
    cd express-server
    ```

2. **Update CORS Settings:**
   Before starting the server, configure the CORS settings in `index.js` to allow requests from the React client. Open `index.js` and update the CORS settings to allow requests from `http://localhost:3000`. For example:
    ```javascript
    const cors = require('cors');
    app.use(cors({
        origin: 'http://localhost:3000'
    }));
    ```

3. **Start the Server:**
    ```bash
    yarn start
    ```

4. **Server URL:**
    The server will be running on [http://localhost:5000](http://localhost:5000) by default.

### Running the React Client
1. **Navigate to the Client Directory:**
    ```bash
    cd ../react-pin-auth
    ```

2. **Update API Endpoint:**
   Ensure that the `handlesubmit` function in `login.jsx` points to the correct API URL. Open `login.jsx` and set the API URL to `http://localhost:5000`. For example:
    ```javascript
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Replace with your actual API endpoint
        const response = await fetch('http://localhost:5000/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ /* your data */ })
        });
        // Handle response
    };
    ```

3. **Start the Client:**
    ```bash
    yarn start
    ```

4. **Client URL:**
    The client will be running on [http://localhost:3000](http://localhost:3000) by default.

## Testing Responsive Design
To fully experience the responsive design, please test the application on different devices and screen sizes.

## Additional Notes
If you encounter any issues or have questions, feel free to reach out.

Thank you for your time and consideration.

Best regards,  
Nirdesh
