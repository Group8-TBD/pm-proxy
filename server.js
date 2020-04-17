const express = require("express");
const port = 3000;
const path = require("path");
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const photos = 'http://ec2-54-153-107-63.us-west-1.compute.amazonaws.com:3001/';
const reservations = "http://3.21.207.217:3111/";
const recommendations ='http://ec2-54-241-236-42.us-west-1.compute.amazonaws.com/';
const reviews = "http://ec2-54-183-203-80.us-west-1.compute.amazonaws.com:3500/"

//photos
app.all('/properties/:property_id', createProxyMiddleware({ target: photos}));
app.all('/images/image_id', createProxyMiddleware({ target: photos}));
app.all('/images', createProxyMiddleware({ target: photos}));
app.all('/properties/:property_name', createProxyMiddleware({ target: photos}));

//reservations
app.all('/api/reservations/:roomId', createProxyMiddleware({ target: reservations}));
app.all('/api/reservations/', createProxyMiddleware({ target: reservations}));
app.all('/api/reservations/:reservationId', createProxyMiddleware({ target: reservations}));

//reviews
app.all('/api/listing/:listingID', createProxyMiddleware({ target: reviews}));
app.all('/api/listing/', createProxyMiddleware({ target: reviews}));
app.all('api/createReview', createProxyMiddleware({ target: reviews}));
app.all('api/createListing', createProxyMiddleware({ target: reviews}));
app.all('api/updateListing', createProxyMiddleware({ target: reviews}));
app.all('api/deleteListing', createProxyMiddleware({ target: reviews}));

//recommendations
app.all('/recommendations/:zip', createProxyMiddleware({ target: recommendations}));
app.all('/images/listing/:id', createProxyMiddleware({ target: recommendations}));
app.all('/recommendations', createProxyMiddleware({ target: recommendations}));
app.all('/recommendations/listing/:id', createProxyMiddleware({ target: recommendations}));


app.listen(port, () => console.log(`Proxy server running on port ${port}`));