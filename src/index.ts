// src/index.ts
import { S3 } from "aws-sdk";
import { Handler } from "aws-lambda";

export const handler: Handler = async (_event: any, _context: any) => {
  // Configurar as credenciais e a região do S3
  const s3 = new S3({
    region: "us-east-1", // Substitua pela região do seu bucket
    accessKeyId: "sua-chave-de-acesso", // Substitua com suas credenciais
    secretAccessKey: "sua-chave-secreta", // Substitua com suas credenciais
  });

  // DANDO Timeout, ACREDITO QUE SEJA PERMISSÃO

  // Nome do bucket do S3
  const bucketName = "teste-lambda-ts";

  try {
    // Listar objetos no bucket
    const data = await s3.listObjectsV2({ Bucket: bucketName }).promise();

    // Extrair nomes dos arquivos
    const fileNames = data.Contents?.map((obj) => obj.Key) || [];

    return {
      statusCode: 200,
      body: JSON.stringify({ files: fileNames }),
    };
  } catch (error) {
    console.error("Error listing S3 objects:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
