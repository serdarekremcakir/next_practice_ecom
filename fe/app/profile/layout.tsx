import { Container, Box } from '@mui/material';

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container maxWidth="lg">
      <Box py={4}>
        {children}
      </Box>
    </Container>
  );
}