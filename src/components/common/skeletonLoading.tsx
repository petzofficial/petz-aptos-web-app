import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
export default function LoadingSkeleton() {
    return (
        <Box sx={{ width: "100%" }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
        </Box>
    );
}