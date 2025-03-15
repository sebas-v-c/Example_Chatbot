import React from "react";
import ProductCard from "./ProductCard";
import { Col, Row } from "react-bootstrap";

const products = [
  { id: 1, name: "Arduino Uno", price: 25, image: "https://imgs.search.brave.com/4T1aeQrg0NuliIl_uD6rOQE3UZrtQYqU5PRHe2i0mT8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c3BhcmtmdW4uY29t/L21lZGlhL2NhdGFs/b2cvcHJvZHVjdC9j/YWNoZS9hNzkzZjEz/ZmQzZDY3OGNlYTEz/ZDI4MjA2ODk1YmEw/Yy8xLzEvMTEwMjEt/MDEuanBn" },
  { id: 2, name: "Raspberry Pi 4", price: 55, image: "https://chicagodist.com/cdn/shop/products/Pi8Resizes_700x700.png?v=1594839296" },
  { id: 3, name: "Sensor Ultrasonico", price: 8, image: "https://www.sparkfun.com/media/catalog/product/cache/a793f13fd3d678cea13d28206895ba0c/1/5/15569-Ultrasonic_Distance_Sensor_-_HC-SR04-01a.jpg" },
  { id: 4, name: "Módulo Bluetooth HC-05", price: 12, image: "https://thepihut.com/cdn/shop/products/hc-05-bluetooth-serial-transceiver-the-pi-hut-103294-23315570753731_700x.jpg?v=1646477656" },
];

const ProductList = () => {
  return (
        <Row>
      {products.map((product) => (
        <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
          <ProductCard product={product} />
        </Col>
      ))}
    </Row>
  );
};

export default ProductList;
