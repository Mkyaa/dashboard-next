"use client"

import React from 'react';

//shared
import Select from '@/shared/Select';

//styles
import styles from './index.module.css';

//next components
import { useRouter } from 'next/navigation';

const Pagination = ({...props}) => {

    //destructuring props
    const { page, setPage, size, setSize, totalPage, dataLength, start, end, search} = props;

    //hooks
    const router = useRouter();

    //select options
    const selectOptions = [
        { value: 6, label: 6 },
        { value: 9, label: 9 },
        { value: 12, label: 12 }
    ];

    //change size and edit url
    const handleSizeChange = (e) => {
        setSize(e.target.value);
        setPage(1);
        router.push(`?page=1&size=${e.target.value}&search=${search || ''}`, undefined, { shallow: true });
    };

    //add page and edit url
    const addPage = () => {
        if (page < totalPage) {
            setPage(page + 1);
            router.push(`?page=${page + 1}&size=${size}&search=${search || ''}`, undefined, { shallow: true });
        }
    };

    //minus page and edit url
    const minusPage = () => {
        if (page > 1) {
            setPage(page - 1);
            router.push(`?page=${page - 1}&size=${size}&search=${search || ''}`, undefined, { shallow: true });
        }
    };

    return (
        <div className={styles.pagination}>
            <div className={styles.pagination_left}>
                <span>Rows per page:</span>
                <Select options={selectOptions} onChange={handleSizeChange} />
            </div>
            <div className={styles.pagination_right}>
                <span>{
                    start === 0 ? 1 : start
                }-{end} of {dataLength}</span>
                <div className={styles.pagination_btn}>
                    <img src="/assets/icons/left.svg" alt="left" onClick={minusPage} />
                    <img src="/assets/icons/right.svg" alt="right" onClick={addPage} />
                </div>
            </div>
        </div>
    );
};

export default Pagination;
