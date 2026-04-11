import express from 'express';
import * as clientController from '../controllers/clientController.js';
import { validateClient } from '../middlewares/validateClient.js';

const router = express.Router();

// POST /clients
router.post('/clients', validateClient, clientController.createClient);

export default router;