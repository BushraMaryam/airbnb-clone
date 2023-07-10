'use client';
import React, { useCallback, useState } from 'react';
import { SafeReservation, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

interface ReservationsProps {
    reservations: SafeReservation[];
    currentUser: SafeUser;
}

const ReservationClient: React.FC<ReservationsProps> = ({
    reservations,
    currentUser,
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    const onCancel = useCallback(
        (id: string) => {
            setDeletingId(id);
            axios
                .delete(`/api/reservations/${id}`)
                .then(() => {
                    toast.success('Reservation cancelled successfully');
                    router.refresh();
                })
                .catch((error) => {
                    toast.error('Something went wrong');
                    console.log(error);
                })
                .finally(() => {
                    setDeletingId('');
                });
        },
        [router]
    );
    return (
        <Container>
            <Heading
                title="Reservations"
                subtitle="Booking on your properties"
            />
            <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:gird-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {reservations.map((reservation) => {
                    return (
                        <ListingCard
                            key={reservation.id}
                            data={reservation.listing}
                            reservation={reservation}
                            actionId={reservation.id}
                            onAction={onCancel}
                            disabled={deletingId === reservation.id}
                            actionLabel="Cancel guest reservation"
                            currentUser={currentUser}
                        />
                    );
                })}
            </div>
        </Container>
    );
};

export default ReservationClient;
