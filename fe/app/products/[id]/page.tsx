import ClientProductDetails from "@/components/ClientProductDetails";
import { Product } from "@/lib/types";
import { Container } from "@mui/material";


async function getProduct(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export async function generateStaticParams() {
  try {
    const products = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`
    ).then((res) => res.json());

    if (products.data.length === 0) {
      console.warn("No products found in API response");
      return [];
    }

    return products.data.map((product: Product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}


export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return (
    <Container maxWidth="lg">
      <ClientProductDetails product={product} />
    </Container>
  );
}
