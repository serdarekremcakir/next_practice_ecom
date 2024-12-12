export default function ProductLayout({
    children,
    reviews,
  }: {
    children: React.ReactNode;
    reviews: React.ReactNode;
  }) {
    return (
      <div>
        {children}
        <div style={{ marginTop: '2rem' }}>
          {reviews}
        </div>
      </div>
    );
  }