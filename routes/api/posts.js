const express = require("express");
const { check, validationResult } = require("express-validator");
const Post = require("../../models/Post");
const User = require("../../models/Users");
const auth = require("../../middlewares/auth");

var router = express.Router();

/**
 * @route GET api/post
 * @desc Get all posts
 * @access Private
 */
router.get("/", auth, async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 });
		res.json(posts);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

/**
 * @route GET api/post/:id
 * @desc Get post by id
 * @access Private
 */
router.get("/:id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			res.status(404).json({ error: "Post not found" });
		}
		res.json(post);
	} catch (err) {
		if (err.kind === "ObjectId") {
			res.status(404).json({ error: "Post not found" });
		}
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

/**
 * @route POST api/post
 * @desc Create new post
 * @access Private
 */
router.post(
	"/",
	[
		auth,
		[
			check("text", "Text was required")
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		try {
			const user = await User.findById(req.user.id).select("-password");
			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id
			});
			newPost.save();
			res.json(newPost);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

/**
 * @route DELETE api/post/:id
 * @desc Delete post by id
 * @access Private
 */
router.delete("/:id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ error: "Not authorized to delete" });
		}
		await post.remove();
		res.json({ msg: "Post removed" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

/**
 * @route PUT api/post/like/:id
 * @desc Add like for post
 * @access Private
 */
router.put("/like/:id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}
		const isAlreadyLiked = post.likes.filter(val => {
			return val.user.toString() === req.user.id;
		});
		if (isAlreadyLiked.length > 0) {
			return res.status(400).json({ msg: "This post was already liked" });
		}
		post.likes.unshift({
			user: req.user.id
		});
		await post.save();
		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

/**
 * @route PUT api/post/unlike/:id
 * @desc Unlike the post
 * @access Private
 */
router.put("/unlike/:id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}
		const userIndex = post.likes.findIndex(val => {
			return val.user.toString() === req.user.id;
		});
		if (userIndex === -1) {
			return res.status(400).json({ msg: "This post was not liked" });
		}
		post.likes.splice(userIndex, 1);
		await post.save();
		res.json(post.likes);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

/**
 * @route PUT api/post/comment/:id
 * @desc Add comment for post
 * @access Private
 */
router.put(
	"/comment/:id",
	[
		auth,
		[
			check("text", "Text was required")
				.not()
				.isEmpty()
		]
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array());
		}
		try {
			const post = await Post.findById(req.params.id);
			if (!post) {
				return res.status(404).json({ msg: "Post Not Found" });
			}
			const user = await User.findById(req.user.id);
			const newComment = {
				text: req.body.text,
				user: req.user.id,
				avatar: user.avatar,
				name: user.name
			};
			post.comments.unshift(newComment);
			await post.save();
			res.json(post.comments);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

/**
 * @route DELETE api/post/comment/:id/comment_id
 * @desc Remove comment from post
 * @access Private
 */
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ msg: "Post not found" });
		}
		const commentIndex = post.comments.findIndex(val => {
			return val._id.toString() === req.params.comment_id;
		});
		if (commentIndex === -1) {
			return res.status(400).json({ msg: "Comment Not Found" });
		}
		if (post.comments[commentIndex].user.toString() !== req.user.id) {
			return res
				.status(401)
				.json({ msg: "Not Authorized To Delete The Comment" });
		}
		post.comments.splice(commentIndex, 1);
		await post.save();
		res.json(post.comments);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
