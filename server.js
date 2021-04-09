var express = require("express");
var connectDB = require("./config/db");
var expressApp = express();
const path = require("path");
connectDB();

// Init Middlewares
expressApp.use(express.json({ extended: false }));

// Define routes
expressApp.use("/api/users", require("./routes/api/users"));
expressApp.use("/api/auth", require("./routes/api/auth"));
expressApp.use("/api/post", require("./routes/api/posts"));
expressApp.use("/api/profile", require("./routes/api/profile"));

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
	expressApp.use(express.static("client/build"));
	expressApp.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

var PORT = process.env.PORT || 5000;

expressApp.listen(PORT, function() {
	console.log(`Server was running on PORT ${PORT}`);
});
