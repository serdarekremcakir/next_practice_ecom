import ClientProductDetails from '@/components/ClientProductDetails';
import { Container } from '@mui/material';

async function getProduct(id: string) {
  const res = await fetch(`http://localhost:3001/api/products/${id}`, {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  return res.json();
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <Container maxWidth="lg">
      <ClientProductDetails product={product} />
    </Container>
  );
}