import * as clientService from '../services/clientService.js';

// Controller recebe requisição HTTP
export const createClient = async (req, res) => {
  try {
    const clientData = req.body;

    const newClient = await clientService.createClientService(clientData);

    return res.status(201).json({
      success: true,
      data: newClient,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};