import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticateToken, AuthRequest } from './middleware/auth';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;
const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key-change-this';

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// --- Auth ---
app.post('/api/auth/login', async (req, res) => {
    try {
        console.log('Login attempt:', req.body);
        const { username, password } = req.body;
        const user = await prisma.admin.findUnique({ where: { username } });

        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role, name: user.name },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                name: user.name
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// --- Users Management (Admin Only) ---
app.get('/api/users', authenticateToken, async (req: AuthRequest, res) => {
    try {
        if (req.user?.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        const users = await prisma.admin.findMany({
            select: { id: true, username: true, name: true, role: true }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

app.post('/api/users', authenticateToken, async (req: AuthRequest, res) => {
    try {
        if (req.user?.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        const { username, password, name, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.admin.create({
            data: {
                username,
                password: hashedPassword,
                name,
                role
            }
        });

        res.json({ id: user.id, username: user.username, name: user.name, role: user.role });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

app.put('/api/users/:id', authenticateToken, async (req: AuthRequest, res) => {
    try {
        if (req.user?.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        const { id } = req.params;
        const { name, role, password } = req.body;

        const data: any = { name, role };
        if (password) {
            data.password = await bcrypt.hash(password, 10);
        }

        const user = await prisma.admin.update({
            where: { id: Number(id) },
            data,
            select: { id: true, username: true, name: true, role: true }
        });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

app.delete('/api/users/:id', authenticateToken, async (req: AuthRequest, res) => {
    try {
        if (req.user?.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        const { id } = req.params;
        // Prevent deleting self
        if (Number(id) === req.user.id) {
            return res.status(400).json({ error: 'Cannot delete yourself' });
        }

        await prisma.admin.delete({ where: { id: Number(id) } });
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// --- Appointments ---
app.post('/api/appointments', async (req, res) => {
    try {
        const { name, email, phone, date, message } = req.body;
        const appointment = await prisma.appointment.create({
            data: {
                name,
                email,
                phone,
                date: new Date(date),
                message,
            },
        });
        res.json(appointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ error: 'Failed to create appointment' });
    }
});

// --- Contact ---
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const contact = await prisma.contact.create({
            data: {
                name,
                email,
                subject,
                message,
            },
        });
        res.json(contact);
    } catch (error) {
        console.error('Error creating contact message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// --- Blog ---
app.get('/api/blog', async (req, res) => {
    try {
        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: { name: true }
                }
            }
        });
        res.json(posts);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
});

app.get('/api/blog/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.blogPost.findUnique({
            where: { id: Number(id) },
            include: {
                user: {
                    select: { name: true }
                }
            }
        });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).json({ error: 'Failed to fetch blog post' });
    }
});

app.get('/api/appointments', authenticateToken, async (req, res) => {
    try {
        const appointments = await prisma.appointment.findMany({ orderBy: { createdAt: 'desc' } });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

app.get('/api/contact', authenticateToken, async (req, res) => {
    try {
        const messages = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' } });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

app.put('/api/blog/:id', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const { title, content, image, authorId } = req.body;

        const post = await prisma.blogPost.findUnique({ where: { id: Number(id) } });
        if (!post) return res.status(404).json({ error: 'Post not found' });

        // Check permissions: Admin or Author
        if (req.user?.role !== 'ADMIN' && post.authorId !== req.user?.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const updateData: any = { title, content, image };

        // Only Admin can change author
        if (req.user?.role === 'ADMIN' && authorId) {
            const author = await prisma.admin.findUnique({ where: { id: Number(authorId) } });
            if (author) {
                updateData.authorId = author.id;
                updateData.author = author.name;
            }
        }

        const updatedPost = await prisma.blogPost.update({
            where: { id: Number(id) },
            data: updateData
        });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update post' });
    }
});

app.post('/api/blog', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const { title, content, image, authorId } = req.body;

        // If authorId is provided (by Admin), use it. Otherwise use current user.
        // Only ADMIN can post on behalf of others.
        let finalAuthorId = req.user?.id;
        if (authorId && req.user?.role === 'ADMIN') {
            finalAuthorId = Number(authorId);
        }

        const author = await prisma.admin.findUnique({ where: { id: finalAuthorId } });

        const post = await prisma.blogPost.create({
            data: {
                title,
                content,
                author: author?.name || 'Admin', // Fallback for legacy
                authorId: finalAuthorId,
                image,
            },
        });
        res.json(post);
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ error: 'Failed to create blog post' });
    }
});

app.delete('/api/blog/:id', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.blogPost.findUnique({ where: { id: Number(id) } });

        if (!post) return res.status(404).json({ error: 'Post not found' });

        // Check permissions: Admin or Author
        if (req.user?.role !== 'ADMIN' && post.authorId !== req.user?.id) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await prisma.blogPost.delete({ where: { id: Number(id) } });
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete post' });
    }
});

// --- Team ---
app.get('/api/team', async (req, res) => {
    try {
        const team = await prisma.teamMember.findMany({ orderBy: { createdAt: 'asc' } });
        res.json(team);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch team members' });
    }
});

app.post('/api/team', authenticateToken, async (req: AuthRequest, res) => {
    try {
        if (req.user?.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        const { name, role, spec, image, category, linkedin, email } = req.body;
        const member = await prisma.teamMember.create({
            data: { name, role, spec, image, category, linkedin, email }
        });
        res.json(member);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create team member' });
    }
});

app.put('/api/team/:id', authenticateToken, async (req: AuthRequest, res) => {
    try {
        if (req.user?.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        const { id } = req.params;
        const { name, role, spec, image, category, linkedin, email } = req.body;
        const member = await prisma.teamMember.update({
            where: { id: Number(id) },
            data: { name, role, spec, image, category, linkedin, email }
        });
        res.json(member);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update team member' });
    }
});

app.delete('/api/team/:id', authenticateToken, async (req: AuthRequest, res) => {
    try {
        if (req.user?.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Unauthorized' });
        }
        const { id } = req.params;
        await prisma.teamMember.delete({ where: { id: Number(id) } });
        res.json({ message: 'Team member deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete team member' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
