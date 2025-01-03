import express, { Request, Response } from "express";
import Table, { ITable } from "../models/Table";

const router = express.Router();

// Get all tables
router.get("/", async (_req: Request, res: Response) => {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});
// Interface for the request body
interface ITableRequestBody {
  tableId: string;
  capacity: number;
}

// Route to insert multiple tables
router.post('/insert', async (req: Request, res: Response):Promise<any> => {
  try {
    const tablesData: ITableRequestBody[] = req.body; // Expecting an array of table objects

    // Validate if the request body is an array of tables
    if (!Array.isArray(tablesData)) {
      return res.status(400).json({ message: 'Request body must be an array of tables' });
    }

    // Insert multiple tables at once
    const insertedTables = await Table.insertMany(tablesData);

    res.status(201).json({
      message: 'Tables inserted successfully',
      tables: insertedTables,
    });
  } catch (err : any) {
    console.error(err);
    res.status(500).json({ message: 'Error inserting tables', error: err.message });
  }
});


export default router;
