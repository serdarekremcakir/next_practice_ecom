import { Request, Response, NextFunction } from 'express';
import { RowDataPacket } from 'mysql2';
import pool from '../config/database';

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      category,
      minPrice,
      maxPrice,
      sort,
      search,
      page = '1',
      limit = '12'
    } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params: any[] = [];

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    if (minPrice) {
      query += ' AND price >= ?';
      params.push(minPrice);
    }

    if (maxPrice) {
      query += ' AND price <= ?';
      params.push(maxPrice);
    }

    if (search) {
      query += ' AND (name LIKE ? OR description LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    if (sort) {
      switch (sort) {
        case 'price-asc':
          query += ' ORDER BY price ASC';
          break;
        case 'price-desc':
          query += ' ORDER BY price DESC';
          break;
        case 'name-asc':
          query += ' ORDER BY name ASC';
          break;
        case 'name-desc':
          query += ' ORDER BY name DESC';
          break;
      }
    }

    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 12;
    const offset = (pageNum - 1) * limitNum;

    query = `${query} LIMIT ${limitNum} OFFSET ${offset}`;

    const [rows] = await pool.execute<RowDataPacket[]>(query, params);
    
    res.json({
      data: rows,
      page: pageNum,
      limit: limitNum
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM products WHERE id = ?',
      [req.params.id]
    );

    if (!rows.length) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};