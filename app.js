const express = require("express");
const app = express();
require("dotenv").config();
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
	socket.on("message", (msg, userName, groupId) => {
		io.emit("message", msg, userName, groupId);
	});

	socket.on("file", (msg, userName, groupId) => {
		io.emit("file", msg, userName, groupId);
	});
});

const userRoute = require("./routes/users");
const chatsRoute = require("./routes/chats");
const groupRoute = require("./routes/groups");
const path = require("path");

const sequelize = require("./db/connect");
const bodyParser = require("body-parser");
const cors = require("cors");
const User = require("./models/users");
const chats = require("./models/chats");
const Group = require("./models/group");

app.use(express.json());
app.use(cors({ origin: process.env.ORIGIN_IP }));

User.hasMany(chats);
chats.belongsTo(User);

Group.belongsToMany(User, { through: "UserGroups" });
User.belongsToMany(Group, { through: "UserGroups" });

chats.belongsTo(Group);
Group.hasMany(chats);

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'signup', 'signup.html'))
})
app.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'login', 'login.html'))
})
app.get("/whatsup", (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'homepage', 'home.html'))
})
app.use("/users", userRoute);
app.use(chatsRoute);
app.use("/groups", groupRoute);

(async () => {
	try {
		await sequelize.sync();

		http.listen(3002, () => {
			console.log(`server listening on port 3002`);
		});
	} catch (error) {
		console.log(error);
	}
})();
