// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import WebSocket, { WebSocketServer } from "ws";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// --------------------------------------
// Endpoint para top 50 criptos
app.get("/api/top50cryptos", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1"
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No se pudo obtener datos de CoinGecko" });
  }
});

// --------------------------------------
// Servidor HTTP
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// --------------------------------------
// WebSocket server para trades en tiempo real
const wss = new WebSocketServer({ server });

// Guardamos la conexión actual de Binance
let binanceWS = null;

// Cuando un cliente se conecta al WebSocket de nuestro backend
wss.on("connection", (ws) => {
  // Escuchamos mensaje del frontend
  ws.on("message", (msg) => {
    const data = JSON.parse(msg);

    if (data.action === "subscribe") {
      const symbol = data.symbol.toLowerCase();

      if (binanceWS && (binanceWS.readyState === WebSocket.OPEN || binanceWS.readyState === WebSocket.CONNECTING)) {
        try {
          binanceWS.terminate(); // mejor que close() si todavía no abrió
        } catch (e) {
          console.error("Error cerrando conexión anterior:", e);
        }
      }

      binanceWS = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@trade`);

      binanceWS.on("open", () => {
        console.log("Conectado a Binance para", symbol);
      });

      binanceWS.on("message", (msg) => {
        const trade = JSON.parse(msg);
        ws.send(JSON.stringify(trade));
      });

      binanceWS.on("error", (err) => {
        console.error("Error en Binance WS:", err.message);
      });

      binanceWS.on("close", () => {
        console.log("Conexión Binance cerrada");
      });
    }
  });

  ws.on("close", () => {
    console.log("Cliente desconectado");
    if (binanceWS) binanceWS.close(); // cerramos conexión si nadie está escuchando
  });
});