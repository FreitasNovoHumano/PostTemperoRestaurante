/**
 * ☁️ Cloudinary Config
 * =====================================================
 * Configuração segura do SDK
 */

import { v2 as cloudinary } from "cloudinary";

/**
 * 🔐 Configuração com variáveis de ambiente
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;