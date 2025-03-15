import React from "react";
import { Button, Card } from "react-bootstrap";

type Product = {
    id: number,
    name: string,
    price: number,
    image: string
}

type props = {
    product: Product
}

const ProductCard = ({ product }: props) => {
  return (
        <Card className="mb-4 shadow-sm">
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="text-primary fw-bold">${product.price}</Card.Text>
        <Button variant="primary" className="w-100">
          Agregar al carrito
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
