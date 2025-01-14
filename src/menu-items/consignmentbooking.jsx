// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconPackages,
    IconReceipt,
    IconMapPinBolt
} from '@tabler/icons-react';

// constant
const icons = {
    IconPackages,
    IconReceipt,
    IconMapPinBolt
};

// ==============================|| MENU ITEMS - Master Data ||============================== //

const consignmentBooking = {
    id: 'consignment-booking',
    title: <FormattedMessage id="consignment-booking" />,
    icon: icons.IconPackages,
    type: 'group',
    children: [
        {
            id: 'lr',
            title: <FormattedMessage id="lr" />,
            icon: icons.IconReceipt,
            type: 'item',
            link: '/consignment/booking/lr/:view',
            url: '/consignment/booking/lr/list',
            breadcrumbs: true
        },
        {
            id: 'trackconsignment',
            title: <FormattedMessage id="trackconsignment" />,
            icon: icons.IconMapPinBolt,
            type: 'item',
            url: '/consignment/tracker',
            breadcrumbs: true
        }    
    ]
};

export default consignmentBooking;
