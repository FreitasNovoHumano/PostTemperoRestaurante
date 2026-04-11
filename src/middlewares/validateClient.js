export const validateClient = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: 'Nome e email são obrigatórios',
    });
  }

  next();
};