import { Request, Response, NextFunction } from 'express';
import { RowDataPacket } from 'mysql2';
import pool from '../config/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface UserResponse {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const [existing] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (existing.length) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    res.status(201).json({
      message: 'User registered successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    const user = rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '6h' }
    );

    const decoded = jwt.decode(token) as { exp: number };

    // Return user info and token
    const userResponse: UserResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    };

    res.json({
      user: userResponse,
      token,
      expires: decoded.exp * 1000,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;

    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id, name, email, image FROM users WHERE id = ?',
      [userId]
    );

    if (!rows.length) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

export const getUserReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.params.userId;

    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT r.*, p.name as productName, p.image as productImage 
       FROM reviews r 
       JOIN products p ON r.productId = p.id 
       WHERE r.userId = ? 
       ORDER BY r.createdAt DESC`,
      [userId]
    );

    res.json(rows);
  } catch (error) {
    next(error);
  }
};