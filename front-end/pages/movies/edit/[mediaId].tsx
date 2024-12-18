import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import EditMovie from '../../../components/movies/EditMovie';

const EditMoviePage: React.FC = () => {
    const router = useRouter();
    const { mediaId } = router.query;
    const [id, setId] = useState<string | null>(null);

    useEffect(() => {
        if (typeof mediaId === 'string') {
            setId(mediaId);
        }
    }, [mediaId]);

    if (id === null) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <EditMovie movieId={id} />
        </div>
    );
};

export default EditMoviePage;