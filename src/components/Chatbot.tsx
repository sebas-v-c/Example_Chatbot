import React, { useState } from "react"; // Importa React y el hook useState para manejar estados.
import OpenAI from "openai"; // Importa el SDK oficial de OpenAI.
import { Modal, Button, Form, Alert } from "react-bootstrap"; // Importa componentes de Bootstrap para la interfaz.

const Chatbot = () => {
  // Estado para controlar la visibilidad del modal del chatbot.
  const [show, setShow] = useState(false);

  // Estado para almacenar los mensajes del chat.
  const [messages, setMessages] = useState([
    { text: "¡Hola! Soy el asistente virtual de la tienda. ¿En qué puedo ayudarte?", sender: "bot" },
  ]);

  // Estado para almacenar la entrada del usuario.
  const [input, setInput] = useState("");

  // Estado para manejar errores.
  const [error, setError] = useState(null);

  // Estado para manejar la carga mientras se espera una respuesta de la API.
  const [loading, setLoading] = useState(false);

  // Configuración del cliente OpenAI con la API Key.
  const openai = new OpenAI({
    apiKey: "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", // ⚠️ NO debes exponer tu API Key en código público
    dangerouslyAllowBrowser: true, // Permite que el cliente de OpenAI se use en el frontend (⚠️ no recomendado por seguridad).
  });

  // Función para manejar el envío de mensajes al chatbot.
  const handleSendMessage = async (e) => {
    e.preventDefault(); // Evita la recarga de la página al enviar el formulario.

    if (!input.trim()) return; // No envía mensajes vacíos.

    // Agrega el mensaje del usuario a la lista de mensajes.
    setMessages([...messages, { text: input, sender: "user" }]);

    setError(null); // Reinicia los errores antes de enviar la petición.
    setLoading(true); // Activa el estado de carga.

    try {
      // Llamada a la API de OpenAI para obtener una respuesta del chatbot.
      const response = await openai.chat.completions.create({
        model: "gpt-4o", // Modelo de IA a utilizar.
        messages: [
          { role: "system", content: "Eres un asistente para una tienda de electrónicos. Solamente responde temas relacionados con esta electrónica" }, // Contexto del asistente.
          { role: "user", content: input }, // Mensaje del usuario.
        ],
        max_tokens: 100, // Límite de tokens en la respuesta.
      });

      // Extrae la respuesta del chatbot y la agrega a la lista de mensajes.
      const botResponse = response.choices[0].message.content.trim();
      setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
    } catch (err) {
      console.error("Error en el chatbot:", err); // Muestra errores en la consola.
    }

    setInput(""); // Limpia la entrada del usuario.
    setLoading(false); // Desactiva el estado de carga.
  };

  return (
    <>
      {/* Botón para abrir el chatbot */}
      <Button variant="primary" className="fixed-bottom m-3" onClick={() => setShow(true)}>
        🗨 Chat con Soporte
      </Button>

      {/* Modal del chatbot */}
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Asistente Virtual</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Mensaje de error si hay algún problema */}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Área de chat con scroll automático */}
          <div className="chatbox" style={{ maxHeight: "300px", overflowY: "auto" }}>
            {messages.map((msg, index) => (
              <div key={index} className={`p-2 rounded my-1 ${msg.sender === "user" ? "bg-primary text-white" : "bg-light text-black"}`}>
                {msg.text}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* Formulario para escribir mensajes */}
          <Form onSubmit={handleSendMessage} className="w-100 d-flex">
            <Form.Control
              type="text"
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading} // Deshabilita el input mientras se genera una respuesta.
            />
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? "Generando..." : "Enviar"} {/* Cambia el texto del botón cuando está cargando */}
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Chatbot;
