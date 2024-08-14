

import { styled } from '@mui/system';
import boy from '@/assets/images/image/boy.svg';
import { Box } from '@mui/material';

export const ImageContainer = styled(Box)(() => ({
    width: '100%',
    height: '100vh',  // Убедитесь, что это установлено
    backgroundImage: `url(${boy})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    // Для экранов с шириной 1366px
    '@media (min-width: 1000px) and (max-width: 1366px)': {
        width: '50%',
    },

    // Для экранов с шириной 1920px
    '@media (min-width: 1367px) and (max-width: 1920px)': {
        width: '40%',
    },

    // Для iPad
    '@media (min-width: 768px) and (max-width: 999px)': {
        width: '50%',
    },
}));


