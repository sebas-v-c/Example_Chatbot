import React, { useState } from "react";
import OpenAI from "openai";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const Chatbot = () => {
  const [show, setShow] = useState(false);
  const [messages, setMessages] = useState([
    { text: "¡Hola! Soy el asistente virtual de la tienda. ¿En qué puedo ayudarte?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Configurar OpenAI
  const openai = new OpenAI({
    apiKey: "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", // Vite usa import.meta.env en lugar de process.env
    dangerouslyAllowBrowser: true, // Necesario para usar en frontend
  });

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { text: input, sender: "user" }]);
    setError(null);
    setLoading(true);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "Eres un asistente para una tienda de electrónicos. Solamente responde temas relacionados con esta electronica" },
          { role: "user", content: input },
        ],
        max_tokens: 100,
      });

      const botResponse = response.choices[0].message.content.trim();
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    } catch (err) {
      console.error("Error en el chatbot:", err);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <>
      <Button variant="primary" className="fixed-bottom m-3" onClick={() => setShow(true)}>
        🗨 Chat con Soporte
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Asistente Virtual</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <div className="chatbox" style={{ maxHeight: "300px", overflowY: "auto" }}>
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 rounded my-1 ${msg.sender === "user" ? "bg-primary text-white" : "bg-light text-black"}`}>
                {msg.text}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Form onSubmit={handleSendMessage} className="w-100 d-flex">
            <Form.Control
              type="text"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? "Generando..." : "Enviar"}
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Chatbot;
