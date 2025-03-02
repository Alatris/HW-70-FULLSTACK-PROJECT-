import Post from '../models/Post.js';

export const createPost = async (req, res, next) => {
    try {
        console.log('🔹 Отримано запит на створення поста:', req.body);

        const { text, image, author } = req.body;
        if (!text) {
            return res.status(400).json({ message: 'Пост має мстити щось!' });
        }

        const newPost = new Post({ text, image, author });
        await newPost.save();

        console.log('✅ Пост створено:', newPost);
        res.status(201).json(newPost);
    } catch (error) {
        next(error);
    }
};

export const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().populate('author', 'username avatar').sort({ createdAt: -1 });
        res.json(posts);
    }
    catch (error) {
        next(error);
    }
};

export const getPostById = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'username avatar');
        if (!post) return res.status(404).json({ message: 'Пост не існує' });

        res.json(post);
        }
        catch (error) {
        next(error);
        }
    };

export const updatePost = async (req, res, next) => {
    try {
        const { text, image } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ message: 'Пост не існує чи видалено' });

        post.text = text || post.text;
        post.image = image || post.image;

        await post.save();
        res.json(post);
        }
        catch (error) {
        next(error);
    }
};


export const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Пост видалено' });

        await post.deleteOne();
        res.json({ message: 'Пост видалено' });
    } catch (error) {
        next(error);
    }
};
