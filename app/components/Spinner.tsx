'use client';
import React from 'react';
import { ClipLoader } from 'react-spinners';

interface ISpinnerProps {
    loading: boolean;
}

const Spinner: React.FC<ISpinnerProps> = ({ loading }) => {
    return (
        <ClipLoader
            color={'#fff'}
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
};

export default Spinner;
