import { memo, useLayoutEffect, useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import NavItem from './NavItem';
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import useConfig from 'hooks/useConfig';

import { MenuOrientation } from 'config';
import { HORIZONTAL_MAX_ITEM } from 'config';
import { useGetMenu, useGetMenuMaster } from 'api/menu';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

    const { menuOrientation } = useConfig();
    const { menuLoading } = useGetMenu();
    const { menuMaster } = useGetMenuMaster();
    const drawerOpen = menuMaster.isDashboardDrawerOpened;
    const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downMD;

    const [selectedID, setSelectedID] = useState('');
    const [menuItems, setMenuItems] = useState({ items: [] });

    useLayoutEffect(() => {
        setMenuItems({ items: [...menuItem.items] });
    }, [menuLoading]);

    // last menu-item to show in horizontal menu bar
    const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;

    let lastItemIndex = menuItems.items.length - 1;
    let remItems;
    let lastItemId;

    if (lastItem && lastItem < menuItems.items.length) {
        lastItemId = menuItems.items[lastItem - 1].id;
        lastItemIndex = lastItem - 1;
        remItems = menuItems.items.slice(lastItem - 1, menuItems.items.length).map((item) => ({
            title: item.title,
            elements: item.children,
            icon: item.icon,
            ...(item.url && {
                url: item.url
            })
        }));
    }

    const navItems = menuItems.items.slice(0, lastItemIndex + 1).map((item, index) => {
        switch (item.type) {
            case 'group':
                if (item.url && item.id !== lastItemId) {
                    return (
                        <List key={item.id}>
                            <NavItem item={item} level={1} isParents setSelectedID={() => setSelectedID('')} />
                            {!isHorizontal && index !== 0 && <Divider sx={{ py: 0.5 }} />}
                        </List>
                    );
                }

                return (
                    <NavGroup
                        key={item.id}
                        setSelectedID={setSelectedID}
                        selectedID={selectedID}
                        item={item}
                        lastItem={lastItem}
                        remItems={remItems}
                        lastItemId={lastItemId}
                    />
                );
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return !isHorizontal ? <Box {...(drawerOpen && { sx: { mt: 1.5 } })}>{navItems}</Box> : <>{navItems}</>;
};

export default memo(MenuList);
