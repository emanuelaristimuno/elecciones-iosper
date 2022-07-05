import React from 'react'
import { AccountCircle, MoreVert } from '@mui/icons-material'
import { Box, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material'
import { Link } from 'react-router-dom'
//import { useInfoAfiliado } from '../../components/Afiliados/InfoAfiliadoProvider'

const TopMenu = ({list}) => {
    const listMenu = list
    //const { infoAfiliado }  = useInfoAfiliado()

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  
    const isMenuOpen = Boolean(anchorEl);
    const menuId = 'primary-search-account-menu';
    
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const mobileMenuId = 'primary-search-account-menu-mobile';

    if (!listMenu) {
        return
    }
  
    const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };

    const renderTopList = listMenu.map((item) => {
        return (
            <MenuItem key={item.key} component={Link} to={item.to} onClick={handleMenuClose}>
                <ListItemIcon>
                    {item.icon()}
                </ListItemIcon>
                {item.label}
            </MenuItem>
        )
    })

    return (
        <Box>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id={menuId}
                    anchorEl={anchorEl}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    keepMounted
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                >
                    <MenuItem>
                        <ListItemIcon
                            size="large"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                            >
                            <AccountCircle />
                        </ListItemIcon>
                        <p>{'Cuenta'}</p>
                    </MenuItem>
                    <Divider />
                    {renderTopList}
                </Menu>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                >
                    <MoreVert />
                </IconButton>
                <Menu
                    id={mobileMenuId}
                    anchorEl={mobileMoreAnchorEl}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    keepMounted
                    open={isMobileMenuOpen}
                    onClose={handleMobileMenuClose}
                >
                    <MenuItem>
                        <ListItemIcon
                            size="large"
                            aria-label="account of current user"
                            aria-haspopup="true"
                            color="inherit"
                            >
                            <AccountCircle />
                        </ListItemIcon>
                        <p>{ 'Cuenta'}</p>
                    </MenuItem>
                    <Divider />
                    {renderTopList}
                </Menu>
            </Box>
        </Box>
    )
}

export default TopMenu