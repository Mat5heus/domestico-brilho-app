import {platform} from '../App';
import { BehaviorSubject } from 'rxjs';
import type { ISQLiteService } from '../services/sqliteService'; 
import { IDbVersionService } from '../services/dbVersionService';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { ProductUpgradeStatements } from '../upgrades/user.upgrade.statements';
import { Product } from '~/models/Product';

export interface IStorageService {
    initializeDatabase(): Promise<void>
    getUsers(): Promise<Product[]>
    addProduct(Product: Product): Promise<number>
    updateProductById(id: string, active: number): Promise<void> 
    deleteProductById(id: string): Promise<void>
    getDatabaseName(): string
    getDatabaseVersion(): number
};
class StorageService implements IStorageService  {
    versionUpgrades = ProductUpgradeStatements;
    loadToVersion = ProductUpgradeStatements[ProductUpgradeStatements.length-1].toVersion;
    db!: SQLiteDBConnection;
    database: string = 'Productsdb';
    sqliteServ!: ISQLiteService;
    dbVerServ!: IDbVersionService;
    isInitCompleted = new BehaviorSubject(false);

    constructor(sqliteService: ISQLiteService, dbVersionService: IDbVersionService) {
        this.sqliteServ = sqliteService;
        this.dbVerServ = dbVersionService;
    }
        
    getDatabaseName(): string {
        return this.database;
    }
    getDatabaseVersion(): number {
        return this.loadToVersion;
    }
    async initializeDatabase(): Promise<void> {
        // create upgrade statements
        try {
            await this.sqliteServ.addUpgradeStatement({database: this.database, upgrade: this.versionUpgrades});
            this.db = await this.sqliteServ.openDatabase(this.database, this.loadToVersion, false);
            const isData = await this.db.query("select * from sqlite_sequence");
            if(isData.values!.length === 0) {
            // create database initial Products if any

            }

            this.dbVerServ.setDbVersion(this.database,this.loadToVersion);
            if( platform === 'web') {
                await this.sqliteServ.saveToStore(this.database);
            }
            this.isInitCompleted.next(true);
        } catch(error: any) {
            const msg = error.message ? error.message : error;
            throw new Error(`storageService.initializeDatabase: ${msg}`);
        }
    }
    async getProducts(): Promise<Product[]>  {
        return (await this.db.query('SELECT * FROM Products;')).values as Product[];
    }
    async addProduct(Product: Product): Promise<number> {
        const sql = `INSERT INTO Products (name) VALUES (?);`;
        const res = await this.db.run(sql,[Product.name]);
        if (res.changes !== undefined && res.changes.lastId !== undefined && res.changes.lastId > 0) {
            return res.changes.lastId;
        } else {
            throw new Error(`storageService.addProduct: lastId not returned`);
        }
    }
    async updateProductById(id: string, active: number): Promise<void> {
        const sql = `UPDATE Products SET active=${active} WHERE id=${id}`;
        await this.db.run(sql);
    }
    async deleteProductById(id: string): Promise<void> {
        const sql = `DELETE FROM Products WHERE id=${id}`;
        await this.db.run(sql);
    }
}
export default StorageService;