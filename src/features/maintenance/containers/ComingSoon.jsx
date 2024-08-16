// material-ui
import { useTheme, styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// project imports
import { ThemeMode } from 'config';

import { gridSpacing } from 'store/constant';

// assets
import imageGrid from 'assets/images/maintenance/img-soon-grid.svg';
import imageDarkGrid from 'assets/images/maintenance/img-soon-grid-dark.svg';
import imageBlock from 'assets/images/maintenance/img-soon-block.svg';
import imageBlueBlock from 'assets/images/maintenance/img-soon-blue-block.svg';
import imagePurpleBlock from 'assets/images/maintenance/img-soon-purple-block.svg';

// styles
const CardMediaWrapper = styled('div')({
    maxWidth: 720,
    margin: '0 auto',
    position: 'relative'
});

const PageContentWrapper = styled('div')({
    maxWidth: 450,
    margin: '0 auto',
    textAlign: 'center'
});

const ComingSoonCard = styled(Card)({
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const CardMediaBlock = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '8s blink ease-in-out infinite'
});

const CardMediaBlue = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '15s wings ease-in-out infinite'
});

const CardMediaPurple = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    animation: '12s wings ease-in-out infinite'
});

// ===========================|| COMING SOON ||=========================== //

const ComingSoon = () => {
    const theme = useTheme();

    return (
        <ComingSoonCard>
            <CardContent>
                <Grid container justifyContent="center" spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <PageContentWrapper>
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Typography variant="h1">Coming Soon</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body1">Something new is on it&apos;s way</Typography>
                                </Grid>
                            </Grid>
                        </PageContentWrapper>
                    </Grid>
                    <Grid item xs={12}>
                        <CardMediaWrapper>
                            <CardMedia
                                component="img"
                                image={theme.palette.mode === ThemeMode.DARK ? imageDarkGrid : imageGrid}
                                title="Slider5 image"
                            />
                            <CardMediaBlock src={imageBlock} title="Slider 1 image" />
                            <CardMediaBlue src={imageBlueBlock} title="Slider 2 image" />
                            <CardMediaPurple src={imagePurpleBlock} title="Slider 3 image" />
                        </CardMediaWrapper>
                    </Grid>
                </Grid>
            </CardContent>
        </ComingSoonCard>
    );
};

export default ComingSoon;
