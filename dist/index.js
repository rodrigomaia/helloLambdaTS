"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// src/index.ts
const aws_sdk_1 = require("aws-sdk");
const handler = async (_event, _context) => {
    var _a;
    // Configurar as credenciais e a região do S3
    const s3 = new aws_sdk_1.S3({
        region: "us-east-1", // Substitua pela região do seu bucket
        accessKeyId: "sua-chave-de-acesso", // Substitua com suas credenciais
        secretAccessKey: "sua-chave-secreta", // Substitua com suas credenciais
    });
    // Nome do bucket do S3
    const bucketName = "teste-lambda-ts";
    try {
        // Listar objetos no bucket
        const data = await s3.listObjectsV2({ Bucket: bucketName }).promise();
        // Extrair nomes dos arquivos
        const fileNames = ((_a = data.Contents) === null || _a === void 0 ? void 0 : _a.map((obj) => obj.Key)) || [];
        return {
            statusCode: 200,
            body: JSON.stringify({ files: fileNames }),
        };
    }
    catch (error) {
        console.error("Error listing S3 objects:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal server error" }),
        };
    }
};
exports.handler = handler;
