import { Request, Response, NextFunction } from 'express';
import { RowDataPacket } from 'mysql2';
import pool from '../config/database';

export const getProductReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT r.*, u.name as userName, u.image as userImage 
       FROM reviews r 
       JOIN users u ON r.userId = u.id 
       WHERE r.productId = ? 
       ORDER BY r.createdAt DESC`,
      [req.params.productId]
    );

    res.json(rows);
  } catch (error) {
    next(error);
  }
};

export const createReview = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { rating, comment, userId } = req.body;
    const productId = req.params.productId;

    const [existingReviews] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM reviews WHERE userId = ? AND productId = ?',
      [userId, productId]
    );

    if (existingReviews.length > 0) {
      res.status(400).json({ 
        message: 'You have already reviewed this product' 
      });
      return;
    }

    const [result] = await pool.execute(
      'INSERT INTO reviews (productId, userId, rating, comment) VALUES (?, ?, ?, ?)',
      [productId, userId, rating, comment]
    );

    res.status(201).json({
      message: 'Review added successfully',
      reviewId: result
    });
  } catch (error) {
    if ((error as any).code === 'ER_DUP_ENTRY') {
      res.status(400).json({ 
        message: 'You have already reviewed this product' 
      });
      return;
    }
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