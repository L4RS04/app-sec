import React from 'react';
import { useRouter } from 'next/router';
import EditSeries from '../../../components/series/EditSeries';

const EditSeriesPage: React.FC = () => {
    const router = useRouter();
    const { mediaId } = router.query;

    if (typeof mediaId !== 'string') {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <EditSeries seriesId={mediaId} />
        </div>
    );
};

export default EditSeriesPage;