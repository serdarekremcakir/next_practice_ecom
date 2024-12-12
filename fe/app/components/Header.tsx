'use client';

import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box,
  IconButton,
  Button,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemButton
} from '@mui/material';
import { Menu as MenuIcon, Person } from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';
import CartIcon from './CartIcon';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { data: session } = useSession();
  const router = useRouter();

  const menuItems = [
    { text: 'Products', href: '/products' },
    { text: 'Electronics', href: '/products?category=Electronics' },
    { text: 'Accessories', href: '/products?category=Accessories' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    handleProfileMenuClose();
    router.push('/products');
  };

  const drawer = (
    <List>
      {menuItems.map((item) => (
        <Link 
          key={item.text} 
          href={item.href}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ListItemButton  onClick={handleDrawerToggle}>
            <ListItemText primary={item.text} />
          </ListItemButton>
        </Link>
      ))}
    </List>
  );

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Link href="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
            >
              E-Commerce
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {menuItems.map((item) => (
                <Link
                  key={item.text}
                  href={item.href}
                  style={{ textDecoration: 'none' }}
                >
                  <Button color="inherit">
                    {item.text}
                  </Button>
                </Link>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <CartIcon />
            
            {session ? (
              <>
                <IconButton
                  onClick={handleProfileMenuOpen}
                  sx={{ ml: 2 }}
                >
                  {session.user?.image ? (
                    <Avatar 
                      src={session.user.image}
                      alt={session.user.name || ''}
                      sx={{ width: 32, height: 32 }}
                    />
                  ) : (
                    <Avatar sx={{ width: 32, height: 32 }}>
                      {session.user?.name?.charAt(0) || <Person />}
                    </Avatar>
                  )}
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleProfileMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem disabled>
                    <Typography variant="body2" color="text.secondary">
                      Signed in as {session.user?.name}
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => {
                    handleProfileMenuClose();
                    router.push('/profile');
                  }}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => {
                    handleProfileMenuClose();
                    router.push('/profile/reviews');
                  }}>
                    My Reviews
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Button 
                color="inherit"
                onClick={() => router.push('/login')}
                sx={{ ml: 2 }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}