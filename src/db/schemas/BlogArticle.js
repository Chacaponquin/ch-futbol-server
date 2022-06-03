import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
    message: { type: String, maxlength: 1000 },
    personFrom: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
}, { timestamps: { createdAt: "create_at" } });

const commentsSchema = new mongoose.Schema({
    message: { type: String, required: true },
    reply: { type: [replySchema], default: [] },
    personFrom: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        default: null,
    },
}, { timestamps: { createdAt: true } });

const blogArticleSchema = new mongoose.Schema({
    content: { type: String, required: true },
    title: { type: String, required: true, maxlength: 100 },
    images: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Image",
        default: [],
    },
    category: { type: [String], default: [] },
    resume: { type: String, required: true },
    likes: { type: [mongoose.SchemaTypes.ObjectId], default: [], ref: "User" },
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        default: null,
    },
    comments: { type: [commentsSchema], default: [] },
}, { timestamps: { createdAt: true, updatedAt: true } });

export default mongoose.model("BlogArticle", blogArticleSchema);