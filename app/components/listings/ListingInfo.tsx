import useCountries from '@/app/hooks/useCountries';
import { SafeUser } from '@/app/types';
import React from 'react';
import { IconType } from 'react-icons/lib';
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';
import { BsFillPeopleFill } from 'react-icons/bs';
import { MdBathroom, MdMeetingRoom } from 'react-icons/md';

const Map = dynamic(() => import('../Map'), { ssr: false });

interface ListingInfoProps {
    user: SafeUser;
    category:
        | {
              icon: IconType;
              label: string;
              description: string;
          }
        | undefined;
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    category,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    locationValue,
}) => {
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue);
    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>Hosted by {user?.name}</div>
                    <Avatar src={user?.image} />
                </div>
                <div className="flex flex-row items-center gap-6 font-light text-neutral-500">
                    <div className="flex items-center gap-1">
                        <BsFillPeopleFill
                            className="text-neutral-700"
                            size={25}
                        />
                        <span> {guestCount} guests</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MdMeetingRoom className="text-neutral-700" size={25} />
                        <span> {roomCount} rooms</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MdBathroom className="text-neutral-700" size={25} />
                        <span> {bathroomCount} bathrooms </span>
                    </div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            <Map center={coordinates?.latlng} />
        </div>
    );
};

export default ListingInfo;
