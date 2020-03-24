This project contains both the backend and the client application.

STACK : MongoDB, Express server, Node.js, React

Inorder to get started, do the following:

1. After cd into the main project folder, install dependencies for the backend by running `npm install`
2. Then, run `npm run client-install` to install dependencies for the client app
3. Then to start both the client and the server concurrently run `npm run dev`
4. Now, the client will start running in port 3000 and server will run in port 5000

The client application(SPA) can be found inside `crud-client` directory

General info about the client project:

1. Google maps API is used to display the map. For Geocoding, Mapbox Geocoding API is used
2. React Hooks are used, useCountryInfoFetch() is a custom hook
3. The project is written using ES6 syntax
4. Field validations are NOT carried out
5. Airport location can only be selected from the map
