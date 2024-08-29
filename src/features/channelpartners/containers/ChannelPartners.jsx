// tmsui/src/features/channelpartners/containers/ChannelPartners.jsx

import Grid from '@mui/material/Grid';
import ChannelPartnerList from '../components/ChannelPartnerList';
import { gridSpacing } from 'store/constant';

/**
 * ChannelPartners Container
 * - This container displays the list of channel partners.
 */
export default function ChannelPartners() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <ChannelPartnerList />
            </Grid>
        </Grid>
    );
}
