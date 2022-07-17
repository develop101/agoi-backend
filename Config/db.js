const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://agoifinancialservice:123@cluster0.ssfgm.mongodb.net/?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => {
	console.log(mongoose.connection.readyState);
	console.log("connection is successful");
}).catch((error) => {
	console.log("connection not found");
	console.log(error, 'mongodb connection error');
})