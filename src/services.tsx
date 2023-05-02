import { pool } from './mysql-pool';
import type { RowDataPacket } from 'mysql2';

type Item = {
    id: number,
    name: string,
    description: string,
    price: number,
    count: number,
    itemCount?: number
}

type Order = {
    id: number,
    name: string,
    itemId: number,
    itemCount: number,
    price: number
}


class ShopService{
    getItems(): Promise<Item[]> {
        return new Promise<Item[]>((resolve, reject) => {
            pool.query(
                "SELECT Items.*, Orders.itemCount FROM Items LEFT JOIN Orders ON Items.id = Orders.itemId",
                (error, results: RowDataPacket[]) => {
                    if (error) reject(error);
                    resolve(results as Item[]);
                }
            );
        });
    }

    getOrders(): Promise<Order[]>{
        return new Promise<Order[]>((resolve, reject) => {
            pool.query(
                "SELECT Items.price, Items.name, Orders.* FROM Orders INNER JOIN Items ON Orders.itemId = Items.id",
                (error, results: RowDataPacket[]) => {
                    if (error) reject(error);
                    resolve(results as Order[]);
                }
            );
        }); 
    }

    addOrder(id: number): Promise<RowDataPacket[]>{
        return new Promise<RowDataPacket[]>((resolve, reject) => {
            pool.query(
                "INSERT INTO Orders (itemId, itemCount) VALUES (?, 1)",
                [id],
                (error, results: RowDataPacket[]) => {
                    if (error) reject(error);
                    resolve(results);
                }
            );
        })
    }

    updateOrder(itemCount: number, id: number): Promise<RowDataPacket[]>{
        return new Promise<RowDataPacket[]>((resolve, reject) => {
            pool.query(
                "UPDATE Orders SET itemCount = ? WHERE itemId = ?",
                [itemCount, id],
                (error, results: RowDataPacket[]) => {
                    if (error) reject(error);
                    resolve(results);
                }
            );
        });
    }
}


export const shopService = new ShopService();
