import { styled } from '@mui/system';
import boy from '@/assets/images/image/boy.svg';
import { Box } from '@mui/material';

export const ImageContainer = styled(Box)({
    width: '50%',
    height: '1024px',
    backgroundImage: `url(${boy})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
});