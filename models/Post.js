const mongoose = require("mongoose");
const mongoSchema = mongoose.Schema;

const postSchema = mongoSchema({
	user: {
		type: mongoSchema.Types.ObjectId,
		ref: "user"
	},
	text: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	avatar: {
		type: String,
		required: true
	},
	likes: [
		{
			user: {
				type: mongoSchema.Types.ObjectId,
				ref: "user"
			}
		}
	],
	comments: [
		{
			user: {
				type: mongoSchema.Types.ObjectId,
				ref: "user"
			},
			text: {
				type: String,
				required: true
			},
			name: {
				type: String,
				required: true
			},
			avatar: {
				type: String,
				required: true
			},
			date: {
				type: Date,
				default: Date.now
			}
		}
	],
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = Post = mongoose.model("post", postSchema);
